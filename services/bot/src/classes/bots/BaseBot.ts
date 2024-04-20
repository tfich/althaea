import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { Client } from 'discord.js'
import fetch from 'isomorphic-unfetch'
import { env } from 'process'
import { Mutation, MutationSeedToolsArgs, SeedToolsDocument } from '../../graphql'
import getAllTools from '../../utils/getAllTools'
import CommandRegistry from '../registries/CommandRegistry'
import ListenerRegistry from '../registries/ListenerRegistry'

export default abstract class BaseBot {
  protected discordClient = new Client({
    messageCacheLifetime: 5 * 60, // sweepable after 5 minutes
    messageSweepInterval: 10 * 60, // sweep every 10 minutes
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER']
  })

  protected baseApolloClient = this.createApolloClient()

  protected commandRegistry = new CommandRegistry()
  protected listenerRegistry = new ListenerRegistry()
  private cacheInterval: NodeJS.Timeout

  protected abstract async start(): Promise<void>
  protected abstract async cache(): Promise<void>
  protected abstract async setActivity(): Promise<void>

  constructor() {
    this.preRun().then(() => {
      this.start()

      this.cacheInterval = setInterval(async () => {
        await this.cache()
        await this.setActivity()
        console.log('Cached...')
      }, 30 * 1000)
    })
  }

  private async preRun() {
    const toolOptions = getAllTools().map(({ options }) => options)

    const x: string[] = []
    toolOptions.forEach(({ id }) => {
      if (x.includes(id)) console.log(id)
      else x.push(id)
    })

    await this.baseApolloClient.mutate<Mutation, MutationSeedToolsArgs>({
      mutation: SeedToolsDocument,
      variables: { tools: toolOptions }
    })
  }

  protected async loginBotClient(botToken: string) {
    await this.discordClient.login(botToken)
    console.log('Discord client logged in...')
  }

  protected createApolloClient(token?: string) {
    const httpLink = new HttpLink({
      uri: `${env.API_BASE_URL}/graphql`,
      credentials: 'include',
      fetch
    })

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        'X-Group-Token': token,
        'X-Client-ID': 'BOT'
      }
    }))

    return new ApolloClient({
      ssrMode: true,
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore'
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all'
        }
      }
    })
  }

  public async quit() {
    this.discordClient.destroy()
    clearInterval(this.cacheInterval)
  }
}
