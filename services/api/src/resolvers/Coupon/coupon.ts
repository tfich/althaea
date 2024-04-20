import { Arg, Query, Resolver } from 'type-graphql'
import { Coupon } from '../../entities/Coupon'

@Resolver()
export default class {
  @Query(() => Coupon, { nullable: true })
  async coupon(@Arg('id') id: string): Promise<Coupon | undefined> {
    return Coupon.findOne({ id, claimed: false })
  }
}
