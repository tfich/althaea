import { Ctx, Field, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql'
import UserDiscordClient from '../../controllers/UserDiscordClient'
import { Group } from '../../entities/Group'
import ServerContext from '../../types/ServerContext'

@ObjectType()
class DiscordGroupInfo {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  icon?: string
}

@Resolver(() => Group)
export default class {
  @FieldResolver(() => DiscordGroupInfo, { nullable: true })
  async discordInfo(@Root() group: Group, @Ctx() { user }: ServerContext): Promise<DiscordGroupInfo | null> {
    if (!user) {
      return null
    }
    const discordClient = new UserDiscordClient(user!)
    await discordClient.setAuth()
    const userGuilds = await discordClient.getCurrentUserGuilds()

    return userGuilds.find(({ id }) => id === group.id) || null
  }
}
