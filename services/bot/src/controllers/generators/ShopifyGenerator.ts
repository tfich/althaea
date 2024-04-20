import rp from 'request-promise'
import BaseGenerator from './BaseGenerator'

export default class ShopifyGenerator extends BaseGenerator {
  public static async generate(catchall: string, numberOfAccounts: number) {
    // for (let i = 0; i < numberOfAccounts; i++) {
    //   const email = `${faker.name.firstName()}${faker.name.lastName()}@${catchall}`
    //   const password = faker.internet.password()
    //   const res = rp({})
    // }

    const res = await rp({
      url: 'https://undefeated.com/account',
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'max-age=0',
        'content-type': 'application/x-www-form-urlencoded',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        cookie:
          '__cfduid=d8415af6e38bc763d0afa3db931bc1921602138741; _shopify_y=90a16588-8f2b-4b08-b3f6-82bdfd369022; cart_currency=USD; _shopify_s=ca976456-9d3e-4712-9e9a-856e765be059; _s=ca976456-9d3e-4712-9e9a-856e765be059; _shopify_fs=2020-10-08T06%3A32%3A21Z; _orig_referrer=; secure_customer_sig=; _shopify_country=United+States; _landing_page=%2F; _y=90a16588-8f2b-4b08-b3f6-82bdfd369022; _shopify_sa_p=; GlobalE_Data=%7B%22countryISO%22%3A%22US%22%2C%22currencyCode%22%3A%22USD%22%2C%22cultureCode%22%3A%22en-US%22%7D; _ga=GA1.2.626771869.1602138742; _gid=GA1.2.1181572.1602138742; _fbp=fb.1.1602138742277.222661025; GlobalE_SupportThirdPartCookies=true; shopify_pay_redirect=pending; GlobalE_Full_Redirect=false; rskxRunCookie=0; rCookie=5bq1cy2iz3lvrbixrmgrxgkd7xxjks; cart_sig=; _shopify_tm=; _shopify_m=persistent; _shopify_tw=; _shopify_sa_t=2020-10-08T06%3A32%3A42.249Z; lastRskxRun=1602138762497'
      },
      method: 'POST',
      formData: {
        form_type: 'create_customer',
        utf8: '✓',
        'customer[first_name]': 'Ada',
        'customer[last_name]': 'Test',
        'customer[email]': 'tylerrandy123+24@gmail.com',
        'customer[password]': 'DfMpbQE#_QX3vCa'
      }
    })

    console.log(res)
  }
}

ShopifyGenerator.generate('gmail.com', 1)
