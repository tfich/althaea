import { stripIndents } from 'common-tags'
import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { createTextChannel, findOrCreateCategory } from '../../utils/discord/channel'

const tool = new Tool({
  id: 'meeting-rooms',
  name: 'Meeting Rooms',
  description: 'Manage your staff with dedicated meeting rooms',
  category: ToolCategory.Productivity,
  type: ToolType.Command,
  commandTrigger: 'meeting'
})

interface Args {
  name: string
}

tool.addCommand<Args>({
  description: 'Create a meeting room channel',
  args: [
    {
      key: 'name',
      example: 'name',
      transformer: (value) => value.replace(' ', '-')
    }
  ],
  async exec(message, { name }, { group }) {
    const category = await findOrCreateCategory(message.guild, 'meetings')
    const meetingChannel = await createTextChannel(
      message.guild,
      name,
      category,
      `Meeting room created by ${message.author.tag}.`
    )

    const meetingEmbed = new Embed(group).setTitle('Meeting Room').setDescription(stripIndents`
      Welcome! This meeting room was created by \`${message.author.tag}\`.
      You can add more people to this meeting using \`${group.commandPrefix}add\`.
    `)

    await meetingChannel.send(meetingEmbed)

    return `your meeting was created in ${meetingChannel.toString()}.`
  }
})

export default tool
