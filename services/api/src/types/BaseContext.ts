import { Request, Response } from 'express'

interface BaseContext {
  req: Request
  res: Response
}

export default BaseContext
