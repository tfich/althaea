import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import SupremeScraper from '../../controllers/scrapers/SupremeScraper'
import { ToolCategory, ToolType } from '../../graphql'
import { formatMoney } from '../../utils/formatters'

const tool = new Tool({
  id: 'supreme-product-info',
  name: 'Supreme Product Info',
  description: "Quickly grab info about a product currently on Supreme's online shop",
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'supreme'
})

interface Args {
  query: string
}

tool.addCommand<Args>({
  description: "Grab info about a product currently on Supreme's online shop",
  args: [
    {
      key: 'query',
      example: 'Olive Backpack'
    }
  ],
  async exec(_, { query }, { group, client }) {
    const supreme = new SupremeScraper(client)

    const search = await supreme.search(query)
    if (!search) {
      return `unable to find results for query \`${query}\`.`
    }

    const product = await supreme.getProductInfo(query, search.matchedProduct.id)

    const embed = new Embed(group)
      .setTitle(`${search.matchedProduct.name} - ${product.matchedStyle.name}`)
      .setDescription(`${search.releaseWeek} • ${search.releaseDate}`)
      .setThumbnail(`https:${product.matchedStyle.mobile_zoomed_url_hi}`)
      .addField('Price', formatMoney(search.matchedProduct.price / 100), true)
      .addField('Purchase Limit', product.purchasableQty, true)
      .addField('Canada Blocked', product.canadaBlocked, true)
      .addField('Description', product.description.cleanTuncate())
      .addField(
        'Sizes',
        product.matchedStyle.sizes
          .map(
            ({ name, stock_level }) => `${name === 'N/A' ? 'One Size' : name} (${!stock_level ? 'OOS' : 'In Stock'})`
          )
          .join('\n'),
        true
      )
      .addField('Additional Styles', product.additionalStyles.map(({ name }) => name).join('\n'), true)

    return embed
  }
})

export default tool
