import {
  CategoryChannel,
  ChannelResolvable,
  Guild,
  GuildMember,
  OverwriteResolvable,
  PermissionString,
  Role,
  TextChannel,
  User
} from 'discord.js'
import { getID } from './general'

export const defaultRoles: PermissionString[] = [
  'SEND_MESSAGES',
  'READ_MESSAGE_HISTORY',
  'VIEW_CHANNEL',
  'ATTACH_FILES',
  'ADD_REACTIONS'
]

export const addToChannel = async (channel: TextChannel, roleOrUser: string | Role | User | GuildMember) =>
  channel.overwritePermissions([{ id: getID(roleOrUser), allow: defaultRoles }])

export const removeFromChannel = async (channel: TextChannel, roleOrUser: string | Role | User | GuildMember) =>
  channel.overwritePermissions([{ id: getID(roleOrUser), deny: defaultRoles }])

export const createTextChannel = async (
  guild: Guild | null,
  name: string,
  parent?: ChannelResolvable,
  topic?: string,
  overwrites?: OverwriteResolvable[]
) => {
  if (!guild) {
    throw Error('A guild must be specified when creating a channel!')
  }
  return guild.channels.create(name, {
    permissionOverwrites: overwrites,
    type: 'text',
    parent,
    topic
  })
}

export const createCategory = async (guild: Guild | null, name: string) => {
  if (!guild) {
    throw Error('A guild must be specified when creating a category!')
  }
  return guild.channels.create(name, { type: 'category' })
}

export const findOrCreateCategory = async (guild: Guild | null, name: string) => {
  if (!guild) {
    throw Error('A guild must be specified when getting a category by name!')
  }
  const category = guild.channels.cache.find(
    (channel) => channel.name.toLowerCase() === name.toLowerCase() && channel.type === 'category'
  ) as CategoryChannel | undefined
  return category || createCategory(guild, name)
}

export const duplicateChannel = async ({ guild, name, topic, nsfw, parent, rateLimitPerUser }: TextChannel) =>
  guild.channels.create(`${name}-copy`, {
    ...(parent ? { parent } : {}),
    ...(topic ? { topic } : {}),
    nsfw,
    rateLimitPerUser
  })
