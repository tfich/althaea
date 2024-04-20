import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import jwt from 'jsonwebtoken'
import env from '../../env'
import { Group, GroupDocument, MainBotGroupTokensDocument, Query } from '../../graphql'
import { resolvePartials } from '../../utils/discord/general'
import eventGroupIDMatcher from '../../utils/eventGroupIDMatcher'
import BaseBot from './BaseBot'

export default class MainBot extends BaseBot {
  private groupApolloClients = new Map<string, ApolloClient<NormalizedCacheObject>>()
  private groups = new Map<string, Group>()

  constructor() {
    super()
  }

  protected async start() {
    await this.cache()

    await this.loginBotClient(env.MAIN_BOT_TOKEN)
    await this.setActivity()

    this.discordClient.on('message', async (msg) => {
      const group = msg.guild ? this.groups.get(msg.guild.id) : undefined
      const apolloClient = msg.guild ? this.groupApolloClients.get(msg.guild.id) : undefined
      if (group && apolloClient) {
        try {
          this.commandRegistry.incomingMessage(msg, group, apolloClient)
        } catch {}
      }
    })

    for (const [event, listeners] of this.listenerRegistry.eventMap) {
      this.discordClient.on(event, async (...args) => {
        listeners.forEach(async (listener) => {
          await resolvePartials(...args)
          const eventGroupID = eventGroupIDMatcher[event]!(...args)
          const group = this.groups.get(eventGroupID)
          const apolloClient = this.groupApolloClients.get(eventGroupID)
          if (group && apolloClient) {
            try {
              this.listenerRegistry.incomingEvent(listener, args, group, apolloClient)
            } catch {}
          }
        })
      })
    }
  }

  protected async cache() {
    const { data: tokenData } = await this.baseApolloClient.query<Query>({ query: MainBotGroupTokensDocument })
    if (!tokenData || !tokenData.mainBotGroupTokens) {
      throw Error('Could not fetch main bot tokens!')
    }
    this.groupApolloClients.clear()
    tokenData.mainBotGroupTokens.forEach((token) => {
      const { groupID }: any = jwt.decode(token)
      this.groupApolloClients.set(groupID, this.createApolloClient(token))
    })

    this.groups.clear()
    for (const [groupID, client] of this.groupApolloClients) {
      const { data } = await client.query<Query>({ query: GroupDocument })
      if (!data || !data.group) {
        throw Error(`Could not fetch group ${groupID}!`)
      }
      this.groups.set(groupID, data.group)
    }
  }

  protected async setActivity() {
    const numGuilds = this.discordClient.guilds.cache.size
    await this.discordClient.user?.setActivity(`althaea.app | Running in ${numGuilds} servers!`, { type: 'PLAYING' })
  }
}
