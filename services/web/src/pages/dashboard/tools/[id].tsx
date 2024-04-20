import { gql } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import client from '../../../apollo/client'
import CommandSettings from '../../../components/CommandSettings'
import Layout from '../../../components/Layout'
import PageHeader from '../../../components/PageHeader'
import Redirect from '../../../components/Redirect'
import ToolRemove from '../../../components/ToolRemove'
import { GroupPartsFragmentDoc, ToolType } from '../../../graphql'
import BaseCache from '../../../types/BaseCache'

const DashboardToolsConfig: NextPage = () => {
  const { query } = useRouter()

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

  const toolConfig = group.toolConfigs.filter(({ toolID }) => toolID === query.id)[0]

  if (!toolConfig) {
    return <Redirect href="/dashboard/tools" />
  }

  const Header: React.FC = () => (
    <PageHeader
      title={toolConfig.tool.name}
      tagline={toolConfig.tool.description}
      // backButtonName="Tools"
      bottomBorder
    />
  )

  return (
    <Layout title="Tools" header={Header} grayBackground>
      <div className="mt-5">
        {toolConfig.tool.type === ToolType.Command && <CommandSettings group={group} toolConfig={toolConfig} />}
      </div>
      <div className="mt-5">
        <ToolRemove toolID={toolConfig.toolID} />
      </div>
    </Layout>
  )
}

export default DashboardToolsConfig
