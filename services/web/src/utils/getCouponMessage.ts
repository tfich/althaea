import { Coupon } from '../graphql'

const getCouponMessage = ({ trialPeriodDays, percentOff, amountOff, forever }: Coupon) => {
  const messageParts = []

  if (trialPeriodDays) {
    messageParts.push(`${trialPeriodDays} day trial`)
  }

  if (trialPeriodDays && (percentOff || amountOff)) {
    messageParts.push('with')
  }

  if (percentOff) {
    messageParts.push(`${percentOff}% off`)
  } else if (amountOff) {
    messageParts.push(`$${amountOff} off`)
  }

  if (forever && (percentOff || amountOff)) {
    messageParts.push('forever')
  }

  return messageParts.join(' ')
}

export default getCouponMessage
