import base64url from 'base64url'
import { Ctx, Query, Resolver } from 'type-graphql'
import TwitterClient from '../controllers/TwitterClient'
import ServerContext from '../types/ServerContext'
import redis from '../utils/redis'

@Resolver()
export default class {
  @Query(() => String)
  async twitterUrl(@Ctx() { group }: ServerContext): Promise<string> {
    const twitterClient = new TwitterClient()
    const state = base64url(JSON.stringify({ groupID: group?.id }))
    const { oauthToken, oauthTokenSecret } = await twitterClient.getRequestTokens(state)
    await redis.setex(`twitter_secret:group_${group?.id}`, 120, oauthTokenSecret)
    return `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`
  }
}
