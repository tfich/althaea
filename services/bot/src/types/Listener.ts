import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { ClientEvents } from 'discord.js'
import { Group } from '../graphql'

export type ListenerEvent = keyof ClientEvents

export type ListenerHandler<E extends ListenerEvent> = (
  args: ClientEvents[E],
  group: Group,
  client: ApolloClient<NormalizedCacheObject>
) => Promise<void>

export interface Listener<E extends ListenerEvent> {
  toolID: string
  event: E
  handler: ListenerHandler<E>
}
