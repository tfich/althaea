import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { ActivityEntry } from '../../entities/ActivityEntry'
import { Group } from '../../entities/Group'
import BotConfig from '../../inputs/BotConfig'
import ActivityEvent from '../../types/ActivityEvent'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => Group)
  async updateBot(
    @Ctx() { group, user }: ServerContext,
    @Arg('botConfig', () => BotConfig) botConfig: BotConfig
  ): Promise<Group> {
    await ActivityEntry.create({
      event: ActivityEvent.UPDATED_BOT,
      groupID: group?.id,
      adminID: user?.id
    }).save()

    Object.assign(group, botConfig)
    return group!.save()
  }
}
