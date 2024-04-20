import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'group-resources',
  name: 'Group Resources',
  description: "Manage an easily accessible list of your Group's resources",
  category: ToolCategory.Productivity,
  type: ToolType.Command,
  commandTrigger: 'resources'
})

tool.addCommand({
  description: 'Returns a list of resources available to members',
  args: [],
  async exec(message, _, { group }) {
    if (!group.resources.length) {
      return 'your group does not have any resources set.'
    }

    const embed = new Embed(group)
      .setTitle(message.guild?.name)
      .addColumnField(
        'Group Resources',
        group.resources.map(({ title, link }) => link.toHyperlink(title))
      )
      .setThumbnail(message.guild?.iconURL()!)

    return embed
  }
})

export default tool
