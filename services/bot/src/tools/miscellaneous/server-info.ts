import moment from 'moment-timezone'
import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import regionsEmojis from '../../utils/constants/regionEmojis'

const tool = new Tool({
  id: 'server-info',
  name: 'Server Info',
  description: 'Grab basic info about your server',
  category: ToolCategory.Miscalleneous,
  type: ToolType.Command,
  commandTrigger: 'server',
  free: true
})

tool.addCommand({
  description: 'Returns basic info about this server',
  args: [],
  async exec({ guild }, _, { group }) {
    const textChannels = guild?.channels.cache.filter(({ type }) => type === 'text').size
    const voiceChannels = guild?.channels.cache.filter(({ type }) => type === 'voice').size
    const categories = guild?.channels.cache.filter(({ type }) => type === 'category').size

    const humans = guild?.members.cache.filter(({ user }) => !user.bot).size
    const bots = guild?.members.cache.filter(({ user }) => user.bot).size

    const embed = new Embed(group)
      .setTitle('Server Info')
      .setThumbnail(guild?.iconURL() || '')
      .addField('Text Channels', textChannels, true)
      .addField('Voice Channels', voiceChannels, true)
      .addField('Categories', categories, true)
      .addField('Humans', humans, true)
      .addField('Bots', bots, true)
      .addField('Roles', guild?.roles.cache.size, true)
      .addField('Region', `${guild?.region} :${regionsEmojis[guild?.region!]}:`, true)
      .addField('Owner', guild?.owner?.user.tag, true)
      .addField('Created At', moment(guild?.createdAt).format('ll'), true)

    return embed
  }
})

export default tool
