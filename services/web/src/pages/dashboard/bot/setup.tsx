import { gql } from '@apollo/client'
import { NextPage } from 'next'
import client from '../../../apollo/client'
import CustomBotSetup from '../../../components/CustomBotSetup'
import Layout from '../../../components/Layout'
import MainBotSetup from '../../../components/MainBotSetup'
import Redirect from '../../../components/Redirect'
import { GroupPartsFragmentDoc } from '../../../graphql'
import BaseCache from '../../../types/BaseCache'

const DashboardBotSetup: NextPage = () => {
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

  const { botAdded, botPlan } = group

  if (!botAdded && botPlan.customBot) {
    return (
      <Layout title="Bot" isDashboard={false}>
        <CustomBotSetup />
      </Layout>
    )
  }

  if (!botAdded && !botPlan.customBot) {
    return (
      <Layout title="Bot" grayBackground isDashboard={false}>
        <MainBotSetup />
      </Layout>
    )
  }

  return <Redirect href={'/dashboard/bot'} />
}

export default DashboardBotSetup
