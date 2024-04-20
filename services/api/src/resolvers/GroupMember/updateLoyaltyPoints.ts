import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { GroupMember } from '../../entities/GroupMember'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => GroupMember)
  async updateLoyaltyPoints(
    @Ctx() { group }: ServerContext,
    @Arg('memberID') memberID: string,
    @Arg('pointDifference') pointDifference: number
  ): Promise<GroupMember> {
    const member = await GroupMember.findOneOrFail({ groupID: group!.id!, memberID })
    return member.adjustLoyaltyPoints(pointDifference)
  }
}
