import Tool from '../../classes/Tool'
import { TicketType, ToolCategory, ToolType } from '../../graphql'
import { createSupportTicketEmbed, createTicketChannel } from '../../utils/discord/tickets'

const tool = new Tool({
  id: 'create-ticket',
  name: 'Create Ticket',
  description: 'A command to manually create a ticket',
  category: ToolCategory.Tickets,
  type: ToolType.Command,
  commandTrigger: 'ticket',
  free: true
})

tool.addCommand({
  description: 'Open a support ticket',
  args: [],
  async exec(message, _, { group, client }) {
    if (!message.member) {
      throw Error('A member must be specified when creating a channel.')
    }

    const ticketChannel = await createTicketChannel(client, message.member, TicketType.Support)

    const ticketEmbed = createSupportTicketEmbed(group, message.member)
    await ticketChannel.send(ticketEmbed)

    return `a support ticket was created for you in ${ticketChannel.toString()}.`
  }
})

export default tool
