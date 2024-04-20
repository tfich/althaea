import { GuildMember } from 'discord.js'
import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { TicketType, ToolCategory, ToolType } from '../../graphql'
import { capitalizeFirstLetters } from '../../utils/conventions'
import { createTicketChannel } from '../../utils/discord/tickets'

const tool = new Tool({
  id: 'welcome-tickets',
  name: 'Welcome Tickets',
  description: 'Automatically open a ticket when a user joins your server',
  category: ToolCategory.Tickets,
  type: ToolType.Module
})

tool.addListener('guildMemberAdd', async ([member], group, client) => {
  const ticketChannel = await createTicketChannel(client, member as GuildMember, TicketType.Welcome)

  // TODO: add group.welcomeTicketMessage when api is done
  const ticketEmbed = new Embed(group)
    .setTitle('Welcome Ticket')
    .setDescription('TODO')
    .addField('Member Status', capitalizeFirstLetters(member.user?.presence.status!), true)
    .addField(`Roles (${member.roles.cache.size})`, member.roles.cache.map((r) => r.toString()).join(' '))

  await ticketChannel.send(ticketEmbed)
})

export default tool
