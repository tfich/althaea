import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { ActivityEntry } from '../../entities/ActivityEntry'
import { Group } from '../../entities/Group'
import DefaultToolConfig from '../../inputs/DefaultToolConfig'
import ActivityEvent from '../../types/ActivityEvent'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => Group)
  async updateDefaultToolConfig(
    @Ctx() { group, user }: ServerContext,
    @Arg('defaultToolConfig', () => DefaultToolConfig) defaultToolConfig: DefaultToolConfig
  ): Promise<Group> {
    await ActivityEntry.create({
      event: ActivityEvent.UPDATED_DEFAULT_COMMAND_SETTINGS,
      groupID: group?.id,
      adminID: user?.id
    }).save()

    Object.assign(group, defaultToolConfig)
    return group!.save()
  }
}
