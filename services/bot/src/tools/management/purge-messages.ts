import { TextChannel } from 'discord.js'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'purge-messages',
  name: 'Purge Messages',
  description: 'Delete a large number of channel messages at once',
  category: ToolCategory.Management,
  type: ToolType.Command,
  commandTrigger: 'purge'
})

interface Args {
  count: number
}

tool.addCommand<Args>({
  description: 'Delete a specified number of messages from the current channel',
  args: [
    {
      key: 'count',
      example: '100',
      type: 'number'
    }
  ],
  async exec({ channel }, { count }) {
    try {
      await (channel as TextChannel).bulkDelete(count)
    } catch (err) {
      if (err.message && err.message.includes('You can only bulk delete')) {
        return 'I can only delete messages posted in the past 14 days.'
      }
      throw err
    }
    return undefined
  }
})

export default tool
