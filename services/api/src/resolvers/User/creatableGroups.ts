import { Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql'
import UserDiscordClient from '../../controllers/UserDiscordClient'
import { Group } from '../../entities/Group'
import ServerContext from '../../types/ServerContext'

@ObjectType()
class CreatableGroup {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  icon?: string
}

@Resolver()
export default class {
  @Query(() => [CreatableGroup])
  async creatableGroups(@Ctx() { user }: ServerContext): Promise<CreatableGroup[]> {
    const discordClient = new UserDiscordClient(user!)
    await discordClient.setAuth()
    const userGuilds = await discordClient.getCurrentUserGuilds()

    const allGroupIDs = (await Group.find({ select: ['id'] })).map((g) => g.id)

    return userGuilds.filter(({ id, permissions }) => !allGroupIDs.includes(id) && (permissions & 0x00000008) === 8)
  }
}
