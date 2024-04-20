import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import platformFees from '../../utils/constants/platformFees'
import { formatMoney } from '../../utils/formatters'

const tool = new Tool({
  id: 'marketplace-fee-calculator',
  name: 'Marketplace Fee Calculator',
  description: 'Calculate marketplace sale fees across popular platforms',
  category: ToolCategory.Calculators,
  type: ToolType.Command,
  commandTrigger: 'fee'
})

interface Args {
  amount: number
}

tool.addCommand<Args>({
  description: 'Calculate marketplace sale fees across popular platforms',
  args: [
    {
      key: 'amount',
      example: '1500',
      type: 'number'
    }
  ],
  async exec(message, { amount }, { group }) {
    const embed = new Embed(group).setTitle('Fee Calculator')
    Object.entries(platformFees).forEach(([platform, fee]) => {
      let conversion: number = amount
      fee.percents.forEach((x: number) => {
        conversion -= amount * (x / 100)
      })
      fee.flatFees.forEach((x: number) => {
        conversion -= x
      })
      embed.addField(platform, formatMoney(conversion), true)
    })
    return embed
  }
})

export default tool
