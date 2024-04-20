import { oneLine } from 'common-tags'
import { GuildMember } from 'discord.js'
import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import {
  CreateLoyaltyPrizeClaimDocument,
  Mutation,
  MutationCreateLoyaltyPrizeClaimArgs,
  MutationUpdateLoyaltyPointsArgs,
  ToolCategory,
  ToolType,
  UpdateLoyaltyPointsDocument
} from '../../graphql'
import { pluralize } from '../../utils/conventions'

const tool = new Tool({
  id: 'loyalty-system',
  name: 'Loyalty System',
  description: 'A complete self-managed loyalty system right in your server',
  category: ToolCategory.Engagement,
  type: ToolType.Command,
  commandTrigger: 'loyalty',
  featured: true
})

tool.addCommand<{ member: GuildMember; amount: number; reason: string }>({
  baseArg: 'adjust',
  description: "Adjust a member's loyalty points manually",
  args: [
    {
      key: 'member',
      example: '@johndoe',
      type: 'member'
    },
    {
      key: 'amount',
      example: '10',
      type: 'number'
    },
    {
      key: 'reason',
      example: 'Helpful post in #announcements'
    }
  ],
  async exec(_, { member, amount, reason }, { client }) {
    const { data } = await client.mutate<Mutation, MutationUpdateLoyaltyPointsArgs>({
      mutation: UpdateLoyaltyPointsDocument,
      variables: { memberID: member.id, pointDifference: amount }
    })
    const newBalance = data?.updateLoyaltyPoints.currentLoyaltyPoints!
    return `**${Math.abs(amount)} ${pluralize('point', amount)}** have been ${
      amount > 0 ? 'added to' : 'removed from'
    } ${member}. They now have **${newBalance}** ${pluralize('point', newBalance)}.`
  }
})

tool.addCommand({
  baseArg: 'points',
  description: 'Check your loyalty point balance',
  args: [],
  async exec(_, __, { group, member }) {
    return oneLine`
      you have a balance of **${member.currentLoyaltyPoints} ${pluralize('point', member.currentLoyaltyPoints)}**.
      Use \`${group.commandPrefix}loyalty prizes\` to redeem points.
    `
  }
})

tool.addCommand({
  baseArg: 'prizes',
  description: 'View a list of all available prizes',
  args: [],
  async exec(_, __, { group }) {
    const embed = new Embed(group)
      .setTitle('Loyalty Points Prizes')
      .setDescription(
        group.loyaltyPrizes
          .map(({ name, cost }, i) => `**${i + 1}.** ${name} (${cost} ${pluralize('point', cost)})`)
          .join('\n')
      )
      .addField('Instructions', `\`${group.commandPrefix}loyalty claim <selection>\``)
    return embed
  }
})

tool.addCommand<{ selection: number }>({
  baseArg: 'claim',
  description: 'Claim a prize with your loyalty points',
  args: [
    {
      key: 'selection',
      example: '1',
      type: 'number'
    }
  ],
  async exec(message, { selection }, { group, client, member }) {
    const prize = group.loyaltyPrizes[selection - 1]
    if (!prize) {
      return 'invalid selection. Please redo the command with a valid prize from the list.'
    }
    if (prize.cost > member.currentLoyaltyPoints) {
      const pointDiff = prize.cost - member.currentLoyaltyPoints
      return `you need **${pointDiff} more ${pluralize('point', pointDiff)}** to claim this prize.`
    }
    const { data } = await client.mutate<Mutation, MutationCreateLoyaltyPrizeClaimArgs>({
      mutation: CreateLoyaltyPrizeClaimDocument,
      variables: { memberID: message.author.id, prizeID: prize.id }
    })
    if (!data) {
      return `error claiming \`${prize.name}\`.`
    }
    const newBalance = data.createLoyaltyPrizeClaim.member.currentLoyaltyPoints
    return oneLine`
      success! You now have a balance of **${newBalance} ${pluralize('point', newBalance)}**.
      I will send you a message once your order is fulfilled by an admin.
    `
  }
})

tool.addCommand({
  baseArg: 'leaderboard',
  description: 'View the top lifetime loyalty point leaders',
  args: [],
  async exec(_, __, { group }) {
    const embed = new Embed(group)
      .setTitle('Loyalty Points Leaderboard')
      .setDescription('This leaderboard is calculated using lifetime points.')
      .addField(
        'Leaders',
        group.loyaltyLeaderboard.map(({ memberID, points }, i) => `**${i + 1}.** <@${memberID}> - ${points}`).join('\n')
      )
    return embed
  }
})

tool.addListener('message', async ([message], group, client) => {
  const configs = group.loyaltyAutoAddConfigs.filter(({ channelID }) => channelID === message.channel.id)
  for (const { amount } of configs) {
    const { data } = await client.mutate<Mutation, MutationUpdateLoyaltyPointsArgs>({
      mutation: UpdateLoyaltyPointsDocument,
      variables: { memberID: message.author.id, pointDifference: amount }
    })
    const newBalance = data?.updateLoyaltyPoints.currentLoyaltyPoints!
    await message.author.send(
      oneLine`
        You have been automatically awarded **${amount} ${pluralize('point', amount)}**
        for your (post)[${message.url}] in ${message.channel}.
        Your new balance is **${newBalance}**.
      `
    )
  }
})

tool.addListener('messageReactionAdd', async ([reaction, user], group, client) => {
  const configs = group.loyaltyReactionConfigs.filter(
    ({ channels, emoji }) =>
      channels.some((channelID) => channelID === reaction.message.channel.id) && reaction.emoji.name === emoji
  )
  for (const { amount } of configs) {
    const { data } = await client.mutate<Mutation, MutationUpdateLoyaltyPointsArgs>({
      mutation: UpdateLoyaltyPointsDocument,
      variables: { memberID: reaction.message.author.id, pointDifference: amount }
    })
    const newBalance = data?.updateLoyaltyPoints.currentLoyaltyPoints!
    await reaction.message.author.send(
      oneLine`
        ${user} has awarded you **${amount} ${pluralize('point', amount)}**
        for your (post)[${reaction.message.url}] in ${reaction.message.channel}.
        Your new balance is **${newBalance}**.
      `
    )
  }
})

export default tool
