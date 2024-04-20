import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { ActivityEntry } from '../../entities/ActivityEntry'
import { Group } from '../../entities/Group'
import ActivityEvent from '../../types/ActivityEvent'
import ServerContext from '../../types/ServerContext'
import stripe from '../../utils/stripe'

@Resolver()
export default class {
  @Mutation(() => Group)
  async updatePaymentMethod(
    @Ctx() { group, user }: ServerContext,
    @Arg('name') name: string,
    @Arg('paymentID') paymentID: string
  ): Promise<Group> {
    await stripe.paymentMethods.attach(paymentID, { customer: group?.customerID! })

    await stripe.customers.update(group?.customerID!, {
      invoice_settings: {
        default_payment_method: paymentID
      },
      name
    })

    await ActivityEntry.create({
      event: ActivityEvent.UPDATED_PAYMENT,
      groupID: group?.id,
      adminID: user?.id
    }).save()

    return group!
  }
}
