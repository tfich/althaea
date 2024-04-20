import { Field, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql'
import UserDiscordClient from '../../controllers/UserDiscordClient'
import { User } from '../../entities/User'
import GroupTokenPayload from '../../types/GroupTokenPayload'
import jwt from '../../utils/jwt'

@ObjectType()
class UserGroup {
  @Field()
  groupID: string

  @Field()
  name: string

  @Field()
  isOwner: boolean

  @Field({ nullable: true })
  icon?: string

  @Field()
  groupToken: string
}

@Resolver(() => User)
export default class {
  @FieldResolver(() => [UserGroup])
  async groups(@Root() user: User): Promise<UserGroup[]> {
    const discordClient = new UserDiscordClient(user)
    await discordClient.setAuth()
    const currentGuilds = await discordClient.getCurrentUserGuilds()

    const adminGroups = (await user.adminGroups) || []

    const userGroups: UserGroup[] = []
    for (const { groupID } of adminGroups) {
      const matchedGuild = currentGuilds.find(({ id }) => id === groupID)
      if (matchedGuild) {
        const { name, owner: isOwner, icon } = matchedGuild
        const groupToken = jwt.create<GroupTokenPayload>({ groupID, userID: user?.id }, '7d')
        userGroups.push({ groupID, name, isOwner, icon, groupToken })
      }
    }

    return userGroups
  }
}
