import { gql } from '@apollo/client'
import client from '../apollo/client'
import { GroupDocument, Query, User, UserDocument } from '../graphql'
import refreshAccessToken from './refreshAccessToken'

const getGroupToken = (user: User | null): string | null => {
  if (!user || !user.groups[0]) {
    return null
  }
  if (!user.selectedGroupID) {
    return user.groups[0].groupToken
  }
  const selectGroup = user.groups.find(({ groupID }) => groupID === user.selectedGroupID)
  return selectGroup ? selectGroup.groupToken : null
}

const loadEntities = async () => {
  await refreshAccessToken()

  const {
    data: { user }
  } = await client.query<Query>({
    query: UserDocument,
    fetchPolicy: 'cache-first'
  })

  client.cache.writeQuery({
    query: gql`
      {
        groupToken
      }
    `,
    data: { groupToken: getGroupToken(user) }
  })

  const {
    data: { group }
  } = await client.query<Query>({
    query: GroupDocument,
    fetchPolicy: 'cache-first'
  })

  return { user, group }
}

export default loadEntities
