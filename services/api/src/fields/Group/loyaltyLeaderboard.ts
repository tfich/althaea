import { Arg, Field, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql'
import { Group } from '../../entities/Group'
import { GroupMember } from '../../entities/GroupMember'

@ObjectType()
class LoyaltyLeader {
  @Field()
  memberID: string

  @Field()
  points: number
}

@Resolver(() => Group)
export default class {
  @FieldResolver(() => [LoyaltyLeader])
  async loyaltyLeaderboard(
    @Root() group: Group,
    @Arg('limit', { defaultValue: 10 }) limit: number
  ): Promise<LoyaltyLeader[]> {
    const members = await GroupMember.find({
      where: { groupID: group.id },
      select: ['groupID', 'memberID', 'lifetimeLoyaltyPoints'],
      order: { lifetimeLoyaltyPoints: 'DESC' },
      take: limit
    })
    return members.map(({ memberID, lifetimeLoyaltyPoints }) => ({ memberID, points: lifetimeLoyaltyPoints }))
  }
}
