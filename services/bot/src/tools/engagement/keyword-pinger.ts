import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { createStringFromMessage } from '../../utils/discord/general'
import matchesKeywordSet from '../../utils/matchesKeywordSet'

const tool = new Tool({
  id: 'keyword-pinger',
  name: 'Keyword Pinger',
  description: 'Ping roles when a new message matches configured keywords',
  category: ToolCategory.Engagement,
  type: ToolType.Module,
  featured: true
})

tool.addListener('message', async ([message], group) => {
  if (message.author.id === message.client.user?.id) {
    return
  }
  const validConfigs = group.keywordPingerEntries.filter(({ channels }) => channels.includes(message.channel.id))
  for (const { keywordSet, pingRoles } of validConfigs) {
    const str = createStringFromMessage(message)
    if (matchesKeywordSet(str, keywordSet)) {
      message.channel.send(`${pingRoles.map((role) => `<@&${role}>`).join(', ')} Keyword Match: \`${keywordSet}\``)
    }
  }
})

export default tool
