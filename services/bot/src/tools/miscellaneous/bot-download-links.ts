import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { botDownloadLinks } from '../../utils/constants/botDownloadLinks'

const tool = new Tool({
  id: 'bot-download-links',
  name: 'Bot Download Links',
  description: 'Retrieve a list of popular sneaker bot download links',
  category: ToolCategory.Miscalleneous,
  type: ToolType.Command,
  commandTrigger: 'downloads'
})

tool.addCommand({
  description: 'Retrieve a list of popular sneaker bot download links',
  args: [],
  async exec(message, _, { group }) {
    const embed = new Embed(group).setTitle('Bot Downloads')
    let currentField = ''
    Object.keys(botDownloadLinks).forEach((name) => {
      if (currentField.length > 500) {
        embed.addField('\u200b', currentField, true)
        currentField = `[${name}](${botDownloadLinks[name]})\n`
      } else {
        currentField += `[${name}](${botDownloadLinks[name]})\n`
      }
    })
    embed.addField('\u200b', currentField, true)
    return embed
  }
})

export default tool
