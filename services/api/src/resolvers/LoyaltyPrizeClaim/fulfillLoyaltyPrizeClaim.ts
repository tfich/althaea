import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { LoyaltyPrizeClaim } from '../../entities/LoyaltyPrizeClaims'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => LoyaltyPrizeClaim)
  async fulfillLoyaltyPrizeClaim(
    @Ctx() { group }: ServerContext,
    @Arg('prizeClaimID') prizeClaimID: number
  ): Promise<LoyaltyPrizeClaim> {
    const loayltyPrizeClaim = await LoyaltyPrizeClaim.findOneOrFail({ groupID: group?.id, id: prizeClaimID })
    loayltyPrizeClaim.fulfilled = true
    return loayltyPrizeClaim.save()
  }
}
