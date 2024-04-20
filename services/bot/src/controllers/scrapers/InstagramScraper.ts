import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { InstagramMeta } from '../../types/apis/instagram'
import BaseScraper from './BaseScraper'

export default class InstagramScraper extends BaseScraper {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super(
      {
        baseUrl: 'https://instagram.com',
        useProxy: true,
        randomUserAgent: true
      },
      apolloClient
    )
  }

  public async search(username: string) {
    const req = await this.request({
      url: `/${username}`,
      json: false,
      qs: { hl: 'en' }
    })

    const matches = req.match(/window._sharedData = (.*);/)

    if (!matches) {
      return undefined
    }

    const meta: InstagramMeta = JSON.parse(matches[1])
    return meta.entry_data.ProfilePage[0].graphql.user
  }
}
