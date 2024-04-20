import moment from 'moment-timezone'

const safeCall = (func: (t: any) => string, value: any): string => (value ? func(value) : 'Could not find!')

export const formatMoney = (amount: number | string): string => {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  if (amount % 1 !== 0) {
    return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatDate = (date: Date): string => moment(date).format('MMMM DD, YYYY')

export const safeFormatMoney = safeCall.bind(null, formatMoney)
