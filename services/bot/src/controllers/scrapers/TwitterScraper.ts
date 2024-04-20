import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import cheerio from 'cheerio'
import BaseScraper from './BaseScraper'

export default class TwitterScraper extends BaseScraper {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super({ baseUrl: 'https://twitter.com', useProxy: true, randomUserAgent: true }, apolloClient)
  }

  public async search(username: string) {
    const req = await this.request({
      url: `/${username}`,
      json: false,
      headers: {
        Cookie: 'lang=en'
      }
    })

    if (!req) {
      return undefined
    }

    const $ = cheerio.load(req)

    console.log(req)

    return {
      following: $('.ProfileNav-item--following').find('a').attr('title'),
      followers: $('.ProfileNav-item--followers').find('a').attr('title'),
      tweets: $('.ProfileNav-item--tweets').find('a').attr('title'),
      likes: $('.ProfileNav-item--favorites').find('a').attr('title'),
      verified: $('.ProfileHeaderCard-badges').get().length > 0,
      joined: $('.ProfileHeaderCard-joinDateText').attr('title'),
      name: $('.ProfileHeaderCard-nameLink').text(),
      image: $('.ProfileAvatar-container').attr('href')
    }
  }
}
