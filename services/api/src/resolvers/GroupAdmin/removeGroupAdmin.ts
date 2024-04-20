import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import GroupDiscordClient from '../../controllers/GroupDiscordClient'
import { ActivityEntry } from '../../entities/ActivityEntry'
import { GroupAdmin } from '../../entities/GroupAdmin'
import ActivityEvent from '../../types/ActivityEvent'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => GroupAdmin)
  async removeGroupAdmin(
    @Arg('userID') userID: string,
    @Ctx() { group, user: ctxUser }: ServerContext
  ): Promise<GroupAdmin> {
    const groupAdmin = await GroupAdmin.findOneOrFail({ userID, groupID: group?.id! })
    await groupAdmin.remove()

    const discordClient = new GroupDiscordClient(group!)
    const userInfo = await discordClient.getUser(userID)

    await ActivityEntry.create({
      event: ActivityEvent.REMOVED_ADMIN,
      groupID: group?.id,
      adminID: ctxUser?.id,
      info: userInfo ? `${userInfo.username}#${userInfo.discriminator}` : 'n/a'
    }).save()

    return Object.assign(groupAdmin, { userID, groupID: group?.id! })
  }
}
