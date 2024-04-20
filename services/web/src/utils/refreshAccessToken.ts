import { gql } from '@apollo/client'
import client from '../apollo/client'
import { Mutation, RefreshAccessTokenDocument } from '../graphql'

const refreshAccessToken = async () => {
  const {
    data: { refreshAccessToken: accessToken }
  } = await client.mutate<Mutation>({
    mutation: RefreshAccessTokenDocument,
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        Authorization: ''
      }
    }
  })

  client.cache.writeQuery({
    query: gql`
      {
        accessToken
      }
    `,
    data: { accessToken }
  })
}

export default refreshAccessToken
