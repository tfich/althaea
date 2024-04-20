import { TextChannel } from 'discord.js'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'rename-channel',
  name: 'Rename Channel',
  description: 'Quickly rename a text channel',
  category: ToolCategory.Management,
  type: ToolType.Command,
  commandTrigger: 'rename'
})

interface Args {
  name: string
}

tool.addCommand<Args>({
  description: 'Renames the current channel',
  args: [
    {
      key: 'name',
      example: 'announcements',
      transformer: (value) => value.replace(' ', '-')
    }
  ],
  async exec({ channel }, { name }) {
    const originalName = (channel as TextChannel).name
    await (channel as TextChannel).edit({ name })
    return `channel renamed from \`${originalName}\` to \`${name}\`!`
  }
})

export default tool
