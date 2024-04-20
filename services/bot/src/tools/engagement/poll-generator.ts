import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'poll-generator',
  name: 'Poll Generator',
  description: 'Create an engaging poll within a channel',
  category: ToolCategory.Engagement,
  type: ToolType.Command,
  commandTrigger: 'poll'
})

interface Args {
  question: string
}

tool.addCommand<Args>({
  description: 'Create an engaging poll within a channel',
  args: [
    {
      key: 'question',
      example: 'Are you ready for the release?'
    }
  ],
  async exec(message, args, { group }) {
    const embed = new Embed(group).setTitle(args.question).setFooter(`Poll from ${message.author.tag}`)
    const msg = await message.channel.send(embed)
    ;['👍', '👎', '🤷'].forEach(async (emoji) => {
      await msg.react(emoji)
    })
    return msg
  }
})

export default tool
