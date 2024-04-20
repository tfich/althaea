import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import GroupDiscordClient from '../../controllers/GroupDiscordClient'
import TwitterClient from '../../controllers/TwitterClient'
import { GroupMember } from '../../entities/GroupMember'
import { SuccessTweet } from '../../entities/SuccessTweet'
import ServerContext from '../../types/ServerContext'

// TODO: add queue support
@Resolver()
export default class {
  @Mutation(() => SuccessTweet, { nullable: true })
  async uploadSuccessTweet(
    @Ctx() { group }: ServerContext,
    @Arg('imageUrl') imageUrl: string,
    @Arg('memberID') memberID: string,
    @Arg('channelID') channelID: string,
    @Arg('messageID') messageID: string
  ): Promise<SuccessTweet | undefined> {
    const twitter = new TwitterClient(group!)
    const discord = new GroupDiscordClient(group!)

    const { name: groupName } = await discord.getGuild()
    const { username } = await discord.getUser(memberID)

    const caption = group!.successMessageFormat.replace('<group>', groupName).replace('<user>', username)

    const upload = await twitter.tweetWithMedia(imageUrl, caption)
    if (!upload) {
      return undefined
    }

    const member = await GroupMember.findOrCreate({ groupID: group?.id!, memberID })

    const tweetUrl = `https://www.twitter.com/${upload.user.screen_name}/status/${upload.id_str}`

    return SuccessTweet.create({
      groupID: group?.id!,
      memberID: member.memberID,
      imageUrl,
      caption,
      channelID,
      messageID,
      tweetID: upload.id_str,
      tweetUrl
    }).save()
  }
}
