import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import shoeSizes from '../../utils/constants/shoeSizes'

const tool = new Tool({
  id: 'shoe-size-conversions',
  name: 'Shoe Size Conversions',
  description: 'Compare shoe size conversions between locales',
  category: ToolCategory.Miscalleneous,
  type: ToolType.Command,
  commandTrigger: 'sizes'
})

tool.addCommand({
  description: 'Returns shoe size conversions between locales',
  args: [],
  async exec(_, __, { group }) {
    const colLen = 10
    const rows: string[] = [
      `${'US'.padEnd(colLen)}${'UK'.padEnd(colLen)}${'EU'.padEnd(colLen)}`,
      ''.padEnd(colLen * 3, '-')
    ]
    shoeSizes.forEach(({ US, UK, EU }) => {
      rows.push([US.toString().padEnd(colLen), UK.toString().padEnd(colLen), EU.toString().padEnd(colLen)].join(''))
    })
    const embed = new Embed(group).setTitle('Shoe Size Conversions').setDescription(rows.join('\n').toCodeBlock())
    return embed
  }
})

export default tool
