import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { GroupMember } from '../../entities/GroupMember'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => GroupMember)
  async updateSmsNumber(
    @Ctx() { group }: ServerContext,
    @Arg('memberID') memberID: string,
    @Arg('smsNumber', { nullable: true }) smsNumber: string
  ): Promise<GroupMember> {
    const groupMember = await GroupMember.findOrCreate({ groupID: group!.id, memberID })
    groupMember.smsNumber = (smsNumber || null) as any
    return groupMember.save()
  }
}
