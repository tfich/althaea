import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { GroupMember } from '../../entities/GroupMember'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Query(() => GroupMember)
  async groupMember(@Ctx() { group }: ServerContext, @Arg('memberID') memberID: string): Promise<GroupMember> {
    return GroupMember.findOrCreate({ groupID: group?.id!, memberID })
  }
}
