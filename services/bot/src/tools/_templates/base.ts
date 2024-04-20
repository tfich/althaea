import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'pxpppxxpxpxpxpxpxppxpxxppxxpp',
  name: '',
  description: '',
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: ''
})

interface Args {}

tool.addCommand<Args>({
  description: '',
  args: [
    {
      key: 'key',
      example: 'example'
    }
  ],
  async exec(message, args, { group, client, member }) {
    const embed = new Embed(group)

    return embed
  }
})

tool.addListener('messageReactionAdd', async ([reaction], group) => {
  //
})

export default tool
