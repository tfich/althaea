import rp from 'request-promise'
import { Group } from '../entities/Group'
import { GroupMember } from '../entities/GroupMember'
import { User } from '../entities/User'
import env from '../env'
import { DiscordUser, DiscordUserGuild } from '../types/discordAPI'
import encodeDiscordAuth from '../utils/encodeDiscordAuth'
import redis from '../utils/redis'
import BaseDiscordClient from './BaseDiscordClient'

interface DiscordAuthPartial {
  id: string
  discordRefreshToken: string
  discordAccessToken: string
}

export default class UserDiscordClient extends BaseDiscordClient {
  private authPartial: DiscordAuthPartial
  private group?: Promise<Group>

  constructor(private userOrMember: User | GroupMember) {
    super()
    const { discordRefreshToken, discordAccessToken } = userOrMember
    if (!discordRefreshToken || !discordAccessToken) {
      throw Error('Discord auth not provided!')
    }
    this.authPartial = userOrMember as any
    this.group = 'group' in userOrMember ? userOrMember.group : undefined
  }

  public async setAuth() {
    const group = (await this.group) || null

    const redisKey = group
      ? `access_token:member_${group.id}_${this.authPartial.id}`
      : `access_token:user_${this.authPartial.id}`

    const cachedAccessToken = await redis.get(redisKey)
    if (cachedAccessToken) {
      this.auth = `Bearer ${cachedAccessToken}`
      return
    }

    const clientAuth =
      group && group.customBotConfigured
        ? encodeDiscordAuth(group.botClientID, group.botClientSecret)
        : encodeDiscordAuth()

    const res = await rp({
      method: 'POST',
      url: 'https://discordapp.com/api/oauth2/token',
      headers: { Authorization: `Basic ${clientAuth}` },
      formData: {
        grant_type: 'refresh_token',
        refresh_token: this.authPartial.discordRefreshToken,
        redirect_uri: `${env.API_BASE_URL}/oauth/discord/callback`,
        scope: 'identify email guilds guilds.join'
      },
      json: true,
      transform2xxOnly: false,
      resolveWithFullResponse: true,
      transform: (body, response) => (response.statusCode === 200 ? body : null)
    })

    if (res) {
      const { access_token, refresh_token, expires_in } = res
      const expirationDate = new Date()
      expirationDate.setSeconds(expirationDate.getSeconds() + Number(expires_in))

      this.auth = `Bearer ${access_token}`

      this.userOrMember.discordAccessToken = access_token
      this.userOrMember.discordRefreshToken = refresh_token
      await this.userOrMember.save()
      await redis.setex(redisKey, expires_in, access_token)
    } else {
      throw Error('Unable to refresh discord access token')
    }
  }

  public async getCurrentUser(): Promise<DiscordUser> {
    return this.request({ url: '/users/@me' })
  }

  public async getCurrentUserGuilds(): Promise<DiscordUserGuild[]> {
    return this.request({ url: '/users/@me/guilds' })
  }
}
