import { Arg, Mutation, Resolver } from 'type-graphql'
import { Tool } from '../../entities/Tool'
import ToolOptions from '../../inputs/ToolOptions'

@Resolver()
export default class {
  @Mutation(() => [Tool])
  async seedTools(@Arg('tools', () => [ToolOptions]) tools: ToolOptions[]): Promise<Tool[]> {
    return Promise.all(tools.map((tool) => Tool.createOrUpdate(tool)))
  }
}
