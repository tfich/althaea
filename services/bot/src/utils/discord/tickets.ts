import { ApolloClient } from '@apollo/client/core'
import { oneLine } from 'common-tags'
import { GuildMember } from 'discord.js'
import moment from 'moment-timezone'
import Embed from '../../classes/Embed'
import { CreateTicketDocument, Group, Mutation, MutationCreateTicketArgs, TicketType } from '../../graphql'
import { capitalizeFirstLetters } from '../conventions'
import { createTextChannel, findOrCreateCategory } from './channel'

export const createTicketChannel = async (client: ApolloClient<any>, member: GuildMember, type: TicketType) => {
  const category = await findOrCreateCategory(member.guild, `${type.toLowerCase()} tickets`)

  const ticketChannel = await createTextChannel(
    member.guild,
    `${type.toLowerCase()}-${member.user.tag.toLowerCase()}`,
    category,
    `${capitalizeFirstLetters(type)} ticket created for ${member.user.tag}.`
  )

  await client.mutate<Mutation, MutationCreateTicketArgs>({
    mutation: CreateTicketDocument,
    variables: { type, memberID: member.id, channelID: ticketChannel.id }
  })

  return ticketChannel
}

export const createSupportTicketEmbed = (group: Group, member: GuildMember) =>
  new Embed(group)
    .setTitle('Support Ticket')
    .setDescription(
      oneLine`
          Welcome, ${member.toString()}! Our support team will be here to assist you soon.
          If you have any additional information, please share it now so we can assure the fastest response time.
        `
    )
    .addField('Member Status', capitalizeFirstLetters(member.user.presence.status), true)
    .addField('Date Joined', moment(member.joinedAt).format('llll'), true)
    .addField(`Roles (${member.roles.cache.size})`, member.roles.cache.map((r) => r.toString()).join(' '))
