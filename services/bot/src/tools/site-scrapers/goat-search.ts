import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import GoatScraper from '../../controllers/scrapers/GoatScraper'
import { ToolCategory, ToolType } from '../../graphql'
import { capitalizeFirstLetters } from '../../utils/conventions'
import { formatDate, formatMoney } from '../../utils/formatters'

const tool = new Tool({
  id: 'goat-search',
  name: 'GOAT Search',
  description: "Search GOAT for a shoe's current market value",
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'goat',
  free: true
})

interface Args {
  query: string
}

tool.addCommand<Args>({
  description: "Search GOAT for a shoe's current market value",
  args: [
    {
      key: 'query',
      example: 'Jordan 1 Retro High Dior'
    }
  ],
  async exec(message, { query }, { group, client }) {
    const goat = new GoatScraper(client)

    const search = await goat.search(query)
    if (!search) {
      return `unable to find results for query \`${query}\`.`
    }

    const embed = new Embed(group)
      .setTitle(search.name)
      .setURL(`https://goat.com/sneakers/${search.slug}`)
      .setThumbnail(search.main_picture_url)
      .addField('Brand', capitalizeFirstLetters(search.brand_name), true)
      .addField('Color', search.color, true)
      .addField('Release Date', formatDate(search.release_date), true)
      .addField('Want Count', search.want_count, true)
      .addField('Highest Offer', formatMoney(search.maximum_offer_cents / 100), true)
      .addField('Lowest Offer', formatMoney(search.minimum_offer_cents / 100), true)
      .addField('New Lowest Offer', formatMoney(search.new_lowest_price_cents / 100), true)
      .addField('Used Lowest Offer', formatMoney(search.used_lowest_price_cents / 100), true)
      .addField('Sizes', search.available_sizes ? search.available_sizes.join(', ') : 'n/a')

    return embed
  }
})

export default tool
