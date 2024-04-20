import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import FlightClubScrapper from '../../controllers/scrapers/FlightClubScraper'
import { ToolCategory, ToolType } from '../../graphql'
import { capitalizeFirstLetters } from '../../utils/conventions'
import { formatMoney } from '../../utils/formatters'

const tool = new Tool({
  id: 'flight-club-search',
  name: 'Flight Club Search',
  description: "Search Flight Club for a shoe's current market value",
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'flightclub',
  free: true
})

interface Args {
  query: string
}

tool.addCommand<Args>({
  description: "Search Flight Club for a shoe's current market value",
  args: [
    {
      key: 'query',
      example: 'Jordan 1 Retro High Dior'
    }
  ],
  async exec(message, { query }, { group, client }) {
    const flightClub = new FlightClubScrapper(client)

    const search = await flightClub.search(query)
    if (!search) {
      return `unable to find results for query \`${query}\`.`
    }

    const embed = new Embed(group)
      .setTitle(search.name)
      .setURL(search.url)
      .setThumbnail(search.image_url.replace('//www', 'https://www'))
      .addField('Brand', capitalizeFirstLetters(search.brand), true)
      .addField('Style', capitalizeFirstLetters(search.style), true)
      .addField('Listed Price', formatMoney(search.price.USD.default), true)
      .addField('In Stock', search.in_stock === 1, true)
      .addField('Sizes', search.sizegroup_men ? search.sizegroup_men.sort().join(', ') : 'n/a')

    return embed
  }
})

export default tool
