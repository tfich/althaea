import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import BaseGenerator from './BaseGenerator'

export default class EbayViewGenerator extends BaseGenerator {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super({ baseUrl: 'https://www.ebay.com' }, apolloClient)
  }
}
