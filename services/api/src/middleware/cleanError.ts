import { Request, Response } from 'express'

const cleanError = (error: Error, req: Request, res: Response) => {
  res.status(500)
  return res.json({ name: error.name, message: error.message })
}

export default cleanError
