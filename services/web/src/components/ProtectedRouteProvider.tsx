import { gql } from '@apollo/client'
import { useRouter } from 'next/router'
import client from '../apollo/client'
import { GroupPartsFragmentDoc, UserPartsFragmentDoc } from '../graphql'
import BaseCache from '../types/BaseCache'
import Redirect from './Redirect'

const ProtectedRouteProvider: React.FC = ({ children }) => {
  const { pathname, asPath } = useRouter()

  const { user, group } = client.cache.readQuery<BaseCache>({
    query: gql`
      {
        user {
          ...UserParts
        }
        group {
          ...GroupParts
        }
      }
      ${UserPartsFragmentDoc}
      ${GroupPartsFragmentDoc}
    `
  })

  if (pathname === '/' && user && (!asPath || asPath !== '/home')) {
    return <Redirect href="/dashboard" />
  }

  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      return <Redirect href="/login" />
    }

    if (!group) {
      return <Redirect href="/create" />
    }

    if (!group.botAdded && !pathname.startsWith('/dashboard/bot/')) {
      return <Redirect href="/dashboard/bot/setup" />
    }
  }

  if (pathname === '/create' && !user) {
    return <Redirect href="/login?redirect_url=/create" />
  }

  return <>{children}</>
}

export default ProtectedRouteProvider
