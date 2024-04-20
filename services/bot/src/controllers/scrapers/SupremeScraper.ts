import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { SupremeProductInfoResponse, SupremeSiteInfoResponse } from '../../types/apis/supreme'
import { findMatch } from '../../utils/search'
import BaseScraper from './BaseScraper'

export default class SupremeScraper extends BaseScraper {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super({ baseUrl: 'https://www.supremenewyork.com' }, apolloClient)
  }

  public async search(query: string) {
    const info: SupremeSiteInfoResponse = await this.request({ url: '/shop.json' })

    if (!info) {
      return undefined
    }

    const productMatch = findMatch(query, Object.values(info.products_and_categories).flat())

    if (!productMatch) {
      return undefined
    }

    return {
      matchedProduct: productMatch,
      releaseDate: info.release_date,
      releaseWeek: info.release_week
    }
  }

  public async getProductInfo(query: string, productID: number) {
    const product: SupremeProductInfoResponse = await this.request({ url: `/shop/${productID}.json` })

    const styleMatch = findMatch(query, product.styles) || product.styles[0]
    const additionalStyles = product.styles.filter((style) => style !== styleMatch)

    return {
      additionalStyles,
      matchedStyle: styleMatch,
      description: product.description,
      purchasableQty: product.purchasable_qty,
      canadaBlocked: product.canada_blocked
    }
  }
}
