import { Ctx, Query, Resolver } from 'type-graphql'
import { Group } from '../../entities/Group'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Query(() => Group, { nullable: true })
  async group(@Ctx() { group }: ServerContext): Promise<Group | undefined> {
    return group
  }
}
