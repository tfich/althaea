import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { ActivityEntry } from '../../entities/ActivityEntry'
import { Group } from '../../entities/Group'
import ActivityEvent from '../../types/ActivityEvent'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => Group)
  async updateNotificationSettings(
    @Ctx() { group, user }: ServerContext,
    @Arg('logChannelID', { nullable: true }) logChannelID?: string,
    @Arg('announcementsChannelID', { nullable: true }) announcementsChannelID?: string
  ): Promise<Group> {
    await ActivityEntry.create({
      event: ActivityEvent.UPDATED_NOTIFICATIONS_SETTINGS,
      groupID: group?.id,
      adminID: user?.id
    }).save()

    Object.assign(group, { logChannelID, announcementsChannelID })
    return group!.save()
  }
}
