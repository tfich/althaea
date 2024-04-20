import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import StockXScraper from '../../controllers/scrapers/StockXScraper'
import { ToolCategory, ToolType } from '../../graphql'
import { formatDate, safeFormatMoney } from '../../utils/formatters'

const tool = new Tool({
  id: 'stockx-search',
  name: 'StockX Search',
  description: "Search StockX for a shoe's current market value",
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'stockx',
  free: true,
  featured: true
})

interface Args {
  query: string
}

tool.addCommand<Args>({
  description: "Search StockX for a shoe's current market value",
  args: [
    {
      key: 'query',
      example: 'Jordan 1 Retro High Dior'
    }
  ],
  async exec(_, { query }, { group, client }) {
    const stockx = new StockXScraper(client)

    const search = await stockx.search(query)
    if (!search) {
      return `unable to find results for query \`${query}\`.`
    }

    const retailPrice = search.searchable_traits['Retail Price'] || search.searchable_traits.Retail
    const sizes = await stockx.fetchSizes(search.url)

    const embed = new Embed(group)
      .setTitle(search.name)
      .setURL(`https://stockx.com/${search.url}`)
      .setThumbnail(search.thumbnail_url)
      .addField('Brand', search.brand, true)
      .addField('Color', search.colorway, true)
      .addField('Release Date', formatDate(search.release_date), true)
      .addField('Retail Price', safeFormatMoney(retailPrice), true)
      .addField('Total Sales', safeFormatMoney(search.total_dollars), true)
      .addField('Total Sold', search.deadstock_sold, true)
      .addField('Highest Bid', safeFormatMoney(search.highest_bid), true)
      .addField('Lowest Ask', safeFormatMoney(search.lowest_ask), true)
      .addField('Last Sale', safeFormatMoney(search.last_sale), true)
      .addField('Sales Last 72 Hours', search.sales_last_72, true)
      .addField('Sizes', sizes.length ? sizes.join(', ') : 'n/a')

    return embed
  }
})

export default tool
