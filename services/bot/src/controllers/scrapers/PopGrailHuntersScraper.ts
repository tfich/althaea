import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import querystring from 'querystring'
import { PopGrailHuntersResponse } from '../../types/apis/popgrailhunters'
import BaseScraper from './BaseScraper'

export default class PopGrailHuntersScraper extends BaseScraper {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super(
      {
        baseHeaders: {
          'user-agent': 'TheGrailHunter/6 CFNetwork/1126 Darwin/19.5.0',
          'x-algolia-api-key': '5bcf5a77c44c06031c4a6db5511b1023',
          'x-algolia-agent':
            'Algolia for JavaScript (3.35.1); React Native; react (16.9.0); react-instantsearch (5.7.0); JS Helper (2.28.1)',
          'x-algolia-application-id': 'C9T7FIXQN2'
        },
        useProxy: true
      },
      apolloClient
    )
  }

  public async search(query: string) {
    const { results }: PopGrailHuntersResponse = await this.request({
      url: 'https://c9t7fixqn2-dsn.algolia.net/1/indexes/*/queries',
      method: 'POST',
      body: {
        requests: [
          {
            indexName: 'pops-hdb',
            params: querystring.stringify({
              query,
              hitsPerPage: 3,
              page: 0,
              highlightPreTag: '<ais-highlight-0000000000>',
              highlightPostTag: '</ais-highlight-0000000000>'
            })
          }
        ]
      }
    })

    if (!results || !results[0].hits) {
      return undefined
    }

    const validHits = results[0].hits.filter(Boolean)

    return validHits[0]
  }
}
