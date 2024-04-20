import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { ReactionRole } from '../../entities/ReactionRole'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => ReactionRole)
  async removeReactionRole(@Ctx() { group }: ServerContext, @Arg('id') id: number): Promise<ReactionRole> {
    const reactionRole = await ReactionRole.findOneOrFail({ groupID: group?.id!, id })

    await reactionRole.remove()

    return Object.assign(reactionRole, { id })
  }
}
