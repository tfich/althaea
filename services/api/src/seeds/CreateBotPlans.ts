import { BotPlan } from '../entities/BotPlan'
import env from '../env'

const BOT_PLANS: Partial<BotPlan>[] = [
  {
    id: 'free',
    name: 'Free',
    stripePriceID: env.BOT_PLAN_FREE_PRICE_ID,
    hierarchy: 0,
    highlights: ['One Team Member', '10+ Tools'],
    adminLimit: 1,
    allowPaidTools: false,
    customBot: false
  },
  {
    id: 'standard',
    name: 'Standard',
    stripePriceID: env.BOT_PLAN_STANDARD_PRICE_ID,
    hierarchy: 1,
    highlights: ['Up to 10 team members', '50+ Tools'],
    adminLimit: 10,
    allowPaidTools: true,
    customBot: false
  },
  {
    id: 'custom',
    name: 'Custom',
    stripePriceID: env.BOT_PLAN_CUSTOM_PRICE_ID,
    hierarchy: 2,
    highlights: ['Up to 10 team members', '50+ Tools', 'Custom Bot'],
    adminLimit: 10,
    allowPaidTools: true,
    customBot: true
  }
]

const CreateBotPlans = async () => {
  await Promise.all(BOT_PLANS.map((plan) => BotPlan.createOrUpdate(plan)))
}

export default CreateBotPlans
