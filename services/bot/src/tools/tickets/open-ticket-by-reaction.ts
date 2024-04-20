import { User } from 'discord.js'
import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { TicketType, ToolCategory, ToolType } from '../../graphql'
import { isEmbedTitle } from '../../utils/discord/general'
import { createSupportTicketEmbed, createTicketChannel } from '../../utils/discord/tickets'

const tool = new Tool({
  id: 'open-ticket-by-reaction',
  name: 'Open Ticket By Reaction',
  description: 'Open a ticket using a custom reaction embed',
  category: ToolCategory.Tickets,
  type: ToolType.Command,
  commandTrigger: 'ticket-react'
})

tool.addCommand({
  description: 'Creates a ticket reaction embed',
  args: [],
  async exec(message, _, { group }) {
    const embed = new Embed(group)
      .setTitle('Ticket React System')
      .setDescription('Simply react with 📨 to open a support ticket!')

    const embedMsg = await message.channel.send(embed)

    await embedMsg.react('📨')

    return embedMsg
  }
})

tool.addListener('messageReactionAdd', async ([{ message, emoji }, user], group, client) => {
  if (!isEmbedTitle(message, 'Ticket React System') || emoji.name !== '📨' || user.bot) {
    return
  }
  const member = message.guild?.members.cache.get(user.id)
  if (!member) {
    return
  }

  const ticketChannel = await createTicketChannel(client, member, TicketType.Support)

  const ticketEmbed = createSupportTicketEmbed(group, member)
  await ticketChannel.send(ticketEmbed)

  await message.reactions.resolve('📨')?.users.remove(user as User)
})

export default tool
