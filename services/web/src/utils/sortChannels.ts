import { DiscordChannel } from '../graphql'

const sortChannels = (channels: DiscordChannel[]): DiscordChannel[] => {
  const nonParentChannels = []
  const categoryMap = new Map<DiscordChannel, DiscordChannel[]>()

  const categories = channels
    .filter(({ type }) => type === 'GUILD_CATEGORY')
    .sort((a, b) => (a.position > b.position ? 1 : -1))

  categories.forEach((c) => {
    categoryMap.set(c, [])
  })

  const textChannels = channels.filter(({ type }) => type === 'GUILD_TEXT').sort((a, b) => a.position - b.position)

  for (const channel of textChannels) {
    const parent = channel.parentID ? categories.filter(({ id }) => id === channel.parentID)[0] : undefined
    if (parent) {
      categoryMap.get(parent)?.push(channel)
    } else {
      nonParentChannels.push(channel)
    }
  }

  categoryMap.forEach((childChannels, parentChannel) => !childChannels.length && categoryMap.delete(parentChannel))

  return [...nonParentChannels, ...Array.from(categoryMap).flat(2)]
}

export default sortChannels
