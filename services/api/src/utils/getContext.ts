import { ApolloError } from 'apollo-server-express'
import { Request } from 'express'
import { Group } from '../entities/Group'
import { User } from '../entities/User'
import BaseContext from '../types/BaseContext'
import Client from '../types/Client'
import GroupTokenPayload from '../types/GroupTokenPayload'
import ServerContext from '../types/ServerContext'
import UserTokenPayload from '../types/UserTokenPayload'
import jwt from './jwt'

const getContext = async (baseCtx: BaseContext): Promise<ServerContext> => {
  const client = (baseCtx.req.headers['x-client-id'] || 'WEB') as Client
  const user = await getUser(baseCtx.req)
  const group = await getGroup(baseCtx.req, user)

  return { client, user, group, ...baseCtx }
}

export default getContext

const getUser = async ({ cookies, headers: { authorization, refresh_token } }: Request): Promise<User | undefined> => {
  const refreshToken = cookies.refresh_token || refresh_token

  if (!refreshToken || typeof authorization !== 'string') {
    return undefined
  }

  if (!jwt.verify(refreshToken)) {
    throw new ApolloError('You are not authenticated to make this request', 'UNAUTHENTICATED')
  }

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return undefined
  }

  const payload = jwt.verify<UserTokenPayload>(authorization.split('Bearer ')[1])

  if (!payload) {
    throw new ApolloError('Invalid access token grant.', 'INVALID_ACCESS_TOKEN')
  }

  return User.findOne({ id: payload.userID })
}

const getGroup = async ({ headers }: Request, user?: User): Promise<Group | undefined> => {
  const groupToken = headers['x-group-token'] as string

  if (!groupToken || groupToken == 'undefined') {
    return undefined
  }

  const payload = jwt.verify<GroupTokenPayload>(groupToken)

  if (!payload || (user && payload.userID !== user.id)) {
    throw new ApolloError('You are not authenticated to make this request', 'UNAUTHENTICATED')
  }

  return Group.findOne({ id: payload.groupID })
}
