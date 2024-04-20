import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { IsNull, Not } from 'typeorm'
import GroupDiscordClient from '../../controllers/GroupDiscordClient'
import TwilioClient from '../../controllers/TwilioClient'
import { GroupMember } from '../../entities/GroupMember'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => String)
  async sendSmsMessage(@Ctx() { group }: ServerContext, @Arg('message') message: string): Promise<string> {
    if (!group?.twilioConnectAccountSID || !group?.twilioNotifyServiceSID) {
      throw Error('Twilio configs are not configured.')
    }

    const groupMembers = await GroupMember.find({ groupID: group?.id, smsNumber: Not(IsNull()) })
    const discordClient = new GroupDiscordClient(group!)
    const guildMemberIDs = (await discordClient.getAllGuildMembers()).map(({ user }) => user.id)
    const activeSmsNumbers = groupMembers
      .filter(({ memberID }) => guildMemberIDs.includes(memberID))
      .map(({ smsNumber }) => smsNumber!)

    const client = new TwilioClient(group?.twilioConnectAccountSID!)
    const { sid } = await client.sendMessage(message, activeSmsNumbers, group?.twilioNotifyServiceSID)

    return sid
  }
}
