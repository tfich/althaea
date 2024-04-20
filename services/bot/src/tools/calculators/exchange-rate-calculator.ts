import rp from 'request-promise'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'exchange-rate-calculator',
  name: 'Exchange Rate Calculator',
  description: 'Convert a specified amount from one currency to another',
  category: ToolCategory.Calculators,
  type: ToolType.Command,
  commandTrigger: 'exchange'
})

interface Args {
  amount: number
  from: string
  to: string
}

tool.addCommand<Args>({
  description: 'Convert a specified amount from one currency to another',
  args: [
    {
      key: 'amount',
      example: '1500',
      type: 'number'
    },
    {
      key: 'from',
      example: 'USD',
      transformer: (value) => value.toUpperCase()
    },
    {
      key: 'to',
      example: 'EUR',
      transformer: (value) => value.toUpperCase()
    }
  ],
  async exec(_, { amount, from, to }) {
    const res = await rp({
      url: 'https://api.exchangeratesapi.io/latest',
      json: true,
      qs: { symbols: to, base: from }
    })
    const exchangeRate = res.rates[to]
    return `\`${amount} ${from}\` is equivalent to **${(amount * exchangeRate).toFixed(2)} ${to}**.`
  }
})

export default tool
