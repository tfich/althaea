import { TextChannel } from 'discord.js'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'close-ticket',
  name: 'Close Ticket',
  description: 'Manually close an open ticket',
  category: ToolCategory.Tickets,
  type: ToolType.Command,
  commandTrigger: 'close',
  free: true
})

tool.addCommand({
  description: 'Manually close an open ticket',
  args: [],
  async exec(message) {
    const ticketChannel = message.channel as TextChannel
    if (!ticketChannel.topic?.includes('ticket')) {
      return 'This channel is not a ticket!'
    }

    return 'this message will close in 10 seconds. To cancel, type something!'

    try {
      await ticketChannel.awaitMessages(({ author }) => !author.bot, {
        max: 1,
        time: 10 * 1000,
        errors: ['time']
      })
      await ticketChannel.send('Ticket not closed!')
    } catch {
      // const messageFetch = await channel.messages.fetch({ limit: 100 })
      // const transcriptFile = Buffer.from(
      //   messageFetch
      //     .map(({ author, content }) => `${author.username}: ${content}`)
      //     .reverse()
      //     .join('\n')
      // )
      // TODO: send this to a log channel
      // TODO: add fields for created at / how long it took to resolve ticket
      // const transcriptEmbed = new Embed(group).setTitle('Ticket Transcript')
      // await channel.send({
      //   files: [
      //     {
      //       attachment: transcriptFile,
      //       name: `${channel.name}.txt`
      //     }
      //   ],
      //   embed: transcriptEmbed
      // })
      await ticketChannel.delete()
    }

    return undefined
  }
})

export default tool
