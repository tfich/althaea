import { AuthChecker } from 'type-graphql'
import Role from '../types/Role'
import ServerContext from '../types/ServerContext'
import roles from './constants/roles'

const authChecker: AuthChecker<ServerContext, Role> = ({ context }, allowedRoles) => {
  return !allowedRoles.length || allowedRoles.some((role) => roles[role](context))
}

export default authChecker
