import Stripe from 'stripe'
import { Field, FieldResolver, ObjectType, Resolver, Root } from 'type-graphql'
import { Group } from '../../entities/Group'
import stripe from '../../utils/stripe'

@ObjectType()
class PaymentMethod {
  @Field()
  brand: string

  @Field()
  lastFour: string

  @Field()
  month: number

  @Field()
  year: number

  @Field()
  postalCode: string
}

@Resolver(() => Group)
export default class {
  @FieldResolver(() => PaymentMethod, { nullable: true })
  async paymentMethod(@Root() { customerID }: Group): Promise<PaymentMethod | null> {
    const customer = (await stripe.customers.retrieve(customerID)) as Stripe.Customer
    if (!customer || !customer.invoice_settings || !customer.invoice_settings.default_payment_method) {
      return null
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(
      customer.invoice_settings.default_payment_method as string
    )

    if (!paymentMethod) {
      return null
    }

    const { card, billing_details } = paymentMethod

    return {
      brand: card?.brand!,
      lastFour: card?.last4!,
      month: card?.exp_month!,
      year: card?.exp_year!,
      postalCode: billing_details.address?.postal_code!
    }
  }
}
