import { Authorized } from 'type-graphql'
import Role from '../types/Role'

const Allow = (...allowedRoles: Role[]) => Authorized<Role>(allowedRoles)

export default Allow
