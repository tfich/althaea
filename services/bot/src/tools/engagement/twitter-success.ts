import { oneLine } from 'common-tags'
import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import {
  DeleteSuccessTweetDocument,
  Mutation,
  MutationDeleteSuccessTweetArgs,
  MutationUpdateSuccessTweetArgs,
  MutationUploadSuccessTweetArgs,
  ToolCategory,
  ToolType,
  UpdateSuccessTweetDocument,
  UploadSuccessTweetDocument
} from '../../graphql'

const tool = new Tool({
  id: 'twitter-success',
  name: 'Twitter Success',
  description: 'Relay success photos from Discord to your Twitter account',
  category: ToolCategory.Engagement,
  type: ToolType.Module,
  featured: true
})

tool.addListener('message', async ([message], group, client) => {
  if (!group.successChannels.includes(message.channel.id)) {
    return
  }

  const imageUrls = message.attachments
    .array()
    .filter(({ height, width }) => height && width)
    .map(({ url }) => url)

  for (const imageUrl of imageUrls) {
    const { data } = await client.mutate<Mutation, MutationUploadSuccessTweetArgs>({
      mutation: UploadSuccessTweetDocument,
      variables: {
        imageUrl,
        memberID: message.author.id,
        channelID: message.channel.id,
        messageID: message.id
      }
    })
    if (data && data.uploadSuccessTweet && group.sendFollowUpSuccessMessage) {
      const embed = new Embed(group).setTitle('Successfully Uploaded Success').setDescription(
        oneLine`
          You can view the tweet [here](${data.uploadSuccessTweet.tweetUrl}).
          ${group.allowSuccessDelete ? 'React with 🗑 to delete the tweet.' : ''}
        `
      )
      const followUpMessage = await message.channel.send(embed)
      if (group.allowSuccessDelete) {
        followUpMessage.react('🗑')
      }
      await client.mutate<Mutation, MutationUpdateSuccessTweetArgs>({
        mutation: UpdateSuccessTweetDocument,
        variables: { id: data.uploadSuccessTweet.id, followUpMessageID: followUpMessage.id }
      })
    }
  }
})

tool.addListener('messageReactionAdd', async ([reaction, user], group, client) => {
  if (
    !group.successChannels.includes(reaction.message.channel.id) ||
    reaction.emoji.name !== '🗑' ||
    !group.allowSuccessDelete ||
    user.bot
  ) {
    return
  }
  const { data } = await client.mutate<Mutation, MutationDeleteSuccessTweetArgs>({
    mutation: DeleteSuccessTweetDocument,
    variables: { followUpMessageID: reaction.message.id }
  })
  if (data && data.deleteSuccessTweet) {
    if (data.deleteSuccessTweet.followUpMessageID) {
      const mainMessage = await reaction.message.channel.messages.fetch(data.deleteSuccessTweet.messageID)
      await mainMessage.delete()
    }
    await reaction.message.delete()
  }
})

tool.addListener('messageDelete', async ([message], group, client) => {
  if (!group.successChannels.includes(message.channel.id) || !group.allowSuccessDelete || message.author?.bot) {
    return
  }
  const { data } = await client.mutate<Mutation, MutationDeleteSuccessTweetArgs>({
    mutation: DeleteSuccessTweetDocument,
    variables: { messageID: message.id }
  })
  if (data && data.deleteSuccessTweet && data.deleteSuccessTweet.followUpMessageID) {
    const followUpMessage = await message.channel.messages.fetch(data.deleteSuccessTweet.followUpMessageID)
    await followUpMessage.delete()
  }
})

export default tool
