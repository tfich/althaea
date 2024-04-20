import { Query, Resolver } from 'type-graphql'
import { Tool } from '../../entities/Tool'

@Resolver()
export default class {
  @Query(() => [Tool])
  async tools(): Promise<Tool[]> {
    return Tool.find()
  }
}
