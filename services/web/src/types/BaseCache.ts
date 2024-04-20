import { Group, User } from '../graphql'

interface BaseCache {
  accessToken: string | null
  groupToken: string | null
  user?: User
  group?: Group
}

export default BaseCache
