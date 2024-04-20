import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { ActivityEntry } from '../../entities/ActivityEntry'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Query(() => [ActivityEntry])
  async recentActivity(
    @Ctx() { group }: ServerContext,
    @Arg('limit', { defaultValue: 8 }) limit?: number
  ): Promise<ActivityEntry[]> {
    return ActivityEntry.find({
      where: {
        groupID: group?.id
      },
      order: {
        createdAt: 'DESC'
      },
      take: limit
    })
  }
}
