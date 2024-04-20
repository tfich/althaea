import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { GroupMember } from '../../entities/GroupMember'
import { LoyaltyPrize } from '../../entities/LoyaltyPrize'
import { LoyaltyPrizeClaim } from '../../entities/LoyaltyPrizeClaims'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => LoyaltyPrizeClaim)
  async createLoyaltyPrizeClaim(
    @Ctx() { group }: ServerContext,
    @Arg('memberID') memberID: string,
    @Arg('prizeID') prizeID: number
  ): Promise<LoyaltyPrizeClaim> {
    const prize = await LoyaltyPrize.findOneOrFail({ id: prizeID })
    const member = await GroupMember.findOneOrFail({ groupID: group?.id!, memberID })
    if (prize.cost > member.currentLoyaltyPoints) {
      throw Error(`${memberID} does not have enough points to claim this prize.`)
    }
    await member.adjustLoyaltyPoints(prize.cost * -1)
    return LoyaltyPrizeClaim.create({ groupID: group!.id, memberID, prizeID }).save()
  }
}
