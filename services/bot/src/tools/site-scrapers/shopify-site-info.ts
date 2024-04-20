import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import ShopifyScraper from '../../controllers/scrapers/ShopifyScraper'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'shopify-site-info',
  name: 'Shopify Site Info',
  description: 'Grab hidden information about a Shopify site',
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'shopify-site'
})

interface Args {
  siteUrl: string
}

tool.addCommand<Args>({
  description: 'Grab hidden information about a Shopify site',
  args: [
    {
      key: 'siteUrl',
      example: 'https://kith.com',
      validator: (value) => value.startsWith('http'),
      transformer: (value) => {
        value = value.split('?')[0]
        return value.endsWith('/') ? value.slice(0, -1) : value
      }
    }
  ],
  async exec(_, { siteUrl }, { group, client }) {
    const shopify = new ShopifyScraper(client)

    const site = await shopify.getSiteInfo(siteUrl)
    if (!site) {
      return `unable to fetch site info for \`${siteUrl}\`.`
    }

    const isPasswordProtected = await shopify.isPasswordProtected(siteUrl)

    const embed = new Embed(group)
      .setTitle(site.name)
      .setThumbnail(`https://s2.googleusercontent.com/s2/favicons?sz=64&domain_url=${siteUrl}`)
      .setURL(siteUrl)
      .setDescription(site.description)
      .addField('Origin', `${site.province}, ${site.country}`, true)
      .addField('Products', site.published_products_count, true)
      .addField('Collections', site.published_collections_count, true)
      .addField('Password Up', isPasswordProtected, true)
      .addField('Currency', site.currency, true)
      .addField('MyShopify Domain', site.myshopify_domain, true)
      .addField(`Ship to Countries (${site.ships_to_countries.length})`, site.ships_to_countries.join(', '))

    return embed
  }
})

export default tool
