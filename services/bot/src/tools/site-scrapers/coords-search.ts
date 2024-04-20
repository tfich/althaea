import { stripIndent } from 'common-tags'
import Tool from '../../classes/Tool'
import GoogleMapsScraper from '../../controllers/scrapers/GoogleMapsScraper'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'coords-search',
  name: 'Coordinate Search',
  description: 'Retrieve GPS coordinates for a specific location',
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'coords'
})

interface Args {
  location: string
}

tool.addCommand<Args>({
  description: 'Retrieve GPS coordinates for a specific location',
  args: [
    {
      key: 'location',
      example: 'NYC'
    }
  ],
  async exec(_, { location }, { client }) {
    const googleMaps = new GoogleMapsScraper(client)
    const coords = await googleMaps.getCoords(location)
    if (!coords) {
      return `Unable to find coordinates for \`${location}\`.`
    }
    const coordStr = Object.values(coords).join(',')
    return stripIndent`
      the coordinates for this location are \`${coordStr}\`.
      https://maps.google.com/maps?q=${coordStr.replace(/\s+/g, '')}
    `
  }
})

export default tool
