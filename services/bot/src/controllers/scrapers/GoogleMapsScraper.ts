import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import env from '../../env'
import { GoogleMapsResponse } from '../../types/apis/googlemaps'
import BaseScraper from './BaseScraper'

export default class GoogleMapsScraper extends BaseScraper {
  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    super({ baseUrl: 'https://maps.googleapis.com/maps/api' }, apolloClient)
  }

  public async getCoords(address: string) {
    const req: GoogleMapsResponse = await this.request({
      url: '/geocode/json',
      qs: { key: env.MAPS_API_KEY, address }
    })

    if (!req || !req.results) {
      return undefined
    }

    return req.results[0].geometry.location
  }
}
