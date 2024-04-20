import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { ActivityEntry } from '../../entities/ActivityEntry'
import { GroupToolConfig } from '../../entities/GroupToolConfig'
import ActivityEvent from '../../types/ActivityEvent'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => GroupToolConfig)
  async addToolConfig(@Ctx() { group, user }: ServerContext, @Arg('toolID') toolID: string): Promise<GroupToolConfig> {
    const { defaultChannels, defaultChannelsAllowed, defaultRoles, defaultRolesAllowed } = group!

    const currentToolConfig = await GroupToolConfig.findOne({ groupID: group?.id, toolID })
    if (currentToolConfig) {
      throw Error(`${toolID} is already enabled for ${group?.id}`)
    }

    const toolConfig = await GroupToolConfig.create({
      groupID: group?.id,
      toolID,
      channels: defaultChannels,
      channelsAllowed: defaultChannelsAllowed,
      roles: defaultRoles,
      rolesAllowed: defaultRolesAllowed
    }).save()

    const tool = await toolConfig.tool
    await ActivityEntry.create({
      event: ActivityEvent.ADDED_TOOL,
      groupID: group?.id,
      adminID: user?.id,
      info: tool.name
    }).save()

    return toolConfig
  }
}
