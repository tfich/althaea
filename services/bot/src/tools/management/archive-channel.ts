import { TextChannel } from 'discord.js'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { defaultRoles, findOrCreateCategory } from '../../utils/discord/channel'

const tool = new Tool({
  id: 'archive-channel',
  name: 'Archive Channel',
  description: 'Manage your server by archiving inactive channels',
  category: ToolCategory.Management,
  type: ToolType.Command,
  commandTrigger: 'archive'
})

tool.addCommand({
  description: 'Archives the current channel',
  args: [],
  async exec({ guild, channel }) {
    const archiveCategroy = await findOrCreateCategory(guild, 'archive')
    await (channel as TextChannel).setParent(archiveCategroy)
    guild?.roles.cache.each(async (role) => {
      await (channel as TextChannel).overwritePermissions([
        {
          id: role.id,
          deny: defaultRoles
        }
      ])
    })
    return 'this channel has been archived!'
  }
})

export default tool
