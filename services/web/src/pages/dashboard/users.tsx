import classNames from 'classnames'
import moment from 'moment-timezone'
import { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import RoundAvatar from '../../components/RoundAvatar'
import TableHead from '../../components/TableHead'
import { useSearchMembersQuery } from '../../graphql'
import buildQuerystring from '../../utils/buildQuerystring'

const DashboardUsers: NextPage = () => {
  const Header: React.FC = () => <PageHeader title="Users" tagline="View and manage your group's users" bottomBorder />

  const { query }: any = useRouter()

  const { data } = useSearchMembersQuery({
    variables: { page: query.p ? Number(query.p) : 0, query: query.q }
  })

  const page = query.p ? Number(query.p) : 0
  const totalPages = data ? Math.ceil(data.searchMembers.totalMembers / data.searchMembers.itemsPerPage) : 0
  const totalMembers = data ? data.searchMembers.totalMembers : 0
  const itemsPerPage = data ? data.searchMembers.itemsPerPage : 0
  const members = data ? data.searchMembers.members : []

  return (
    <Layout title="Users" header={Header} grayBackground>
      <div className="flex flex-col">
        <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {
                  e.preventDefault()
                  if (e.target.value) {
                    Router.push(`/dashboard/users${buildQuerystring({ ...query, q: e.target.value })}`)
                  } else {
                    delete query.q
                    Router.push(`/dashboard/users${buildQuerystring(query)}`)
                  }
                }}
                id="search"
                className={classNames(
                  'block pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500',
                  'focus:outline-none focus:placeholder-gray-400 w-full'
                )}
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
        <div className="-my-2 py-2 mb-10 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 rounded-lg">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <TableHead text="User" />
                  <TableHead text="Joined At" />
                  <TableHead text="Highest Role" />
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50" />
                </tr>
              </thead>
              {members.length > 0 && (
                <tbody className="bg-white">
                  {members.map(({ memberID, avatar, discriminator, username, joinedAt, highestRoleName }, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <RoundAvatar
                            iconType="USER"
                            id={memberID}
                            hash={avatar}
                            discriminator={discriminator}
                            size={10}
                          />
                          <div className="ml-4">
                            <div className="text-sm leading-5 font-medium text-gray-900">{username}</div>
                            <div className="text-sm leading-5 text-gray-500">#{discriminator}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                        {moment(new Date(joinedAt)).format('lll').replace('ago', '')}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                        {highestRoleName || 'n/a'}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            <nav className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
              <div className="hidden sm:block">
                <p className="text-sm leading-5 text-gray-700">
                  Showing <span className="font-medium">{members.length > 0 ? page * itemsPerPage + 1 : 0}</span> to{' '}
                  <span className="font-medium">
                    {members.length === itemsPerPage ? (page + 1) * itemsPerPage : totalMembers}
                  </span>{' '}
                  of <span className="font-medium">{totalMembers}</span> users
                </p>
              </div>
              <div className="flex-1 flex justify-between sm:justify-end">
                <button
                  onClick={() => {
                    if (page === 0) {
                      return
                    } else if (page === 1) {
                      delete query.p
                      Router.push(`/dashboard/users${buildQuerystring(query)}`)
                    } else {
                      Router.push(`/dashboard/users${buildQuerystring({ ...query, p: page - 1 })}`)
                    }
                  }}
                  className={classNames(
                    'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5',
                    'font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue',
                    'focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150',
                    {
                      'cursor-not-allowed opacity-50': !members.length || page === 0
                    }
                  )}
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (page < totalPages - 1) {
                      Router.push(
                        `/dashboard/users${buildQuerystring({
                          ...query,
                          p: page + 1
                        })}`
                      )
                    }
                  }}
                  className={classNames(
                    'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5',
                    'font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue',
                    'focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150',
                    {
                      'cursor-not-allowed opacity-50': !members.length || page === totalPages - 1
                    }
                  )}
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardUsers
