import { onError } from '@apollo/client/link/error'
import refreshAccessToken from '../utils/refreshAccessToken'
import signout from '../utils/signout'

const errorHandler = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const gqlError of graphQLErrors) {
      switch (gqlError.extensions?.code) {
        case 'UNAUTHENTICATED': {
          signout()
        }
        case 'INVALID_ACCESS_TOKEN': {
          refreshAccessToken()
          forward(operation) // retries request
        }
        default: {
        }
      }
    }
  }
  if (networkError) {
    console.log(networkError)
  }
})

export default errorHandler
