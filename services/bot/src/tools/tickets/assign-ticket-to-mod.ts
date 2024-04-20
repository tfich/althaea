import { GuildMember, TextChannel } from 'discord.js'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { addToChannel } from '../../utils/discord/channel'

const tool = new Tool({
  id: 'assign-ticket-to-mod',
  name: 'Assign Ticket to Mod',
  description: 'Assign a ticket to a specific moderator',
  category: ToolCategory.Tickets,
  type: ToolType.Command,
  commandTrigger: 'assign'
})

interface Args {
  assignee: GuildMember
}

tool.addCommand<Args>({
  description: 'Assign a ticket to a specific moderator',
  args: [
    {
      key: 'assignee',
      example: '@johndoe',
      type: 'member'
    }
  ],
  async exec(message, { assignee }) {
    const channel = message.channel as TextChannel
    if (!channel.topic?.includes('ticket')) {
      return 'This channel is not a ticket!'
    }
    await addToChannel(channel, assignee)
    await assignee.send(`You have been assigned to help with ticket ${channel.toString()}!`)
    return `${assignee.toString()} has been notified and will be here to assist shortly!`
  }
})

export default tool
