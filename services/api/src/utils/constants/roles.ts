import ServerContext from '../../types/ServerContext'

const roles = {
  'group:admin': (ctx: ServerContext) => false
}

export default roles
