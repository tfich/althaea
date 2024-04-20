import { ApolloError } from 'apollo-server-express'
import { Ctx, Mutation, Resolver } from 'type-graphql'
import ServerContext from '../types/ServerContext'
import UserTokenPayload from '../types/UserTokenPayload'
import jwt from '../utils/jwt'

@Resolver()
export default class {
  @Mutation(() => String, { nullable: true })
  async refreshAccessToken(@Ctx() { req: { cookies, headers }, res }: ServerContext): Promise<string | null> {
    const refreshToken = cookies.refresh_token || headers.refresh_token
    if (!refreshToken) {
      return null
    }

    const payload = jwt.verify<UserTokenPayload>(refreshToken)
    if (!payload) {
      throw new ApolloError('You are not authenticated to make this request', 'UNAUTHENTICATED')
    }

    delete payload.iat
    delete payload.exp

    const accessToken = jwt.create(payload, '15min')
    const newRefreshToken = jwt.create(payload, '7d')

    res.cookie('refresh_token', newRefreshToken)

    return accessToken
  }
}
