import { stripIndent } from 'common-tags'
import { TextChannel } from 'discord.js'
import _ from 'lodash'
import Embed from '../../classes/Embed'
import PaginatedMenu from '../../classes/PaginatedMenu'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import getAllTools from '../../utils/getAllTools'

const ALL_TOOLS = getAllTools()

const tool = new Tool({
  id: 'command-help-menu',
  name: 'Command Help Menu',
  description: 'Creates a paginated command menu with descriptions and examples',
  category: ToolCategory.Miscalleneous,
  type: ToolType.Command,
  commandTrigger: 'help',
  default: true,
  free: true
})

tool.addCommand({
  description: 'The command menu that you are currently viewing',
  args: [],
  async exec(message, __, { group }) {
    const enabledToolIDs = group.toolConfigs.map(({ toolID }) => toolID)

    const tools = ALL_TOOLS.filter(({ options: { id } }) => enabledToolIDs.includes(id)).sort((a, b) =>
      a.options.name > b.options.name ? 1 : -1
    )

    const embeds: Embed[] = []
    for (const toolSplit of _.chunk(tools, 5)) {
      const embed = new Embed(group)
        .setTitle('Help Menu')
        .setDescription(
          `All commands below must be prefixed with \`${group.commandPrefix}\`. Arguments are surrounded with \`<>\`.`
        )
      toolSplit.forEach(({ commands, options: { description, commandTrigger } }) => {
        commands.forEach(({ args, baseArg: subCommand }) => {
          const base = `${group.commandPrefix}${commandTrigger} ${subCommand || ''} `.trim()
          const exampleStr = args.map(({ example, finiteOptions }) => example || finiteOptions?.join('|')).join(' ')
          embed.addField(
            name,
            stripIndent`
              ${description}
              \`${base} ${args.map(({ key }) => `<${key}>`).join(' ')}\`
              example: \`${base} ${exampleStr}\`
            `
          )
          embeds.push(embed)
        })
      })
    }

    return new PaginatedMenu(message.channel as TextChannel, embeds)
  }
})

export default tool
