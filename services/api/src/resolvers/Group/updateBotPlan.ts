import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { ActivityEntry } from '../../entities/ActivityEntry'
import { BotPlan } from '../../entities/BotPlan'
import { Group } from '../../entities/Group'
import { GroupAdmin } from '../../entities/GroupAdmin'
import ActivityEvent from '../../types/ActivityEvent'
import ServerContext from '../../types/ServerContext'
import stripe from '../../utils/stripe'

@Resolver()
export default class {
  @Mutation(() => Group)
  async updateBotPlan(@Ctx() { group, user }: ServerContext, @Arg('botPlanID') newPlanID: string): Promise<Group> {
    if (!group) {
      throw Error()
    }

    const currentPlan = await group.botPlan!
    const newPlan = await BotPlan.findOneOrFail({ id: newPlanID })

    if (!currentPlan) {
      throw Error('You must already have a bot plan.')
      // TODO: redo this logic sometime
      // await stripe.subscriptions.update(group.subscriptionID, { items: [{ price: newPlan.stripePriceID }] })
      // group.botPlanID = newPlan.id
      // return group.save()
    }

    if (currentPlan.id === newPlan.id) {
      throw Error('You cannot update your bot plan to your current plan!')
    }

    if (currentPlan.allowPaidTools && !newPlan.allowPaidTools) {
      const invalidConfigs = (await group.toolConfigs).filter(async ({ tool }) => !(await tool).free)
      await Promise.all(invalidConfigs.map((config) => config.remove()))
    }

    if (currentPlan.adminLimit > newPlan.adminLimit) {
      // remove all admins besides owner
      await GroupAdmin.delete({ groupID: group?.id, isOwner: false })
    }

    if (currentPlan.customBot && !newPlan.customBot) {
      console.log('nfrjo3eqwkdf')
      group.botAdded = false
      group.customBotConfigured = false
      group.botStatus = undefined
      group.botStatusType = undefined
      group.botClientID = undefined
      group.botClientSecret = undefined
      group.botToken = undefined
      group.embedColor = undefined
      group.embedFooter = undefined
      await group.save()
    }

    const subscription = await stripe.subscriptions.retrieve(group.subscriptionID)
    await stripe.subscriptions.update(group.subscriptionID, {
      items: [
        {
          price: newPlan.stripePriceID,
          id: subscription.items.data[0].id
        }
      ],
      proration_behavior: 'create_prorations'
    })

    await ActivityEntry.create({
      event: ActivityEvent.UPDATED_BOT_PLAN,
      groupID: group?.id,
      adminID: user?.id,
      info: newPlan.id
    }).save()

    // Oct 1
    // this is a temp solution, not sure why group.botPlanID = newPlan.id
    // and then group.save are not working??
    const tempGroup = await Group.findOneOrFail({ id: group.id })
    tempGroup.botPlanID = newPlan.id
    await tempGroup.save()

    group.botPlanID = newPlan.id

    return group
  }
}
