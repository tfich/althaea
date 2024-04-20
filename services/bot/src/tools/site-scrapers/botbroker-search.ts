import { stripIndent } from 'common-tags'
import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import BotBrokerScraper from '../../controllers/scrapers/BotBrokerScraper'
import { ToolCategory, ToolType } from '../../graphql'
import { capitalizeFirstLetters } from '../../utils/conventions'
import { formatMoney } from '../../utils/formatters'

const tool = new Tool({
  id: 'botbroker-search',
  name: 'BotBroker Search',
  description: 'Search BotBroker for current market values',
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'botbroker',
  free: true,
  featured: true
})

interface Args {
  query: string
}

tool.addCommand<Args>({
  description: 'Search BotBroker for current market values',
  args: [
    {
      key: 'query',
      example: 'Cybersole'
    }
  ],
  async exec(message, { query }, { group, client }) {
    const botBroker = new BotBrokerScraper(client)

    const search = await botBroker.search(query)
    if (!search) {
      return `unable to find results for query \`${query}\`.`
    }

    const categories = search.category.split(',').map(capitalizeFirstLetters)

    /* eslint-disable indent */
    const embed = new Embed(group)
      .setTitle(search.name)
      .setURL(`https://botbroker.io/bots/${search.name.toLowerCase().replace(' ', '-')}`)
      .setThumbnail(search.image)
      .addField(categories.length > 1 ? 'Categories' : 'Category', categories.join(' | '), true)
      .addField('Twitter', `[@${search.twitter}](https://twitter.com/${search.twitter})`, true)
      .addBlankField(true)
      .addField(
        'Highest Bid',
        stripIndent`
          ${
            search.highest_active_bid > 0
              ? `${formatMoney(search.highest_active_bid)} (${capitalizeFirstLetters(search.highest_active_bid_type)})`
              : 'N/A'
          }
          Seller's Fee: ${formatMoney(search.highest_active_bid * 0.07)}
          Buyer's Fee: ${formatMoney(search.highest_active_bid * 0.06)}
        `,
        true
      )
      .addField(
        'Lowest Ask',
        stripIndent`
          ${
            search.lowest_active_ask > 0
              ? `${formatMoney(search.lowest_active_ask)} (${capitalizeFirstLetters(search.lowest_active_ask_type)})`
              : 'N/A'
          }
          Seller's Fee: ${formatMoney(search.lowest_active_ask * 0.07)}
          Buyer's Fee: ${formatMoney(search.lowest_active_ask * 0.06)}
        `,
        true
      )

    return embed
  }
})

export default tool
