import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { CrtEntry } from '../../types/apis/crtsubdomains'
import BaseScraper from './BaseScraper'

export default class CrtSubdomainScraper extends BaseScraper {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super({ baseUrl: 'https://crt.sh' }, apolloClient)
  }

  public async getSubdomains(host: string) {
    const entries: CrtEntry[] = await this.request({
      url: '/json',
      qs: { q: host }
    })
    const subdomains = entries.reduce<string[]>(
      (acc, { name_value }) => acc.concat(name_value.split(' ').map((_) => _.trim().replace('www.', ''))),
      []
    )
    return [...new Set(subdomains)]
  }
}
