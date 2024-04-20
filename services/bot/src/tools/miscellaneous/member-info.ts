import moment from 'moment-timezone'
import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { capitalizeFirstLetters } from '../../utils/conventions'

const tool = new Tool({
  id: 'member-info',
  name: 'Member Info',
  description: 'Grab basic info about a specified member',
  category: ToolCategory.Miscalleneous,
  type: ToolType.Command,
  commandTrigger: 'member',
  free: true
})

tool.addCommand({
  description: 'Returns basic info about a specified member',
  args: [],
  async exec({ member }, _, { group, client }) {
    const embed = new Embed(group)
      .setTitle('Member Info')
      .setThumbnail(member?.user.avatarURL() || '')
      .addField('User', `${member?.user.tag} ${member?.nickname ? `(${member?.nickname})` : ''}`, true)
      .addField('Member Since', moment(member?.joinedAt).format('ll'), true)
      .addField('Member Status', capitalizeFirstLetters(member?.user.presence.status!), true)
      .addField(`Roles (${member?.roles.cache.size})`, member?.roles.cache.map((r) => r.toString()).join(' '))

    return embed
  }
})

export default tool
