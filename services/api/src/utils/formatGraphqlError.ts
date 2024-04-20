import { ForbiddenError } from 'apollo-server-express'
import { GraphQLError, GraphQLFormattedError } from 'graphql/error'

const formatGraphqlError = (err: GraphQLError): GraphQLFormattedError => {
  // catches errors from authChecker
  if (err.message.startsWith('Access denied!')) {
    return new ForbiddenError('You do not have permission to execute the operation.')
  }
  console.log(err)
  return err
}

export default formatGraphqlError
