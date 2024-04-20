import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import PopGrailHuntersScraper from '../../controllers/scrapers/PopGrailHuntersScraper'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'pop-figure-search',
  name: 'Pop Figure Search',
  description: 'Search for the current market value of any Pop figure',
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'pop'
})

interface Args {
  query: string
}

tool.addCommand<Args>({
  description: 'Search for the current market value of any Pop figure',
  args: [
    {
      key: 'query',
      example: 'Star Wars'
    }
  ],
  async exec(message, { query }, { group, client }) {
    const popGrailHunters = new PopGrailHuntersScraper(client)

    const search = await popGrailHunters.search(query)
    if (!search) {
      return `unable to find results for query \`${query}\`.`
    }

    const embed = new Embed(group)
      .setTitle(search.name)
      .setThumbnail(search.image_uri)
      .setURL(search.uri)
      .addField('Value', search.value !== 'N/D' ? search.value : 'n/a', true)
      .addField('Exclusivity', search.exclusivity || 'n/a', true)
      .addField('Edition Size', search.edition_size || 'n/a', true)
      .addField('HDBID', search.hdbid, true)
      .addField('Produced', search.released, true)
      .addField('Depicts', `https://www.hobbydb.com${search.depicts}`.toHyperlink('Link'), true)

    return embed
  }
})

export default tool
