import { encode32 } from 'encode32'
import { v4 as uuidv4 } from 'uuid'

const generateKey = () => {
  const uuid = uuidv4().replace(/-/g, '')
  return [
    encode32(Number(`0x${uuid.substr(0, 8)}`)),
    encode32(Number(`0x${uuid.substr(8, 8)}`)),
    encode32(Number(`0x${uuid.substr(16, 8)}`)),
    encode32(Number(`0x${uuid.substr(24, 8)}`))
  ].join('-')
}

export default generateKey
