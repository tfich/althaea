/* Unnecessary fields may have been removed */

export interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string
  bot?: boolean
  verified: boolean
  email: string
  flags: number
  premium_type: number
  public_flags: number
}

export interface DiscordUserGuild {
  id: string
  name: string
  icon: string
  owner: boolean
  permissions: number
}

export interface DiscordGuild {
  id: string
  name: string
  icon: string
  emojis: DiscordGuildEmoji[]
  owner_id: string
  region: string
  roles: DiscordGuildRole[]
}

export interface DiscordGuildEmoji {
  id: string
  name: string
  animated: boolean
  available: boolean
}

export interface DiscordGuildRole {
  id: string
  name: string
  position: number
  permissions: number
  mentionable: boolean
}

export interface DiscordGuildMember {
  user: DiscordUser
  nick?: string
  roles: string[]
  joined_at: string
}

export enum DiscordChannelType {
  GUILD_TEXT,
  DM,
  GUILD_VOICE,
  GROUP_DM,
  GUILD_CATEGORY,
  GUILD_NEWS,
  GUILD_STORE
}

export interface DiscordGuildChannel {
  id: string
  type: DiscordChannelType
  name?: string
  position: number
  nsfw?: boolean
  topic?: string
  last_message_id?: string
  parent_id?: string
}
