import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { LoyaltyPrize } from '../../entities/LoyaltyPrize'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => LoyaltyPrize)
  async createLoyaltyPrize(
    @Ctx() { group }: ServerContext,
    @Arg('name') name: string,
    @Arg('cost') cost: number
  ): Promise<LoyaltyPrize> {
    return LoyaltyPrize.create({ groupID: group!.id, name, cost }).save()
  }
}
