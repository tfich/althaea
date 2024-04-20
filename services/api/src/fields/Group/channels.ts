import { Field, FieldResolver, ObjectType, registerEnumType, Resolver, Root } from 'type-graphql'
import GroupDiscordClient from '../../controllers/GroupDiscordClient'
import { Group } from '../../entities/Group'
import { DiscordChannelType } from '../../types/discordAPI'

registerEnumType(DiscordChannelType, { name: 'DiscordChannelType' })

@ObjectType()
class DiscordChannel {
  @Field()
  id: string

  @Field(() => DiscordChannelType)
  type: DiscordChannelType

  @Field()
  position: number

  @Field({ nullable: true })
  name?: string

  @Field({ name: 'parentID', nullable: true })
  parent_id?: string
}

@Resolver(() => Group)
export default class {
  @FieldResolver(() => [DiscordChannel], { nullable: true })
  async channels(@Root() group: Group): Promise<DiscordChannel[] | null> {
    if (!group.botAdded) {
      return null
    }
    const client = new GroupDiscordClient(group)
    return client.getGuildChannels()
  }
}
