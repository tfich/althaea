import { TextChannel } from 'discord.js'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { duplicateChannel } from '../../utils/discord/channel'

const tool = new Tool({
  id: 'duplicate-channel',
  name: 'Duplicate Channel',
  description: 'Create a new channel using the base of another channel',
  category: ToolCategory.Management,
  type: ToolType.Command,
  commandTrigger: 'duplicate'
})

tool.addCommand({
  description: "Creates a new channel with the current channel's settings",
  args: [],
  async exec({ channel }) {
    const dupChannel = await duplicateChannel(channel as TextChannel)
    dupChannel.send(`This channel was created with the same settings as ${channel.toString()}!`)
    return `a copy of this channel's settings were created in ${dupChannel.toString()}.`
  }
})

export default tool
