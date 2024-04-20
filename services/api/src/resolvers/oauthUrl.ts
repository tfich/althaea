import base64url from 'base64url'
import querystring from 'querystring'
import { Arg, Query, Resolver } from 'type-graphql'
import env from '../env'
import Client from '../types/Client'
import DiscordOauthState from '../types/DiscordOauthState'

@Resolver()
export default class {
  @Query(() => String)
  async oauthUrl(
    @Arg('client') client: Client,
    @Arg('redirectUrl', { defaultValue: `${env.WEB_BASE_URL}/dashboard` }) redirectUrl: string
  ): Promise<string> {
    const state: DiscordOauthState = {
      client,
      redirectUrl,
      isBot: false
    }
    const query = {
      client_id: env.MAIN_BOT_CLIENT_ID,
      redirect_uri: `${env.API_BASE_URL}/oauth/discord/callback`, // TODO: make this dynamic
      response_type: 'code',
      scope: 'identify email guilds guilds.join',
      state: base64url(JSON.stringify(state))
    }
    return `https://discordapp.com/api/oauth2/authorize?${querystring.stringify(query)}`
  }
}
