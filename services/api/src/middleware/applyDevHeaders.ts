import { NextFunction, Request, Response } from 'express'
import env from '../env'
import jwt from '../utils/jwt'

const { DEV_USER_ID: userID, DEV_GROUP_ID: groupID } = env

const accessToken = jwt.create({ userID }, '7d')
const refreshToken = jwt.create({ userID }, '7d')
const groupToken = jwt.create({ groupID, userID }, '7d')

const headers = {
  'x-group-token': groupToken,
  'x-client-id': 'WEB',
  refresh_token: refreshToken,
  authorization: `Bearer ${accessToken}`
}

const applyDevHeaders = (req: Request, res: Response, next: NextFunction) => {
  if (env.isDev && req.headers['use-generated-headers'] == 'true') {
    Object.assign(req.headers, headers)
  }
  return next()
}

export default applyDevHeaders
