import { Query, Resolver } from 'type-graphql'
import { IsNull, Not } from 'typeorm'
import { Group } from '../../entities/Group'

@Resolver()
export default class {
  @Query(() => Number)
  async numCustomInstances(): Promise<number> {
    const groups = await Group.find({
      botAdded: true,
      botEnabled: true,
      customBotConfigured: true,
      botPlanID: Not(IsNull())
    })
    return groups.length
  }
}
