import { TextChannel } from 'discord.js'
import moment from 'moment-timezone'
import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { createDiffStr } from '../../utils/strComparison'

const tool = new Tool({
  id: 'message-logs',
  name: 'Message Logs',
  description: 'Receive channel logs when a message is editted or deleted',
  category: ToolCategory.Logging,
  type: ToolType.Module
})

tool.addListener('messageDelete', async ([message], group) => {
  if (!group.messageLogsChannelID) {
    return
  }

  const embed = new Embed(group)
    .setTitle('Message Deleted')
    .setThumbnail(message.author?.avatarURL() || '')
    .addField('Author', message.author, true)
    .addField('Channel', message.channel, true)
    .addField('Embed', !!message.embeds, true)
    .addField('Date Posted', `${moment(message.createdAt).format('lll')} (${moment(message.createdAt).fromNow()})`)

  message.content && embed.addField('Content', message.content)
  message.attachments && embed.setImage(message.attachments.first()?.url || '')

  const channel = (await message.client.channels.fetch(group.messageLogsChannelID)) as TextChannel
  await channel.send(embed)
})

tool.addListener('messageUpdate', async ([oldMessage, newMessage], group) => {
  if (!group.messageLogsChannelID || newMessage.author?.bot) {
    return
  }

  const embed = new Embed(group)
    .setTitle('Message Edited')
    .setThumbnail(newMessage.author?.avatarURL() || '')
    .addField('Author', newMessage.author, true)
    .addField('Channel', newMessage.channel, true)
    .addField('Embed', !!newMessage.embeds, true)
    .addField(
      'Date Posted',
      `${moment(oldMessage.createdAt).format('lll')} (${moment(oldMessage.createdAt).fromNow()})`
    )

  if (oldMessage.content !== newMessage.content) {
    embed.addField('Old Content', oldMessage.content)
    embed.addField('New Content', createDiffStr(oldMessage.content!, newMessage.content!))
  }

  const channel = (await newMessage.client.channels.fetch(group.messageLogsChannelID)) as TextChannel
  await channel.send(embed)
})

export default tool
