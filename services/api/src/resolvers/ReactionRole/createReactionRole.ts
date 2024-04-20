import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { ReactionRole } from '../../entities/ReactionRole'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => ReactionRole)
  async createReactionRole(
    @Ctx() { group }: ServerContext,
    @Arg('emoji') emoji: string,
    @Arg('roleID') roleID: string
  ): Promise<ReactionRole> {
    return ReactionRole.create({ groupID: group?.id!, emoji, roleID }).save()
  }
}
