import { gql } from '@apollo/client'
import { NextPage } from 'next'
import client from '../apollo/client'
import Redirect from '../components/Redirect'
import { OauthUrlDocument, Query, UserPartsFragmentDoc } from '../graphql'
import BaseCache from '../types/BaseCache'

interface Props {
  oauthUrl: string
}

const Login: NextPage<Props> = ({ oauthUrl }) => {
  const { user } = client.cache.readQuery<BaseCache>({
    query: gql`
      {
        user {
          ...UserParts
        }
      }
      ${UserPartsFragmentDoc}
    `
  })

  if (user) {
    return <Redirect href="/dashboard" />
  }

  return <Redirect href={oauthUrl} external />
}

Login.getInitialProps = async ({ query }) => {
  const {
    data: { oauthUrl }
  } = await client.query<Query>({
    query: OauthUrlDocument,
    variables: {
      redirectUrl: query.redirect_url
    }
  })

  return { oauthUrl }
}

export default Login
