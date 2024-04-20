import rp from 'request-promise'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { Group } from '../../entities/Group'
import ServerContext from '../../types/ServerContext'
import crypt from '../../utils/crypt'

@Resolver()
export default class {
  @Mutation(() => Group)
  async setupBot(
    @Ctx() { group }: ServerContext,
    @Arg('clientID') clientID: string,
    @Arg('clientSecret') clientSecret: string,
    @Arg('token') token: string
  ): Promise<Group> {
    try {
      await rp({
        url: `https://discordapp.com/api/guilds/${group?.id}`,
        headers: { Authorization: `Bot ${token}` },
        json: true
      })
    } catch {
      throw new Error('The bot credentials are not correct or the bot is not in your server.')
    }

    Object.assign(group, {
      botClientID: clientID,
      botClientSecret: crypt.encrypt(clientSecret),
      botToken: crypt.encrypt(token),
      botAdded: true
    })
    return group!.save()
  }
}
