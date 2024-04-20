import { stripIndents } from 'common-tags'
import { MessageEmbed } from 'discord.js'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import GroupDiscordClient from '../../controllers/GroupDiscordClient'
import { ActivityEntry } from '../../entities/ActivityEntry'
import { GroupAdmin } from '../../entities/GroupAdmin'
import { User } from '../../entities/User'
import env from '../../env'
import ActivityEvent from '../../types/ActivityEvent'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => GroupAdmin)
  async addGroupAdmin(
    @Arg('userID') userID: string,
    @Ctx() { group, user: ctxUser }: ServerContext
  ): Promise<GroupAdmin> {
    await User.findOrCreate({ id: userID })

    const discordClient = new GroupDiscordClient(group!)
    const userInfo = await discordClient.getUser(userID)
    const guildInfo = await discordClient.getGuild()

    const embed = new MessageEmbed()
      .setTitle('Althaea Dashboard')
      .setColor(0x36393f)
      .setDescription(
        stripIndents`
          You have been added as a Group Admin to \`${guildInfo.name}\`.
          Login [here](${env.WEB_BASE_URL}/login) to get started using Althaea.
        `
      )

    try {
      await discordClient.dmUser(userID, embed)
    } catch {}

    await ActivityEntry.create({
      event: ActivityEvent.ADDED_ADMIN,
      groupID: group?.id,
      adminID: ctxUser?.id,
      info: userInfo ? `${userInfo.username}#${userInfo.discriminator}` : 'n/a'
    }).save()

    return GroupAdmin.create({ groupID: group?.id!, userID, isOwner: false }).save()
  }
}
