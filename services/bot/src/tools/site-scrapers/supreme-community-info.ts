import { TextChannel } from 'discord.js'
import _ from 'lodash'
import Embed from '../../classes/Embed'
import PaginatedMenu from '../../classes/PaginatedMenu'
import Tool from '../../classes/Tool'
import SupremeCommScraper from '../../controllers/scrapers/SupremeCommScraper'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'supreme-community-info',
  name: 'Supreme Community Info',
  description: 'Fetch droplists and sellout times from Supreme Community',
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'supcom'
})

tool.addCommand({
  baseArg: 'droplist',
  description: 'Grab the droplist for the upcoming week',
  args: [],
  async exec(message, __, { group, client }) {
    const supremeComm = new SupremeCommScraper(client)
    const { week, items } = await supremeComm.getDroplist()
    if (!items.length) {
      return `items for ${week.toLowerCase()} have not been loaded yet.`
    }
    const embeds: Embed[] = []
    let totalLen = 1
    for (const itemSplit of _.chunk(items, 10)) {
      const embed = new Embed(group)
        .setTitle(`Supreme Droplist ${week}`)
        .setDescription(itemSplit.map(({ title, price }, i) => `**${totalLen + i}) ${title}** (${price})`).join('\n'))
      embeds.push(embed)
      totalLen += itemSplit.length
    }
    return new PaginatedMenu(message.channel as TextChannel, embeds)
  }
})

tool.addCommand<{ region: 'eu' | 'us' | 'jpn' }>({
  baseArg: 'sellouts',
  description: 'Grab the sellout times for the latest week',
  args: [
    {
      key: 'region',
      finiteOptions: ['eu', 'us', 'jpn']
    }
  ],
  async exec(message, { region }, { group, client }) {
    const supremeComm = new SupremeCommScraper(client)
    const { week, times } = await supremeComm.getSelloutTimes(region)
    if (!times.length) {
      return `times for ${week.toLowerCase()} have not been loaded yet.`
    }
    const embeds: Embed[] = []
    let totalLen = 1
    for (const timeSplit of _.chunk(times, 10)) {
      const embed = new Embed(group)
        .setTitle(`Supreme Sellout Times ${week}`)
        .setDescription(timeSplit.map(({ name, time }, i) => `**${totalLen + i}) ${name}** (${time})`).join('\n'))
      embeds.push(embed)
      totalLen += timeSplit.length
    }
    return new PaginatedMenu(message.channel as TextChannel, embeds)
  }
})

export default tool
