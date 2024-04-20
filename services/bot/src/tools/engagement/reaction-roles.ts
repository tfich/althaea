import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { isEmbedTitle } from '../../utils/discord/general'

const tool = new Tool({
  id: 'reaction-roles',
  name: 'Reaction Roles',
  description: "Allow member's to self-manage roles using reactions",
  category: ToolCategory.Engagement,
  type: ToolType.Command,
  commandTrigger: 'roles',
  free: true
})

tool.addCommand({
  description: 'Creates a reaction role embed in the current channel',
  args: [],
  async exec(message, _, { group }) {
    if (!group.reactionRoles.length) {
      return 'please configure your roles on the dashboard.'
    }

    const embed = new Embed(group)
      .setTitle('Reaction Role Menu')
      .setDescription('React with the following to add a specific role. Remove reaction to remove a specific role.')

    group.reactionRoles.forEach(({ emoji, roleID }) => embed.addField(emoji, `<@&${roleID}>`))

    const embedMsg = await message.channel.send(embed)

    await Promise.all([group.reactionRoles.map(({ emoji, roleID }) => embedMsg.react(emoji))])

    return embedMsg
  }
})

tool.addListener('messageReactionAdd', async ([reaction, user], group) => {
  if (!isEmbedTitle(reaction.message, 'Reaction Role Menu') || user.bot) {
    return
  }
  const reactionRole = group.reactionRoles.filter(({ emoji }) => emoji === reaction.emoji.name)[0]
  if (!reactionRole) {
    return
  }
  const member = reaction.message.guild?.members.cache.get(user.id)
  if (member) {
    await member.roles.add(reactionRole.roleID)
  }
})

tool.addListener('messageReactionRemove', async ([reaction, user], group) => {
  if (!isEmbedTitle(reaction.message, 'Reaction Role Menu') || user.bot) {
    return
  }
  const reactionRole = group.reactionRoles.filter(({ emoji }) => emoji === reaction.emoji.name)[0]
  if (!reactionRole) {
    return
  }
  const member = reaction.message.guild?.members.cache.get(user.id)
  if (member) {
    await member.roles.remove(reactionRole.roleID)
  }
})

export default tool
