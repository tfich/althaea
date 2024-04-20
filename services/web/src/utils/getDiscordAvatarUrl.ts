// https://discordapp.com/developers/docs/reference#image-formatting-cdn-endpoints
const getDiscordAvatarUrl = (
  iconType: 'GROUP' | 'USER',
  id: string,
  hash?: string,
  size?: string,
  discriminator?: string
) => {
  if (iconType === 'GROUP') {
    return hash
      ? `https://cdn.discordapp.com/icons/${id}/${hash}.png?size=${size}`
      : `https://cdn.discordapp.com/embed/avatars/1.png?size=${size}`
  }
  return hash
    ? `https://cdn.discordapp.com/avatars/${id}/${hash}.png?size=${size}`
    : `https://cdn.discordapp.com/embed/avatars/${Number(discriminator) % 5}.png?size=${size}`
}

export default getDiscordAvatarUrl
