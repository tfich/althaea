import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { StockXLinkResponse, StockXResponse } from '../../types/apis/stockx'
import BaseScraper from './BaseScraper'

export default class StockXScraper extends BaseScraper {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super(
      {
        baseHeaders: {
          'user-agent': 'StockX/21765 CFNetwork/978.0.7 Darwin/18.5.0',
          'x-api-key': '99WtRZK6pS1Fqt8hXBfWq8BYQjErmwipa3a0hYxX'
        },
        useProxy: true
      },
      apolloClient
    )
  }

  public async search(query: string) {
    const { hits }: StockXResponse = await this.request({
      url: 'https://gateway.stockx.com/api/v2/search',
      qs: {
        facets: '["product_category"]',
        page: 0,
        currency: 'USD',
        query
      }
    })

    if (!hits || !hits.length) {
      return undefined
    }

    return hits[0]
  }

  public async fetchSizes(slug: string) {
    const { Product }: StockXLinkResponse = await this.request({
      url: `https://stockx.com/api/products/${slug}`
    })

    let sizes: string[] = []
    if (Product && Product.children) {
      const variants = Object.keys(Product.children).map((id) => Product.children![id])
      sizes = variants.map((variant) => variant.shoeSize || 'One Size')
    }
    return sizes
  }
}
