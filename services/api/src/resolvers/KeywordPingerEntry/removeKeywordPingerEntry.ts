import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { ReactionRole } from '../../entities/ReactionRole'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => ReactionRole)
  async removeKeywordPingerEntry(@Ctx() { group }: ServerContext, @Arg('id') id: number): Promise<ReactionRole> {
    const removeKeywordPingerEntry = await ReactionRole.findOneOrFail({ groupID: group?.id!, id })

    await removeKeywordPingerEntry.remove()

    return Object.assign(removeKeywordPingerEntry, { id })
  }
}
