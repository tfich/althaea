import { ApolloError } from 'apollo-server-express'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { ActivityEntry } from '../../entities/ActivityEntry'
import { Coupon } from '../../entities/Coupon'
import ActivityEvent from '../../types/ActivityEvent'
import ServerContext from '../../types/ServerContext'
import stripe from '../../utils/stripe'

// TODO: account for trialPeriodDays by adding x days to sub

@Resolver()
export default class {
  @Mutation(() => Coupon)
  async applyCoupon(@Ctx() { group, user }: ServerContext, @Arg('id') id: string): Promise<Coupon> {
    const coupon = await Coupon.findOneOrFail({ id })

    if (coupon.userID && coupon.userID !== user?.id) {
      throw new ApolloError('You do not have access to this coupon.')
    }

    const stripeCoupon = await stripe.coupons.create({
      id: coupon.id,
      duration: coupon.forever ? 'forever' : 'once',
      amount_off: coupon.amountOff || undefined,
      percent_off: coupon.percentOff || undefined,
      currency: 'USD',
      metadata: { group_id: group?.id! }
    })

    await stripe.subscriptions.update(group?.subscriptionID!, {
      coupon: stripeCoupon.id
    })

    coupon.claimed = true

    await ActivityEntry.create({
      event: ActivityEvent.APPLIED_COUPON,
      groupID: group?.id,
      adminID: user?.id,
      info: id
    }).save()

    return coupon.save()
  }
}
