import jsonwebtoken from 'jsonwebtoken'
import env from '../env'

const create = <Payload>(payload: Payload, expiresIn: number | string | undefined) => {
  return jsonwebtoken.sign(payload as any, env.JWT_SECRET, { expiresIn })
}

const verify = <Payload>(token: string) => {
  try {
    return jsonwebtoken.verify(token, env.JWT_SECRET) as Payload & { iat: number; exp: number }
  } catch (err) {
    return undefined
  }
}

const decode = <Payload>(token: string) => {
  try {
    return jsonwebtoken.decode(token) as Payload
  } catch (err) {
    return undefined
  }
}

export default { create, verify, decode }
