import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { Group, GroupDocument, InstanceFromOrdinalDocument, Query } from '../../graphql'
import crypt from '../../utils/crypt'
import { resolvePartials } from '../../utils/discord/general'
import eventGroupIDMatcher from '../../utils/eventGroupIDMatcher'
import BaseBot from './BaseBot'

export default class CustomBot extends BaseBot {
  private groupApolloClient: ApolloClient<NormalizedCacheObject>
  private group: Group

  constructor(private podOrdinal: number) {
    super()
  }

  protected async start() {
    const { data } = await this.baseApolloClient.query<Query>({
      query: InstanceFromOrdinalDocument,
      variables: { podOrdinal: this.podOrdinal }
    })
    if (!data) {
      throw Error('Could not fetch instance from ordinal!')
    }

    this.groupApolloClient = this.createApolloClient(data.instanceFromOrdinal.groupToken)

    await this.cache()

    await this.loginBotClient(crypt.decrypt(data.instanceFromOrdinal.botToken))
    await this.setActivity()

    this.discordClient.on('message', async (msg) => {
      const group = msg.guild && msg.guild.id === this.group.id ? this.group : undefined
      if (group) {
        this.commandRegistry.incomingMessage(msg, group, this.groupApolloClient)
      }
    })

    for (const [event, listeners] of this.listenerRegistry.eventMap) {
      this.discordClient.on(event, async (...args) => {
        listeners.forEach(async (listener) => {
          await resolvePartials(...args)
          const eventGroupID = eventGroupIDMatcher[event]!(...args)
          const group = eventGroupID === this.group.id ? this.group : undefined
          if (group) {
            try {
              this.listenerRegistry.incomingEvent(listener, args, group, this.groupApolloClient)
            } catch {}
          }
        })
      })
    }
  }

  protected async cache() {
    const { data } = await this.groupApolloClient.query<Query>({ query: GroupDocument })
    if (!data || !data.group) {
      throw Error('Could not fetch group!')
    }
    this.group = data.group
  }

  protected async setActivity() {
    const { botStatus, botStatusType } = this.group
    if (botStatus && botStatusType) {
      const type = botStatusType as any
      await this.discordClient.user?.setActivity(botStatus, { type })
    }
  }
}
