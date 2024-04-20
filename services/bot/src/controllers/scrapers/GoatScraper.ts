import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import querystring from 'querystring'
import { GoatResponse } from '../../types/apis/goat'
import BaseScraper from './BaseScraper'

export default class GoatScraper extends BaseScraper {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super(
      {
        baseHeaders: {
          'x-algolia-agent': 'Algolia for vanilla JavaScript 3.25.1',
          'x-algolia-application-id': '2FWOTDVM2O',
          'x-algolia-api-key': 'ac96de6fef0e02bb95d433d8d5c7038a'
        },
        useProxy: true
      },
      apolloClient
    )
  }

  public async search(query: string) {
    const { hits }: GoatResponse = await this.request({
      method: 'POST',
      url: 'https://2fwotdvm2o-dsn.algolia.net/1/indexes/ProductTemplateSearch/query',
      body: {
        params: querystring.stringify({
          query,
          hitsPerPage: 1,
          facets: '*'
        })
      }
    })

    if (!hits || !hits.length) {
      return undefined
    }

    return hits[0]
  }
}
