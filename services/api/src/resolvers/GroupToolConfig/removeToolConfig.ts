import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { ActivityEntry } from '../../entities/ActivityEntry'
import { GroupToolConfig } from '../../entities/GroupToolConfig'
import ActivityEvent from '../../types/ActivityEvent'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => GroupToolConfig)
  async removeToolConfig(
    @Ctx() { group, user }: ServerContext,
    @Arg('toolID') toolID: string
  ): Promise<GroupToolConfig> {
    const toolConfig = await GroupToolConfig.findOneOrFail({ groupID: group?.id, toolID })

    await toolConfig.remove()

    const tool = await toolConfig.tool
    await ActivityEntry.create({
      event: ActivityEvent.REMOVED_TOOL,
      groupID: group?.id,
      adminID: user?.id,
      info: tool.name
    }).save()

    return Object.assign(toolConfig, { groupID: group?.id, toolID })
  }
}
