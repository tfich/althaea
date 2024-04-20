import { NextFunction, Request, Response } from 'express'
import Role from '../types/Role'
import authChecker from '../utils/authChecker'

const allow = (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
  const valid = authChecker(req.context as any, roles)
  if (!valid) {
    res.status(400)
    return res.json({ error: 'You are not authenticated to make this request.' })
  }
  return next()
}

export default allow
