import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'ebay-views-generator',
  name: 'eBay Views Generator',
  description: 'Add views to your eBay listing to promote traffic',
  category: ToolCategory.Generators,
  type: ToolType.Command,
  commandTrigger: 'views'
})

interface Args {
  link: string
}

tool.addCommand<Args>({
  description: 'Add views to your eBay listing using a link',
  args: [
    {
      key: 'link',
      example: 'https://www.ebay.com/xxxxxxxx'
    }
  ],
  async exec(message, args) {
    return `${10} views are being added to your listing. We'll DM you once they've been applied.`
  }
})

export default tool
