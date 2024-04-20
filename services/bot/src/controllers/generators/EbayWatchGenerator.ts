import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import querystring from 'querystring'
import request from 'request'
import rp from 'request-promise'
import BaseGenerator from './BaseGenerator'

export default class EbayWatchGenerator extends BaseGenerator {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super(
      {
        baseHeaders: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36'
        }
      },
      apolloClient
    )
  }

  public async addWatches(link: string, amount = 5) {
    for (let i = 0; i < amount; i++) {
      await this.watch(link, '', '')
    }
  }

  private async watch(link: string, username: string, password: string) {
    const cookieJar = rp.jar()

    const xx = await this.request({
      url: 'https://pulsar.ebay.com/plsr/mpe/0/DFLT/9',
      jar: cookieJar,
      resolveWithFullResponse: true
    })
    const x = await this.request({ url: 'https://ebay.com/', jar: cookieJar, resolveWithFullResponse: true })
    // console.log(x.headers)
    console.log(cookieJar)

    await this.getFormFields(cookieJar)

    // await this.login(cookieJar)

    // console.log(cookieJar)
  }

  private async getFormFields(cookieJar: request.CookieJar) {
    const res: object = await this.request(
      {
        url: 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&ru=https%3A%2F%2Fwww.ebay.com%2F',
        jar: cookieJar,
        headers: {
          referer: 'https://www.ebay.com/',
          Connection: 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          // 'User-Agent':
          // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Sec-Fetch-Site': 'same-site',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-User': '?1',
          'Sec-Fetch-Dest': 'document',
          Referer: 'https://www.ebay.com/',
          'Accept-Language': 'en-US,en;q=0.9'
        },
        resolveWithFullResponse: true,
        transform2xxOnly: false,
        transform: (body, res) => {
          console.log(res.statusCode)
          return null
          if (!res) return null
          const unparsed = body.split('(window.$MC||[]).concat(')[1].split(')</script></body></html>')[0]
          return JSON.parse(unparsed)
        }
      },
      false
    )
    console.log(cookieJar)

    // console.log(res.o.w[5].slice(-1)[0].s.hiddenInputs)
    // const $ = cheerio.load(res)
    // // console.log($.html())
    // const form = $('#signin-form')
    // console.log(form.html())
    // const action = form.attr('action')
    // const method = form.attr('method')

    // console.log(action, method)
  }

  private async login(cookieJar: request.CookieJar) {
    const headers = {
      origin: 'https://signin.ebay.com',
      'content-type': 'application/x-www-form-urlencoded',
      referer: 'https://signin.ebay.com/',
      'accept-language': 'en-US,en;q=0.9'
    }

    const xdata = {
      userid: 'tfichiera@gmail.com',
      pass: 'Fichiera1101',
      'kmsi-unchecked': '1',
      kmsi: '1',
      i1: '',
      pageType: '-1',
      returnUrl: 'https://www.ebay.com/',
      srt:
        '010005000000503c9a6d73b6337d521ac3d2844fe64e08742d47f5bfb524b38f85531a8b33df2a427897ee078d42f7258d9e09908c26020663293b5da26309919ec86d9f54c526df77922940eac679d92c1cfe119ff95f',
      fypReset: '',
      ICurl: '',
      src: '',
      AppName: '',
      srcAppId: '',
      errmsg: '',
      rtmData: 'PS=T.0',
      rqid: '2185de111760a6e57468379bffffffff',
      lkdhjebhsjdhejdshdjchquwekguid: '2185de111760a6e57468379bffffffff',
      recgUser: '',
      lastAttemptMethod: 'password',
      showWebAuthnOptIn: '1',
      mid: 'AQAAAXQoEGjGAAUyMTg1YTJmODE3NjBhYzNjZjkwOTFhZjZmZjdhNzlmNgAAZcsxITLL0v5Rd44tOtsdrvKFbwE*',
      isRecgUser: 'false'
    }

    const body = querystring.stringify({
      userid: 'tylerrandy123+154@gmail.com',
      pass: 'Fichiera1101',
      'kmsi-unchecked': 1,
      kmsi: 1,
      i1: '',
      pageType: -1,
      returnUrl: '',
      srt:
        '0100050000005045dc79fecf3c37ca1fb929f0437f155c63f824390abdcb7ae553df4e7e8553bf4f98e6519a06bf85cb72fbe39e146cfc8ea8cdf7ee413beb998934fd66d52a3aff8e2258da7d23af2c9214b8dcb30596',
      fypReset: '',
      ICurl: '',
      src: '',
      AppName: '',
      srcAppId: '',
      errmsg: '',

      rtmData: 'PS%3DT.0',
      rqid: 'dea6d3321750aaf4e971afceffffffff',
      lkdhjebhsjdhejdshdjchquwekguid: 'dea6d3321750aaf4e971afceffffffff',
      // recgUser: 'tylerrandy123+154@gmail.com',
      // lastAttemptMethod: 'password',
      // showWebAuthnOptIn: 1,
      // mid: 'AQAAAXQoEGjGAAVkZTg2NDg0ODE3NTBhNmU1Y2Q0NmQwZTlmZmM2N2ViZAAAVwKHJ5oLCpaargNfXwit9yS9r%2Bk*',
      isRecgUser: false
    })

    const dataString =
      'userid=tylerrandy123%2B154%40gmail.com&pass=Fichiera11&kmsi-unchecked=1&kmsi=1&i1=&pageType=-1&returnUrl=&srt=0100050000005045dc79fecf3c37ca1fb929f0437f155c63f824390abdcb7ae553df4e7e8553bf4f98e6519a06bf85cb72fbe39e146cfc8ea8cdf7ee413beb998934fd66d52a3aff8e2258da7d23af2c9214b8dcb30596&fypReset=&ICurl=&src=&AppName=&srcAppId=&errmsg=&rtmData=PS%3DT.0&rqid=dea6d3321750aaf4e971afceffffffff&lkdhjebhsjdhejdshdjchquwekguid=dea6d3321750aaf4e971afceffffffff&recgUser=tylerrandy123%2B154%40gmail.com&lastAttemptMethod=password&showWebAuthnOptIn=1&mid=AQAAAXQoEGjGAAVkZTg2NDg0ODE3NTBhNmU1Y2Q0NmQwZTlmZmM2N2ViZAAAVwKHJ5oLCpaargNfXwit9yS9r%2Bk*&isRecgUser=false'

    const req = await this.request(
      {
        method: 'POST',
        url: '/signin/s',
        headers,
        body: dataString,
        resolveWithFullResponse: true,
        jar: cookieJar
      }
      // true
    )
    console.log(req)
  }
}
