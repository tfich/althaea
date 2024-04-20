import { Group } from '../entities/Group'
import env from '../env'
import {
  DiscordGuild,
  DiscordGuildChannel,
  DiscordGuildMember,
  DiscordGuildRole,
  DiscordUser
} from '../types/discordAPI'
import crypt from '../utils/crypt'
import BaseDiscordClient from './BaseDiscordClient'

export default class GroupDiscordClient extends BaseDiscordClient {
  constructor(private group: Group) {
    super()
    const clientAuth = group.customBotConfigured ? crypt.decrypt(group.botToken!) : env.MAIN_BOT_TOKEN
    this.auth = `Bot ${clientAuth}`
  }

  public async getUser(id: string): Promise<DiscordUser> {
    return this.request({ url: `/users/${id}` })
  }

  public async getGuild(): Promise<DiscordGuild> {
    return this.request({ url: `/guilds/${this.group.id}` })
  }

  public async getGuildMember(id: string): Promise<DiscordGuildMember> {
    return this.request({ url: `/guilds/${this.group.id}/members/${id}` })
  }

  public async getGuildMembersPaginated(cursor: number): Promise<DiscordGuildMember[]> {
    return this.request({
      url: `/guilds/${this.group.id}/members?limit=50${cursor > 0 ? `&after=${cursor}` : ''}`
    })
  }

  public async getAllGuildMembers(): Promise<DiscordGuildMember[]> {
    return this.paginatedRequest(
      {
        url: `/guilds/${this.group.id}/members`
      },
      100
    )
  }

  public async getGuildChannels(): Promise<DiscordGuildChannel[]> {
    return this.request({ url: `/guilds/${this.group.id}/channels` })
  }

  public async getGuildRoles(): Promise<DiscordGuildRole[]> {
    return this.request({ url: `/guilds/${this.group.id}/roles` })
  }

  public async getBotUser(): Promise<DiscordUser> {
    return this.request({ url: '/users/@me' })
  }

  public async messageChannel(channelID: string, embed?: object, message?: string) {
    return this.request({
      method: 'POST',
      url: `/channels/${channelID}/messages`,
      json: { content: message, embed }
    })
  }

  public async dmUser(userID: string, embed?: object, message?: string) {
    const { id } = await this.request({
      method: 'POST',
      url: '/users/@me/channels',
      json: { recipient_id: userID }
    })

    return this.messageChannel(id, embed, message)
  }
}
