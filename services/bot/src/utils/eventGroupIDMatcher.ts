import { ClientEvents } from 'discord.js'

const eventGroupIDMatcher: {
  [E in keyof ClientEvents]?: (...args: ClientEvents[E]) => string
} = {
  messageReactionAdd: (reaction) => reaction.message.guild?.id!,
  messageReactionRemove: (reaction) => reaction.message.guild?.id!,
  message: (message) => message.guild?.id!,
  messageDelete: (message) => message.guild?.id!,
  messageUpdate: (message) => message.guild?.id!,
  guildMemberAdd: (member) => member.guild.id,
  guildMemberRemove: (message) => message.guild?.id!
}

export default eventGroupIDMatcher
