import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { KeywordPingerEntry } from '../../entities/KeywordPingerEntry'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => KeywordPingerEntry)
  async createKeywordPingerEntry(
    @Ctx() { group }: ServerContext,
    @Arg('keywordSet') keywordSet: string,
    @Arg('channels', () => [String]) channels: string[],
    @Arg('pingRoles', () => [String]) pingRoles: string[]
  ): Promise<KeywordPingerEntry> {
    return KeywordPingerEntry.create({ groupID: group?.id!, keywordSet, channels, pingRoles }).save()
  }
}
