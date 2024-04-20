import { gql } from '@apollo/client'
import classNames from 'classnames'
import { NextPage } from 'next'
import Link from 'next/link'
import client from '../apollo/client'
import { UserPartsFragmentDoc } from '../graphql'
import BaseCache from '../types/BaseCache'

const Index: NextPage = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="/images/logo.svg" alt="Logo" />
        <h2 className="mt-4 text-center text-3xl leading-9 font-extrabold text-gray-900">Althaea</h2>
        <p className="mt-2 text-center text-base leading-6 text-gray-600 max-w">
          Our landing page is currrently under construction. You may {user ? 'view the dashboard' : 'sign in'} or browse
          our collection of tools!
        </p>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="pt-5 px-4 sm:px-10">
          <span className="block w-full rounded-md shadow-sm bg-red-600">
            <Link href={user ? '/dashboard' : '/login'}>
              <a
                href={user ? '/dashboard' : '/login'}
                className={classNames(
                  'w-full flex justify-center py-2 px-6 border border-transparent text-sm',
                  'font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500',
                  'focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700'
                )}
              >
                {user ? 'View Dashboard' : 'Sign In'}
              </a>
            </Link>
          </span>
        </div>
        <div className="pt-3 px-4 sm:px-10">
          <span className="block w-full rounded-md shadow-sm">
            <Link href="/tools">
              <a
                href="/tools"
                className={classNames(
                  'w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md',
                  'bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none',
                  'focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out'
                )}
              >
                View Tools Marketplace
              </a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Index
