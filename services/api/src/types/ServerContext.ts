import { Group } from '../entities/Group'
import { User } from '../entities/User'
import BaseContext from './BaseContext'
import Client from './Client'

interface ServerContext extends BaseContext {
  client?: Client
  user?: User
  group?: Group
}

export default ServerContext
