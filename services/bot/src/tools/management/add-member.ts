import { GuildMember, Role, TextChannel } from 'discord.js'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { addToChannel } from '../../utils/discord/channel'

const tool = new Tool({
  id: 'add-member',
  name: 'Add Member to Channel',
  description: 'Quickly add a specified member to a channel',
  category: ToolCategory.Management,
  type: ToolType.Command,
  commandTrigger: 'add'
})

interface Args {
  memberOrRole: GuildMember | Role
}

tool.addCommand<Args>({
  description: 'Adds a specified member to the current channel',
  args: [
    {
      key: 'memberOrRole',
      example: '@johndoe',
      type: 'memberOrRole'
    }
  ],
  async exec(message, { memberOrRole }) {
    await addToChannel(message.channel as TextChannel, memberOrRole)
    return `successfully added ${memberOrRole}.`
  }
})

export default tool
