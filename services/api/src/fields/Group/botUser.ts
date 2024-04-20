import { Field, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql'
import GroupDiscordClient from '../../controllers/GroupDiscordClient'
import { Group } from '../../entities/Group'

@ObjectType()
class BotUser {
  @Field()
  id: string

  @Field()
  username: string

  @Field()
  discriminator: string

  @Field({ nullable: true })
  avatar?: string
}

@Resolver(() => Group)
export default class {
  @FieldResolver(() => BotUser, { nullable: true })
  async botUser(@Root() group: Group): Promise<BotUser | null> {
    if (!group.botAdded) {
      return null
    }
    const client = new GroupDiscordClient(group)
    return client.getBotUser()
  }
}
