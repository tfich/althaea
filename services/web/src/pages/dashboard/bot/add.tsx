import { gql } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import client from '../../../apollo/client'
import Redirect from '../../../components/Redirect'
import { GroupPartsFragmentDoc, useBotUrlQuery } from '../../../graphql'
import BaseCache from '../../../types/BaseCache'

const DashboardBotAdd: NextPage = () => {
  const { query }: any = useRouter()

  const { group } = client.cache.readQuery<BaseCache>({
    query: gql`
      {
        group {
          ...GroupParts
        }
      }
      ${GroupPartsFragmentDoc}
    `
  })

  if (group.botAdded) {
    return <Redirect href={'/dashboard/bot'} />
  }

  const { data, loading } = useBotUrlQuery({
    variables: {
      clientID: query.client_id,
      redirectUrl: query.redirect_url || '/dashboard/bot'
    }
  })

  if (!data || loading) {
    return null
  }

  return <Redirect href={data.botUrl} external />
}

export default DashboardBotAdd
