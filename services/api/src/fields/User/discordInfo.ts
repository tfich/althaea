import { Field, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql'
import UserDiscordClient from '../../controllers/UserDiscordClient'
import { User } from '../../entities/User'

@ObjectType()
export class DiscordUserInfo {
  @Field()
  id: string

  @Field()
  username: string

  @Field()
  discriminator: string

  @Field({ nullable: true })
  avatar?: string
}

@Resolver(() => User)
export default class {
  @FieldResolver(() => DiscordUserInfo, { nullable: true })
  async discordInfo(@Root() user: User): Promise<DiscordUserInfo | null> {
    try {
      const discordClient = new UserDiscordClient(user)
      await discordClient.setAuth()
      return discordClient.getCurrentUser()
    } catch {
      return null
    }
  }
}
