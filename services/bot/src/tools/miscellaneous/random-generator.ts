import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'random-generator',
  name: 'Random Generator',
  description: 'Generate random responses for a variety of things',
  category: ToolCategory.Miscalleneous,
  type: ToolType.Command,
  commandTrigger: 'random'
})

tool.addCommand({
  baseArg: 'member',
  description: 'Returns a random member in this server',
  args: [],
  async exec(message) {
    return `your random member is ${message.guild?.members?.cache.random()}!`
  }
})

export default tool
