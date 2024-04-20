import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import cheerio from 'cheerio'
import { StadiumGoodsResponse } from '../../types/apis/stadiumgoods'
import BaseScraper from './BaseScraper'

export default class StadiumGoodsScraper extends BaseScraper {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super({ useProxy: true, randomUserAgent: true }, apolloClient)
  }

  public async search(query: string) {
    const search: StadiumGoodsResponse = await this.request({
      url: 'https://graphql.stadiumgoods.com/graphql',
      method: 'POST',
      json: {
        operationId: 'sg-front/cached-45aec6effc56af980c233bd3dc02ab62',
        variables: {
          searchQuery: query
        },
        locale: 'USA_USD'
      }
    })

    if (!search || !search.data || !search.data.configurableProducts.edges.length) {
      return undefined
    }

    return search.data.configurableProducts.edges[0].node
  }

  public async fetchSizes() {
    const req = await this.request({
      url: 'https://www.stadiumgoods.com/air-jordan-1-retro-high-og-light-smoke-grey-555088-126',
      json: false
    })
    const $ = cheerio.load(req)
    const sizeInputs = $('.product-sizes__input')

    const sizes: { size: string; price: string }[] = []

    sizeInputs.each((_, element) => {
      const info = $(element)
      const size = info.attr('data-size')!
      const price = info.attr('data-price')!
      if (price !== '0') {
        sizes.push({ size, price })
      }
    })

    return sizes
  }
}
