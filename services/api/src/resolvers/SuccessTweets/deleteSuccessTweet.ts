import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import TwitterClient from '../../controllers/TwitterClient'
import { SuccessTweet } from '../../entities/SuccessTweet'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => SuccessTweet, { nullable: true })
  async deleteSuccessTweet(
    @Ctx() { group }: ServerContext,
    @Arg('messageID', { nullable: true }) messageID?: string,
    @Arg('followUpMessageID', { nullable: true }) followUpMessageID?: string
  ): Promise<SuccessTweet | undefined> {
    if (!messageID && !followUpMessageID) {
      throw Error('You must provide a non-null messageID or followUpMessageID!')
    }
    const successTweet = messageID
      ? await SuccessTweet.findOne({ messageID })
      : await SuccessTweet.findOne({ followUpMessageID })
    if (!successTweet) {
      return undefined
    }

    const successTweetID = successTweet.id

    const twitter = new TwitterClient(group!)
    if (successTweet.tweetID) {
      try {
        await twitter.deleteTweet(successTweet.tweetID)
      } catch (err) {
        return undefined
      }
    }

    await successTweet.remove()

    return Object.assign(successTweet, { id: successTweetID, ...(messageID ? { messageID } : { followUpMessageID }) })
  }
}
