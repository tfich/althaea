import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import cheerio from 'cheerio'
import BaseScraper from './BaseScraper'

export default class SupremeCommScraper extends BaseScraper {
  private seasonSlug = 'fall-winter2020'

  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super(
      {
        baseUrl: 'https://www.supremecommunity.com',
        useProxy: true,
        randomUserAgent: true
      },
      apolloClient
    )
  }

  public async getDroplist() {
    const { href, week } = await this.getLatestDrop(`/season/${this.seasonSlug}/droplists`)
    const req = await this.request({ url: href, json: false })
    const $ = cheerio.load(req)
    const items: { title: string; price: string }[] = $('.masonry__item')
      .map((_, element) => {
        const title = $(element).find('.card-details').attr('data-itemname')
        const price = $(element).find('.label-price').text().trim()
        if (title) {
          return { title, price }
        }
      })
      .get()
    return { week, items }
  }

  public async getSelloutTimes(region: string) {
    const { href, week } = await this.getLatestDrop(`/season/${this.seasonSlug}/times/${region}`)
    const req = await this.request({ url: href, json: false })
    const $ = cheerio.load(req)
    const items = $('.sellout-item')
    const times: { name: string; time: string }[] = items
      .map((_, element) => {
        const name = $(element).find('.sellout-name').text().trim()
        const color = $(element).find('.sellout-colorway').text().trim()
        const time = $(element).find('.sellout-times').text().trim()
        return { name: `${name} - ${color}`, time }
      })
      .get()
    return { week, times }
  }

  private async getLatestDrop(url: string) {
    const req = await this.request({ url, json: false })
    const $ = cheerio.load(req)
    return {
      href: $('#box-latest').find('a').attr('href')!,
      week: $('.droplist-overview-title').first().text()
    }
  }
}
