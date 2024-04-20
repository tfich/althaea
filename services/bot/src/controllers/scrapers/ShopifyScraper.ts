import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { ShopifyProductInfoResponse } from '../../types/apis/shopifyproduct'
import { ShopifySiteInfoResponse } from '../../types/apis/shopifysite'
import BaseScraper from './BaseScraper'

export default class ShopifyScraper extends BaseScraper {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super({ useProxy: true, randomUserAgent: true }, apolloClient)
  }

  public async getProductInfo(productUrl: string): Promise<ShopifyProductInfoResponse> {
    return this.request({ url: productUrl, qs: { format: 'js' } })
  }

  public async getSiteInfo(siteUrl: string): Promise<ShopifySiteInfoResponse> {
    return this.request({ url: `${siteUrl}/meta.json` })
  }

  public async isPasswordProtected(siteUrl: string): Promise<boolean> {
    const { request } = await this.request({
      url: siteUrl,
      followAllRedirects: true,
      resolveWithFullResponse: true,
      json: false
    })
    return request.uri.href.endsWith('/password')
  }
}
