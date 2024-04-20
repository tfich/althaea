import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql'
import { Tool } from '../../entities/Tool'
import ServerContext from '../../types/ServerContext'

@Resolver(() => Tool)
export default class {
  @FieldResolver(() => [String])
  async addableGroupIDs(@Root() tool: Tool, @Ctx() { user }: ServerContext): Promise<string[]> {
    if (!user) {
      return []
    }

    const adminGroups = (await user.adminGroups) || []
    const groups = await Promise.all(adminGroups.map(({ group }) => group))

    const addableGroupIDs: string[] = []
    for (const group of groups) {
      const toolConfigs = await group.toolConfigs
      const alreadyConfiged = toolConfigs.some(({ toolID }) => toolID === tool.id)
      const validPlan = tool.free || (group.botPlan && (await group.botPlan).allowPaidTools)
      if (!alreadyConfiged && validPlan) {
        addableGroupIDs.push(group.id)
      }
    }

    return addableGroupIDs
  }
}
