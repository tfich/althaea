import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { Ticket } from '../../entities/Ticket'
import ServerContext from '../../types/ServerContext'
import TicketType from '../../types/TicketType'

@Resolver()
export default class {
  @Mutation(() => Ticket)
  async createTicket(
    @Ctx() { group }: ServerContext,
    @Arg('type', () => TicketType) type: TicketType,
    @Arg('memberID') memberID: string,
    @Arg('channelID') channelID: string
  ): Promise<Ticket> {
    return Ticket.create({ groupID: group?.id!, type, memberID, channelID }).save()
  }
}
