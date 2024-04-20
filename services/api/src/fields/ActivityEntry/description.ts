import { FieldResolver, Resolver, Root } from 'type-graphql'
import { ActivityEntry } from '../../entities/ActivityEntry'
import activityDescriptions from '../../utils/constants/activityDescriptions'

@Resolver(() => ActivityEntry)
export default class {
  @FieldResolver(() => String)
  async description(@Root() activityEntry: ActivityEntry): Promise<string> {
    return activityDescriptions[activityEntry.event](activityEntry.info)
  }
}
