import { gql } from '@apollo/client'
import { NextPage } from 'next'
import client from '../../../apollo/client'
import SettingsLayout from '../../../components/SettingsLayout'
import { GroupPartsFragmentDoc } from '../../../graphql'
import BaseCache from '../../../types/BaseCache'

const SettingsDevelopers: NextPage = () => {
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

  return (
    <SettingsLayout>
      <div>
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Althaea Public API</h3>
            <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
              <p>
                Use our public API to interact with your bot, users and settings. Below you will find your API Key to
                use as authentication.
              </p>
            </div>
            <div className="mt-3 text-sm leading-5">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150"
              >
                Read the docs &rarr;
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">API Key</h3>
            <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
              <p>This key gives you access to our public REST API.</p>
            </div>
            <div className="mt-5 flex w-full sm:w-1/2">
              <input
                disabled
                // placeholder={'•••••••••••'}
                placeholder={group.apiKey}
                className="form-input block w-full py-2 px-3 border rounded-r-none text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              />
              <div
                onClick={() => {
                  const el = document.createElement('textarea')
                  el.value = group.apiKey
                  document.body.appendChild(el)
                  el.select()
                  document.execCommand('copy')
                  document.body.removeChild(el)
                }}
                className="inline-flex cursor-pointer items-center py-2 px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  )
}

export default SettingsDevelopers
