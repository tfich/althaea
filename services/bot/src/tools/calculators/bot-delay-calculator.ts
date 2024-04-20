import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'bot-delay-calculator',
  name: 'Bot Delay Calculator',
  description: 'Calculates a recommended bot delay based on number of tasks and proxies',
  category: ToolCategory.Calculators,
  type: ToolType.Command,
  commandTrigger: 'delay'
})

interface Args {
  tasks: number
  proxies: number
}

tool.addCommand<Args>({
  description: 'Calculates a recommended bot delay based on number of tasks and proxies',
  args: [
    {
      key: 'tasks',
      example: '30',
      type: 'number'
    },
    {
      key: 'proxies',
      example: '40',
      type: 'number'
    }
  ],
  async exec(_, { tasks, proxies }) {
    const delay = Math.ceil((3500 * tasks) / proxies)
    return `with \`${tasks}\` tasks and \`${proxies}\` proxies, you should use a **${delay} ms** delay`
  }
})

export default tool
