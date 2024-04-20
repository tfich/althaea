import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-unfetch'
import BaseCache from '../types/BaseCache'
import env from '../utils/env'
import authLink from './authLink'
import defaultState from './defaultState'
import errorHandler from './errorHandler'

const httpLink = new HttpLink({
  uri: `${env.API_BASE_URL}/graphql`,
  credentials: 'include',
  fetch
})

const cache = new InMemoryCache({ addTypename: true }).restore({})

const client = new ApolloClient<BaseCache>({
  link: authLink.concat(errorHandler).concat(httpLink),
  cache: cache as any
})

cache.writeQuery({
  query: gql`
    {
      accessToken
      groupToken
    }
  `,
  data: defaultState
})

client.onResetStore(async () => {
  cache.writeQuery({
    query: gql`
      {
        accessToken
        groupToken
      }
    `,
    data: defaultState
  })
})

export default client
