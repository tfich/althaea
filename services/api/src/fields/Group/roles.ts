import { Field, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql'
import GroupDiscordClient from '../../controllers/GroupDiscordClient'
import { Group } from '../../entities/Group'

@ObjectType()
class DiscordRole {
  @Field()
  id: string

  @Field({ nullable: true })
  name: string

  @Field()
  permissions: number

  @Field()
  mentionable: boolean
}

@Resolver(() => Group)
export default class {
  @FieldResolver(() => [DiscordRole], { nullable: true })
  async roles(@Root() group: Group): Promise<DiscordRole[] | null> {
    if (!group.botAdded) {
      return null
    }
    const client = new GroupDiscordClient(group)
    return client.getGuildRoles()
  }
}
