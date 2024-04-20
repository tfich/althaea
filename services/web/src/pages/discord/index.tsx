import { NextPage } from 'next'
import Redirect from '../../components/Redirect'
import { useSupportServerInviteQuery } from '../../graphql'

const Discord: NextPage = ({}) => {
  const { data } = useSupportServerInviteQuery()

  if (!data) {
    return null
  }

  return <Redirect href={data.supportServerInvite} external />
}

export default Discord
