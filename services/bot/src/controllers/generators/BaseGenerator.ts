import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import _ from 'lodash'
import rp from 'request-promise'
import userAgents from '../../utils/constants/userAgents'

interface BaseGeneratorOption {
  baseUrl?: string
  baseHeaders?: object
  useProxy?: boolean
  randomUserAgent?: boolean
}

export default class BaseGenerator {
  protected options: BaseGeneratorOption
  private proxy?: string

  constructor(options: BaseGeneratorOption, private apolloClient: ApolloClient<NormalizedCacheObject>) {
    this.options = Object.assign(
      {
        baseHeaders: {},
        useProxy: false,
        randomUserAgent: false
      },
      options
    )

    if (options.randomUserAgent && !options.baseHeaders?.['user-agent']) {
      this.options.baseHeaders!['user-agent'] = this.getRandomUserAgent()
    }
  }

  protected async request(options: rp.OptionsWithUrl, throwError = true): Promise<any> {
    try {
      const proxy = await this.getProxy()
      const headers = { ...this.options.baseHeaders, ...options.headers }
      const req = await rp({ baseUrl: this.options.baseUrl, headers, proxy, ...options })
      return req
    } catch (error) {
      if (throwError) throw error
      return null
    }
  }

  protected getRandomUserAgent() {
    return _.sample(userAgents)!
  }

  protected async getProxy() {
    if (!this.options.useProxy) {
      return undefined
    }

    if (this.proxy) {
      return this.proxy
    }

    // TODO: remove this once there are valid proxies in db
    return undefined

    // const { data } = await this.apolloClient.query<Query>({ query: GetProxiesDocument })
    // if (!data) {
    //   throw Error('Unable to fetch proxies.')
    // }
    // const unformattedProxy = _.sample(data.getProxies)?.proxy!
    // const proxySplit = unformattedProxy.split(':')
    // if (proxySplit.length > 3) {
    //   return 'http://' + proxySplit[2] + ':' + proxySplit[3] + '@' + proxySplit[0] + ':' + proxySplit[1]
    // } else {
    //   return 'http://' + proxySplit[0] + ':' + proxySplit[1]
    // }
  }
}
