import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import fetch from 'isomorphic-unfetch'
import env from './env'

const httpLink = new HttpLink({
  uri: `${env.API_BASE_URL}/graphql`,
  credentials: 'include',
  fetch
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: { 'X-Client-ID': 'JOBS', ...headers }
  }
})

const apolloClient = new ApolloClient({
  ssrMode: true,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
})

export default apolloClient
