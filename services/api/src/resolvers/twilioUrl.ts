import base64url from 'base64url'
import { Ctx, Query, Resolver } from 'type-graphql'
import env from '../env'
import ServerContext from '../types/ServerContext'

@Resolver()
export default class {
  @Query(() => String)
  async twilioUrl(@Ctx() { group }: ServerContext): Promise<string> {
    const state = base64url(JSON.stringify({ groupID: group?.id }))
    return `https://www.twilio.com/authorize/${env.TWILIO_CONNECT_SID}?state=${state}`
  }
}
