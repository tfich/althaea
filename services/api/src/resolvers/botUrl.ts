import base64url from 'base64url'
import querystring from 'querystring'
import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import env from '../env'
import DiscordOauthState from '../types/DiscordOauthState'
import ServerContext from '../types/ServerContext'

@Resolver()
export default class {
  @Query(() => String)
  async botUrl(
    @Ctx() { client, group }: ServerContext,
    @Arg('clientID', { nullable: true }) clientID: string,
    @Arg('redirectUrl', { defaultValue: '/dashboard' }) redirectUrl: string
  ): Promise<string> {
    const state: DiscordOauthState = {
      client: client!,
      isBot: true,
      redirectUrl
    }
    const query = {
      client_id: clientID || env.MAIN_BOT_CLIENT_ID,
      scope: 'bot',
      permissions: 8,
      guild_id: group?.id,
      disable_guild_select: true,
      redirect_uri: `${env.API_BASE_URL}/oauth/discord/callback`,
      response_type: 'code',
      state: base64url(JSON.stringify(state))
    }
    return `https://discordapp.com/api/oauth2/authorize?${querystring.stringify(query)}`
  }
}
