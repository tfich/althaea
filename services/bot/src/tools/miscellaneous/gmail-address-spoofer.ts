import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'gmail-address-spoofer',
  name: 'Gmail Address Spoofer',
  description: 'Generate alternative Gmail addresses using the dot trick',
  category: ToolCategory.Miscalleneous,
  type: ToolType.Command,
  commandTrigger: 'gmail'
})

interface Args {
  gmail: string
}

tool.addCommand<Args>({
  description: 'Generate alternative Gmail addresses using the dot trick',
  args: [
    {
      key: 'gmail',
      example: 'johndoe@gmail.com',
      validator: (value) => value.endsWith('@gmail.com')
    }
  ],
  async exec(message, { gmail }, { group }) {
    const alternatives: string[] = []
    const prefixChars = gmail.split('@')[0].split('')
    for (let i = 0; i < 10; i++) {
      alternatives.push(prefixChars.map((c) => c + (Math.round(Math.random()) ? '.' : '')).join(''))
    }
    const embed = new Embed(group).setTitle('Gmail Dot Trick').setDescription(alternatives.join('\n').toCodeBlock())
    return embed
  }
})

export default tool
