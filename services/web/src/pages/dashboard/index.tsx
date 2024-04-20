import { gql } from '@apollo/client'
import moment from 'moment-timezone'
import { NextPage } from 'next'
import Link from 'next/link'
import client from '../../apollo/client'
import Layout from '../../components/Layout'
import RecentActivityEntry from '../../components/RecentActivityEntry'
import RoundAvatar from '../../components/RoundAvatar'
import { ActivityEntry, GroupPartsFragmentDoc, useRecentActivityQuery } from '../../graphql'
import BaseCache from '../../types/BaseCache'
import { pluralize } from '../../utils/conventions'

const Dashboard: NextPage = () => {
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

  const { data } = useRecentActivityQuery({ fetchPolicy: 'no-cache' })

  return (
    <Layout grayBackground>
      <div className="grid sm:grid-cols-8 gap-5 mt-5">
        <div className="sm:col-span-5 sm:row-end-1 bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex flex-row">
              <RoundAvatar iconType="GROUP" id={group.id} hash={group.discordInfo.icon} size={20} />
              <div className="ml-4 py-2.5 flex flex-col space-y-1">
                <div className="truncate leading-7 font-medium">
                  <h1 className="inline mr-2 text-3xl text-gray-900">{group.discordInfo.name}</h1>
                  <h2 className="block sm:inline text-lg text-gray-500">{group.id}</h2>
                </div>
                <div className="block sm:flex items-center sm:space-x-6 capitalize">
                  <span className="flex items-center text-sm leading-6 text-cool-gray-500 font-medium">
                    <svg className="h-5 w-5 mr-1 text-cool-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Joined {moment(group.createdAt).fromNow()}
                  </span>
                  <span className="flex items-center text-sm leading-6 text-cool-gray-500 font-medium">
                    <svg className="h-5 w-5 mr-1 text-cool-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                    <Link href="/dashboard/settings/admins">
                      <a href="/dashboard/settings/admins">
                        {group.admins.length} Group {pluralize('Admin', group.admins.length)}
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-span-3 sm:row-span-2">
          <div className="mt-2">
            <h2 className="text-center sm:text-left text-lg leading-5 font-semibold">Recent Activity</h2>
          </div>
          <div>
            <ul className="divide-y divide-gray-200">
              {data &&
                data.recentActivity.map((entry: ActivityEntry, i) => <RecentActivityEntry entry={entry} key={i} />)}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
