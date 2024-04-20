import { ApolloError } from 'apollo-server-express'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import UserDiscordClient from '../../controllers/UserDiscordClient'
import { ActivityEntry } from '../../entities/ActivityEntry'
import { BotPlan } from '../../entities/BotPlan'
import { Coupon } from '../../entities/Coupon'
import { Group } from '../../entities/Group'
import { GroupAdmin } from '../../entities/GroupAdmin'
import { GroupToolConfig } from '../../entities/GroupToolConfig'
import { Tool } from '../../entities/Tool'
import ActivityEvent from '../../types/ActivityEvent'
import ServerContext from '../../types/ServerContext'
import generateKey from '../../utils/generateKey'
import stripe from '../../utils/stripe'

@Resolver()
export default class {
  @Mutation(() => Group)
  async createGroup(
    @Ctx() { user }: ServerContext,
    @Arg('groupID') groupID: string,
    @Arg('botPlanID') botPlanID: string,
    @Arg('paymentID', { nullable: true }) paymentID?: string,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('coupon', { nullable: true }) couponKey?: string
  ): Promise<Group> {
    const discordClient = new UserDiscordClient(user!)
    await discordClient.setAuth()
    const userGuilds = await discordClient.getCurrentUserGuilds()
    const { email } = await discordClient.getCurrentUser()
    const selectGuild = userGuilds.filter((g) => g.id === groupID)[0]

    if (!selectGuild || (selectGuild.permissions & 0x00000008) !== 8) {
      throw new ApolloError(`Could not authenticate ${user?.id} for ${groupID}.`)
    }

    const currentGroup = await Group.find({ id: groupID })
    if (currentGroup.length) {
      throw new ApolloError(`A group with ID ${groupID} already exists.`)
    }

    let couponObject: Coupon | undefined = undefined
    if (couponKey) {
      couponObject = await Coupon.findOne({ id: couponKey })
      if (!couponObject) {
        throw new ApolloError(`Could not find a coupon with key ${couponKey}.`)
      }
    }

    const metadata = { group_id: groupID }

    /* eslint-disable indent */
    const { id: customerID } = await stripe.customers.create({
      metadata,
      email,
      ...(paymentID
        ? {
            payment_method: paymentID,
            invoice_settings: {
              default_payment_method: paymentID
            },
            name
          }
        : {})
    })

    let stripeCouponID: string | undefined = undefined
    if (couponObject) {
      const { id } = await stripe.coupons.create({
        id: couponObject.id,
        duration: couponObject.forever ? 'forever' : 'once',
        amount_off: couponObject.amountOff || undefined,
        percent_off: couponObject.percentOff || undefined,
        currency: 'USD',
        metadata
      })
      stripeCouponID = id
    }

    const botPlan = await BotPlan.findOneOrFail({ id: botPlanID })

    const { id: subscriptionID, latest_invoice } = await stripe.subscriptions.create({
      metadata,
      customer: customerID,
      items: [{ price: botPlan.stripePriceID }],
      expand: ['latest_invoice.payment_intent'],
      trial_period_days: couponObject ? couponObject.trialPeriodDays : undefined,
      coupon: stripeCouponID
    })

    const { payment_intent }: any = latest_invoice
    if (payment_intent && payment_intent.status !== 'succeeded') {
      throw new ApolloError('Payment was unsuccessful.')
    }

    const group = await Group.create({
      id: groupID,
      ownerID: user?.id!,
      customerID,
      subscriptionID,
      botPlanID,
      apiKey: generateKey()
    }).save()

    await GroupAdmin.create({ userID: user?.id, groupID, isOwner: true }).save()

    const defaultTools = await Tool.find({ default: true })
    await Promise.all(defaultTools.map(({ id }) => GroupToolConfig.create({ groupID: group?.id, toolID: id }).save()))

    if (couponObject) {
      couponObject.claimed = true
      await couponObject.save()
    }

    user!.selectedGroupID = group.id
    await user!.save()

    await ActivityEntry.create({
      event: ActivityEvent.CREATED_GROUP,
      groupID: group?.id,
      adminID: user?.id
    }).save()

    await group.reload()

    return group
  }
}
