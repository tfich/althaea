import { Query, Resolver } from 'type-graphql'
import env from '../env'

@Resolver()
export default class {
  @Query(() => String)
  async supportServerInvite(): Promise<string> {
    // TODO: log invites and create them via Discord API
    return env.SUPPORT_SERVER_INVITE
  }
}
