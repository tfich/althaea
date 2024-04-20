import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: '',
  name: '',
  description: '',
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: ''
})

const timezones = [
  {
    name: 'Australia Eastern Standard Time',
    zone: 'Australia/Brisbane',
    flag: ''
  },
  {
    name: 'Alaska Standard Time',
    zone: 'America/Anchorage',
    flag: ''
  },
  {
    name: 'Atlantic Standard Time',
    zone: 'America/Anchorage',
    flag: ''
  }
]

tool.addCommand({
  description: '',
  args: [],
  async exec(_, __, { group }) {
    const embed = new Embed(group).setTitle('Common Timezones Date and Time')

    timezones.forEach(({ name, zone, flag }) => {
      embed.addField(name, zone, true)
    })

    return embed
  }
})

export default tool
