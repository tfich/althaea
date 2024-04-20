import { TextChannel } from 'discord.js'
import moment from 'moment-timezone'
import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { capitalizeFirstLetters } from '../../utils/conventions'

const tool = new Tool({
  id: 'join-leave-logs',
  name: 'Join and Leave Logs',
  description: 'Receive channel logs when a member joins or leaves your server',
  category: ToolCategory.Logging,
  type: ToolType.Module
})

tool.addListener('guildMemberAdd', async ([member], group) => {
  if (!group.joinLeaveLogChannelID) {
    return
  }

  const embed = new Embed(group)
    .setTitle('Member Joined')
    .setThumbnail(member?.user?.avatarURL() || '')
    .addField('User', `${member?.user?.tag} ${member?.nickname ? `(${member?.nickname})` : ''}`, true)
    .addField('Discord User Since', moment(member?.user?.createdAt).format('ll'), true)
    .addField('Member Status', capitalizeFirstLetters(member?.user?.presence.status!), true)

  const channel = (await member.client.channels.fetch(group.joinLeaveLogChannelID)) as TextChannel
  await channel.send(embed)
})

tool.addListener('guildMemberRemove', async ([member], group) => {
  if (!group.joinLeaveLogChannelID) {
    return
  }

  const embed = new Embed(group)
    .setTitle('Member Removed')
    .setThumbnail(member?.user?.avatarURL() || '')
    .addField('User', `${member?.user?.tag} ${member?.nickname ? `(${member?.nickname})` : ''}`, true)
    .addField('Member Since', moment(member?.joinedAt).format('ll'), true)
    .addField('Member Status', capitalizeFirstLetters(member?.user?.presence.status!), true)
    .addField(`Roles (${member?.roles.cache.size})`, member?.roles.cache.map((r) => r.toString()).join(' '))

  const channel = (await member.client.channels.fetch(group.joinLeaveLogChannelID)) as TextChannel
  await channel.send(embed)
})

export default tool
