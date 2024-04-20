import { gql } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { UserGroupPartsFragmentDoc } from '../graphql'
import BaseCache from '../types/BaseCache'

const authLink = setContext((_, { headers, cache }) => {
  const { accessToken, groupToken }: BaseCache = cache.readQuery({
    query: gql`
      {
        accessToken
        groupToken
      }
      ${UserGroupPartsFragmentDoc}
    `
  })

  return {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
      'X-Group-Token': groupToken || '',
      'X-Client-ID': 'WEB',
      ...headers
    }
  }
})

export default authLink
