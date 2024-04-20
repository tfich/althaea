import { TextChannel } from 'discord.js'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'create-webhook',
  name: 'Create Webhook',
  description: 'Quickly generate a webhook in a channel',
  category: ToolCategory.Management,
  type: ToolType.Command,
  commandTrigger: 'webhook'
})

interface Args {
  name: string
}

tool.addCommand<Args>({
  description: 'Quickly generate a webhook in the current channel',
  args: [
    {
      key: 'name',
      example: 'Captain Hook'
    }
  ],
  async exec({ member, channel }, { name }, { group, client }) {
    if (!member?.hasPermission('MANAGE_WEBHOOKS')) {
      return 'you do not have permission to manage webhooks.'
    }
    const webhook = await (channel as TextChannel).createWebhook(name)
    await member.send(`Here is your webhook for ${channel.toString()}: \`${webhook.url}\``)
    return 'a webhook for this channel was sent to you via DM.'
  }
})

export default tool
