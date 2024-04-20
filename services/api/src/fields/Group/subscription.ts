import Stripe from 'stripe'
import { Field, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql'
import { Group } from '../../entities/Group'
import stripe from '../../utils/stripe'

@ObjectType()
class Subscription {
  @Field()
  status: string

  @Field({ nullable: true })
  nextPaymentDate?: Date

  @Field({ nullable: true })
  nextPaymentAmount?: number

  @Field({ nullable: true })
  previousPaymentDate?: Date

  @Field({ nullable: true })
  previousPaymentAmount?: number

  @Field({ nullable: true })
  coupon?: string
}

@Resolver(() => Group)
export default class {
  @FieldResolver(() => Subscription)
  async subscription(@Root() { subscriptionID }: Group): Promise<Subscription> {
    const { status, latest_invoice } = await stripe.subscriptions.retrieve(subscriptionID, {
      expand: ['latest_invoice']
    })

    const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
      subscription: subscriptionID
    })

    const nextPaymentDate =
      upcomingInvoice && upcomingInvoice.next_payment_attempt
        ? new Date(upcomingInvoice.next_payment_attempt * 1000)
        : undefined
    const nextPaymentAmount = upcomingInvoice?.amount_due

    const previousPaymentDate = latest_invoice ? new Date((latest_invoice as Stripe.Invoice).created * 1000) : undefined
    const previousPaymentAmount = (latest_invoice as Stripe.Invoice)?.amount_due

    const discount = upcomingInvoice.discount
      ? upcomingInvoice.discount.coupon.percent_off
        ? `${upcomingInvoice.discount.coupon.percent_off}% off`
        : `$${upcomingInvoice.discount.coupon.amount_off} off`
      : undefined

    const duration = upcomingInvoice.discount
      ? upcomingInvoice.discount.coupon.duration === 'repeating'
        ? `${upcomingInvoice.discount.coupon.duration_in_months} months`
        : upcomingInvoice.discount.coupon.duration
      : undefined

    const coupon = discount && `${upcomingInvoice.discount?.coupon.id} (${discount} ${duration})`

    return {
      status,
      nextPaymentDate,
      nextPaymentAmount,
      previousPaymentDate,
      previousPaymentAmount,
      coupon
    }
  }
}
