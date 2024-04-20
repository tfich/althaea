import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { ClientEvents } from 'discord.js'
import env from '../../env'
import { Group } from '../../graphql'
import { Listener, ListenerEvent } from '../../types/Listener'
import BaseRegistry from './BaseRegistry'

export default class ListenerRegistry extends BaseRegistry {
  public eventMap = new Map<ListenerEvent, Listener<any>[]>()

  constructor() {
    super()
    this.tools.forEach(({ listeners }) => {
      listeners.forEach((l) => {
        if (this.eventMap.get(l.event)) {
          this.eventMap.get(l.event)?.push(l)
        } else {
          this.eventMap.set(l.event, [l])
        }
      })
    })
  }

  public async incomingEvent<E extends ListenerEvent>(
    listener: Listener<any>,
    args: ClientEvents[E],
    group: Group,
    client: ApolloClient<NormalizedCacheObject>
  ) {
    const toolEnabled =
      env.SKIP_TOOL_DB_VALIDATION || group.toolConfigs.some(({ toolID }) => toolID === listener.toolID)

    if (!toolEnabled) {
      return
    }

    listener.handler(args, group, client)
  }
}
