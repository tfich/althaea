import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import env from '../../env'
import { BotBrokerBot } from '../../types/apis/botbroker'
import BaseScraper from './BaseScraper'

export default class BotBrokerScraper extends BaseScraper {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super({ baseUrl: 'https://botbroker-api-sksksjdksjkd.herokuapp.com/api/v1' }, apolloClient)
  }

  public async search(query: string) {
    const bots: BotBrokerBot[] = await this.request({
      url: '/bots/all',
      qs: { apiKey: env.BOTBROKER_API_KEY }
    })

    if (!bots) {
      return undefined
    }

    const matchedBot = bots.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))[0]

    if (!matchedBot) {
      return undefined
    }

    return matchedBot
  }
}
