import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { ActivityEntry } from '../../entities/ActivityEntry'
import { GroupToolConfig } from '../../entities/GroupToolConfig'
import ToolConfig from '../../inputs/ToolConfig'
import ActivityEvent from '../../types/ActivityEvent'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => GroupToolConfig)
  async updateToolConfig(
    @Ctx() { group, user }: ServerContext,
    @Arg('toolID') toolID: string,
    @Arg('toolConfig', () => ToolConfig) toolConfig: ToolConfig
  ): Promise<GroupToolConfig> {
    const toolConfigObj = await GroupToolConfig.findOneOrFail({ groupID: group?.id, toolID })

    Object.assign(toolConfigObj, toolConfig)

    const tool = await toolConfigObj.tool
    await ActivityEntry.create({
      event: ActivityEvent.UPDATED_TOOL,
      groupID: group?.id,
      adminID: user?.id,
      info: tool.name
    }).save()

    return toolConfigObj.save()
  }
}
