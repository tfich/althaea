import { ApolloServerPlugin } from 'apollo-server-plugin-base'
import ServerContext from '../types/ServerContext'

const graphqlLogger: ApolloServerPlugin<ServerContext> = {
  requestDidStart({ request }) {
    // console.log('GraphQL Request:', { request })
  }
}

export default graphqlLogger
