import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import ShopifyScraper from '../../controllers/scrapers/ShopifyScraper'
import { ToolCategory, ToolType } from '../../graphql'
import { formatMoney } from '../../utils/formatters'

const tool = new Tool({
  id: 'shopify-variants-fetcher',
  name: 'Shopify Variants Fetcher',
  description: 'Grab the variants and add-to-cart links of a Shopify product',
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'shopify-variants'
})

interface Args {
  productUrl: string
}

tool.addCommand<Args>({
  description: 'Grab the variants and add-to-cart links of a Shopify product',
  args: [
    {
      key: 'productUrl',
      example: 'https://kith.com/products/jordan-1',
      validator: (value) => value.startsWith('http') && value.includes('/products/'),
      transformer: (value) => value.split('?')[0]
    }
  ],
  async exec(message, { productUrl }, { group, client }) {
    const shopify = new ShopifyScraper(client)

    const product = await shopify.getProductInfo(productUrl)
    if (!product) {
      return `unable to fetch product info for \`${productUrl}\`.`
    }

    const domain = productUrl.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/)![0]

    const variantStrs = product.variants.map(({ id, title, available }) => {
      const link = `${domain}/card/${id}:1`.toHyperlink(title)
      if (available) {
        return `${link} (${id})`
      }
      return `~~${link}~~ (${id})`
    })

    const embed = new Embed(group)
      .setTitle(product.title)
      .setThumbnail(product.featured_image ? `https:${product.featured_image}` : '')
      .setURL(`${domain}/products/${product.handle}`)
      .addField('Price', product.price ? formatMoney(product.price / 100) : 'n/a', true)
      .addField('Available', product.available, true)
      .addField('Store', domain, true)
      .addColumnField('Variants', variantStrs)

    return embed
  }
})

export default tool
