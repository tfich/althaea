import { oneLine } from 'common-tags'
import { Role } from 'discord.js'
import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { pluralize } from '../../utils/conventions'

const tool = new Tool({
  id: 'mass-direct-messages',
  name: 'Mass Direct Messages',
  description: 'Send a mass direct message to a specified role in your server',
  category: ToolCategory.Engagement,
  type: ToolType.Command,
  commandTrigger: 'dm'
})

interface Args {
  role: Role
  message: string
}

tool.addCommand<Args>({
  description: 'Send a mass direct message to a specified role in your server',
  args: [
    {
      key: 'role',
      example: '@members',
      type: 'role'
    },
    {
      key: 'message',
      example: 'Check the announcements channel in our server!'
    }
  ],
  async exec(message, { role, message: dmMessage }, { group }) {
    const dmEmbed = new Embed(group).setTitle(`Message from ${message.guild?.name}`).setDescription(dmMessage)

    const intialMsg = await message.reply(`distributing Message to ${role.toString()}...`)

    let sends = 0
    const failedUsers: string[] = []
    for (const member of role.members.array()) {
      try {
        await member.send(dmEmbed)
        sends++
      } catch {
        failedUsers.push(member.user.toString())
      }
    }

    return intialMsg.edit(oneLine`
      ${message.author.toString()}, message successfully distributed to ${pluralize('member', sends)}!
      ${failedUsers.length ? `Unable to send to ${failedUsers.join(', ')} because their DMs are blocked.` : ''}
    `)
  }
})

export default tool
