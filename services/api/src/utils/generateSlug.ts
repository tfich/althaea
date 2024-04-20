import { v4 as uuidv4 } from 'uuid'

const generateSlug = () => {
  const idSplit = uuidv4().split('-')
  return idSplit[idSplit.length - 1]
}

export default generateSlug
