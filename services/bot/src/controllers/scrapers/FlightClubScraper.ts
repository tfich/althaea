import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import querystring from 'querystring'
import { FlightClubResponse } from '../../types/apis/flightclub'
import BaseScraper from './BaseScraper'

export default class FlightClubScraper extends BaseScraper {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super(
      {
        baseHeaders: {
          'x-algolia-api-key':
            'ODUzMzdkNTM1MTI2OTgyNzE5MTIzN2ExZjZlMTAzOTJiMGFlN2QyNjM5YTBmZGIzOThmZTA2MDVhNDI3YjcxZGZpbHRlcnM9',
          'x-algolia-agent':
            'Algolia for vanilla JavaScript 3.21.1;Magento integration (1.10.0);autocomplete.js 0.26.0',
          'x-algolia-application-id': 'SE11PYUS00',
          'content-type': 'multipart/form-data'
        },
        useProxy: true
      },
      apolloClient
    )
  }

  public async search(query: string) {
    const { hits }: FlightClubResponse = await this.request({
      method: 'POST',
      url: 'https://se11pyus00-dsn.algolia.net/1/indexes/fc_prod_us_products/query',
      body: {
        params: querystring.stringify({
          query,
          hitsPerPage: 6,
          analyticsTags: 'autocomplete',
          facets: '["categories.level0"]',
          numericFilters: 'visibility_search=1'
        })
      }
    })

    if (!hits || !hits.length) {
      return undefined
    }

    return hits[0]
  }
}
