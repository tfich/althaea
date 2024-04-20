import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'welcome-direct-message',
  name: 'Welcome Direct Message',
  description: 'Send a welcoming direct message to members when they join your server',
  category: ToolCategory.Engagement,
  type: ToolType.Module
})

tool.addListener('guildMemberAdd', async ([member], group) => {
  // TODO: add group.welcomeDMMessage when api is done
  const dmEmbed = new Embed(group).setTitle(`Welcome message from ${member.guild.name}`).setDescription('TODO')
  await member.send(dmEmbed)
})

export default tool
