import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { SuccessTweet } from '../../entities/SuccessTweet'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => SuccessTweet)
  async updateSuccessTweet(
    @Ctx() { group }: ServerContext,
    @Arg('id') id: number,
    @Arg('followUpMessageID') followUpMessageID: string
  ): Promise<SuccessTweet> {
    const successTweet = await SuccessTweet.findOneOrFail({ id })

    successTweet.followUpMessageID = followUpMessageID

    return successTweet.save()
  }
}
