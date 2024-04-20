import { AuthenticationError } from 'apollo-server-express'
import rp from 'request-promise'
import redis from '../utils/redis'

export default class BaseDiscordClient {
  public auth: string | null = null

  public async request(options: rp.OptionsWithUrl, hitCache = true, silentError = false): Promise<any> {
    const redisKey = `${options.url}:${this.auth}`
    if (hitCache) {
      const cachedReq = await redis.get(redisKey)
      if (cachedReq) {
        return JSON.parse(cachedReq)
      }
    }

    try {
      const req = await rp({
        baseUrl: 'https://discordapp.com/api',
        headers: { Authorization: this.auth },
        json: true,
        ...options
      })
      if (hitCache) {
        await redis.setex(redisKey, 120, JSON.stringify(req))
      }
      return req
    } catch (error) {
      if (silentError) {
        return null
      }
      if (error.message && error.message.includes('Unauthorized')) {
        throw new AuthenticationError(`Discord request on ${options.url} is unauthorized!`)
      }
      throw error
    }
  }

  public async paginatedRequest(options: rp.OptionsWithUrl, maxResLength: number, silentError = false) {
    const responses: any[] = []
    let resLength = maxResLength
    let lastPullID = 0
    while (resLength === maxResLength) {
      const res = await this.request(
        {
          ...options,
          url: `${options.url}?limit=${maxResLength}${lastPullID > 0 ? `&after=${lastPullID}` : ''}`
        },
        true,
        silentError
      )
      lastPullID = res[0].id
      resLength = res.length
      responses.push(...res)
    }
    return responses
  }
}
