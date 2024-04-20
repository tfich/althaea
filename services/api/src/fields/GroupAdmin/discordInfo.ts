import { FieldResolver, Resolver, Root } from 'type-graphql'
import GroupDiscordClient from '../../controllers/GroupDiscordClient'
import { GroupAdmin } from '../../entities/GroupAdmin'
import { DiscordUserInfo } from '../User/discordInfo'

@Resolver(() => GroupAdmin)
export default class {
  @FieldResolver(() => DiscordUserInfo, { nullable: true })
  async discordInfo(@Root() groupAdmin: GroupAdmin): Promise<DiscordUserInfo | null> {
    try {
      const group = await groupAdmin.group
      const discordClient = new GroupDiscordClient(group)
      return discordClient.getUser(groupAdmin.userID)
    } catch {
      return null
    }
  }
}
