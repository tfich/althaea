import { encode } from 'node-base64-image'
import Twitter, { AccessTokenOptions, TwitterOptions } from 'twitter-lite'
import { Group } from '../entities/Group'
import env from '../env'

export default class TwitterClient {
  private apiClient: Twitter
  private uploadClient: Twitter
  private userContext = false

  constructor(group?: Group) {
    const options: TwitterOptions = {
      consumer_key: env.TWITTER_API_KEY,
      consumer_secret: env.TWITTER_API_SECRET
    }

    if (group && group.twitterAccessToken && group.twitterAccessSecret) {
      options.access_token_key = group.twitterAccessToken
      options.access_token_secret = group.twitterAccessSecret
      this.userContext = true
    }

    this.apiClient = new Twitter({ ...options, subdomain: 'api' })
    this.uploadClient = new Twitter({ ...options, subdomain: 'upload' })
  }

  public async getRequestTokens(state: string) {
    const req = await this.apiClient.getRequestToken(`${env.API_BASE_URL}/oauth/twitter/callback?state=${state}`)
    if (req.oauth_callback_confirmed === 'false') {
      throw Error('Invalid callback!')
    }
    return { oauthToken: req.oauth_token, oauthTokenSecret: req.oauth_token_secret }
  }

  public async getAccessToken(options: AccessTokenOptions) {
    return this.apiClient.getAccessToken(options)
  }

  public async getScreenName() {
    if (!this.userContext) {
      return undefined
    }
    const { screen_name } = await this.apiClient.get('account/settings')
    return screen_name
  }

  public async tweetWithMedia(imageUrl: string, status: string) {
    if (!this.userContext) {
      return undefined
    }
    const encodedMedia = await encode(imageUrl, { string: true })
    const { media_id_string } = await this.uploadClient.post('media/upload', { media_data: encodedMedia })
    return this.apiClient.post('statuses/update', { status, media_ids: [media_id_string] })
  }

  public async deleteTweet(tweetID: string) {
    if (!this.userContext) {
      return undefined
    }
    return this.apiClient.post(`statuses/destroy/${tweetID}`, {})
  }
}
