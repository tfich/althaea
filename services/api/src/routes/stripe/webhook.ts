import bodyParser from 'body-parser'
import { Router } from 'express'
import { Group } from '../../entities/Group'
import env from '../../env'
import stripe from '../../utils/stripe'

export const stripeWebhookRouter = Router()

stripeWebhookRouter.use(bodyParser.raw({ type: 'application/json' }))

stripeWebhookRouter.post('/', async (req, res) => {
  const signature = req.headers['stripe-signature'] as string
  const event = stripe.webhooks.constructEvent(req.body, signature, env.STRIPE_WEBHOOK_SECRET)
  const {
    customer: customerID,
    subscription: subscriptionID,
    id: objectID,
    attempt_count: attemptCount,
    amount_paid: amountPaid
  } = event.data.object as any

  const subscription = await stripe.subscriptions.retrieve(subscriptionID)

  const group = await Group.findOne({ customerID })
  if (!group) {
    throw new Error(`Could not find a group with customer id ${customerID}`)
  }

  if (event.type === 'invoice.payment_succeeded') {
    if (amountPaid > 0) {
      // log successful payments
    }
  }

  if (event.type === 'invoice.payment_failed') {
    if (attemptCount < 3) {
      // dm user that their payment failed and to update it on the dashboard
    } else {
      // downgrades their plan to free
      await stripe.subscriptions.update(subscription.id, {
        proration_behavior: 'none',
        items: [{ price: env.BOT_PLAN_FREE_PRICE_ID }],
        expand: ['latest_invoice.payment_intent']
      })

      await stripe.invoices.pay((subscription.latest_invoice as any).id)

      // TODO: fix all this
      // group.subscriptionID = env.TOOL_FREE_PRICE_ID
      await group.save()
      // TODO: remove premium tool configs
    }
  }

  // 3 days before ending
  if (event.type === 'customer.subscription.trial_will_end') {
    // dm user that their trial is expiring
  }

  return res.sendStatus(200)
})
