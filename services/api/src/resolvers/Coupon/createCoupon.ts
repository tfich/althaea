import { ApolloError } from 'apollo-server-express'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { Coupon } from '../../entities/Coupon'

@Resolver()
export default class {
  @Mutation(() => Coupon)
  async createCoupon(
    @Arg('id') id: string,
    @Arg('userID', { nullable: true }) userID?: string,
    @Arg('trialPeriodDays', { nullable: true }) trialPeriodDays?: number,
    @Arg('percentOff', { nullable: true }) percentOff?: number,
    @Arg('amountOff', { nullable: true }) amountOff?: number,
    @Arg('forever', { nullable: true }) forever?: boolean
  ): Promise<Coupon> {
    if (percentOff && amountOff) {
      throw new ApolloError('You cannot have a coupon with a percent and fixed amount!')
    }

    return Coupon.create({
      id,
      userID,
      trialPeriodDays,
      percentOff,
      amountOff,
      forever
    }).save()
  }
}
