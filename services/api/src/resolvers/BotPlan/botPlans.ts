import { Query, Resolver } from 'type-graphql'
import { BotPlan } from '../../entities/BotPlan'

@Resolver()
export default class {
  @Query(() => [BotPlan])
  async botPlans(): Promise<BotPlan[]> {
    return BotPlan.find({
      where: { active: true },
      order: { hierarchy: 'ASC' }
    })
  }
}
