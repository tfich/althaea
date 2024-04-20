import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import CrtSubdomainScraper from '../../controllers/scrapers/CrtSubdomainScraper'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'subdomain-lookup',
  name: 'Subdomain Lookup',
  description: 'Find all the subdomains under a host',
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'subdomain'
})

interface Args {
  host: string
}

tool.addCommand<Args>({
  description: 'Find all the subdomains under a host',
  args: [
    {
      key: 'host',
      example: 'tesla.com'
    }
  ],
  async exec(_, { host }, { group, client }) {
    const crtSubdomain = new CrtSubdomainScraper(client)

    const subdomains = await crtSubdomain.getSubdomains(host)
    if (!subdomains.length) {
      return `unable to fetch subdomains for \`${host}\`.`
    }

    const embed = new Embed(group)
      .setTitle('Subdomain Finder')
      .addField('Base Host', host)
      .addColumnField('Subdomains', subdomains)

    return embed
  }
})

export default tool
