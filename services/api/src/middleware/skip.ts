import { NextFunction, Request, Response } from 'express'

const skip = (path: string, middleware: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith(path)) {
      return next()
    } else {
      return middleware(req, res, next)
    }
  }
}

export default skip
