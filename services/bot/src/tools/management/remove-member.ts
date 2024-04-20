import { GuildMember, Role, TextChannel } from 'discord.js'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { removeFromChannel } from '../../utils/discord/channel'

const tool = new Tool({
  id: 'remove-member',
  name: 'Remove Member',
  description: 'Quickly remove a specified member from a channel',
  category: ToolCategory.Management,
  type: ToolType.Command,
  commandTrigger: 'remove'
})

interface Args {
  memberOrRole: GuildMember | Role
}

tool.addCommand<Args>({
  description: 'Removes a specified member from the current channel',
  args: [
    {
      key: 'memberOrRole',
      example: '@johndoe',
      type: 'memberOrRole'
    }
  ],
  async exec(message, { memberOrRole }) {
    await removeFromChannel(message.channel as TextChannel, memberOrRole)
    return `successfully removed ${memberOrRole}.`
  }
})

export default tool
