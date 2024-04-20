import { Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql'
import ServerContext from '../../types/ServerContext'
import stripe from '../../utils/stripe'

@ObjectType()
class Invoice {
  @Field()
  date: Date

  @Field()
  amount: number

  @Field({ nullable: true })
  status?: string

  @Field()
  pdfUrl: string
}

@Resolver()
export default class {
  @Query(() => [Invoice])
  async invoices(@Ctx() { group }: ServerContext): Promise<Invoice[]> {
    const stripeInvoices = await stripe.invoices.list({ customer: group?.customerID, limit: 5 })
    return stripeInvoices.data.map(({ created, amount_paid, status, invoice_pdf }) => ({
      date: new Date(created * 1000),
      amount: amount_paid,
      status: status as string,
      pdfUrl: invoice_pdf as string
    }))
  }
}
