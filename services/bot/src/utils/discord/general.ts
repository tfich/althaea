import { ClientEvents, GuildMember, Message, Role, User } from 'discord.js'
import { ListenerEvent } from '../../types/Listener'

export const getID = (objectOrID: string | Role | User | GuildMember) => {
  if (typeof objectOrID === 'string') {
    return objectOrID
  }
  if ('id' in objectOrID) {
    return objectOrID.id
  }
  throw Error('No ID found for object!')
}

export const resolvePartials = async <E extends ListenerEvent>(...args: ClientEvents[E]) => {
  for (const arg of args) {
    if (typeof arg === 'object' && 'partial' in arg && arg.partial) {
      await arg.fetch()
    }
  }
}

export const snowflakeToDate = (snowflake: string) =>
  new Date(parseInt(Number(snowflake).toString(2).padStart(64, '0').slice(0, 42), 2) + 1420070400000)

export const isEmbedTitle = (message: Message, title: string) =>
  message.embeds.length && message.embeds[0].title && message.embeds[0].title === title

export const createStringFromMessage = ({ content, embeds }: Message) => {
  const infoStrs: string[] = []
  content && infoStrs.push(content)
  embeds.forEach(({ title, url, description, footer }) => {
    title && infoStrs.push(title)
    url && infoStrs.push(url)
    description && infoStrs.push(description)
    footer && footer.text && infoStrs.push(footer.text)
  })
  return infoStrs.join('||')
}
