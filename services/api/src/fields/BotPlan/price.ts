import { FieldResolver, Resolver, Root } from 'type-graphql'
import { BotPlan } from '../../entities/BotPlan'
import stripe from '../../utils/stripe'

@Resolver(() => BotPlan)
export default class {
  @FieldResolver(() => Number)
  async price(@Root() botPlan: BotPlan): Promise<number> {
    const stripePrice = await stripe.prices.retrieve(botPlan.stripePriceID)
    return stripePrice.unit_amount!
  }
}
