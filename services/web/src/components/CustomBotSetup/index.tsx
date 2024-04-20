import classNames from 'classnames'
import Router from 'next/router'
import { useState } from 'react'
import { useSetupBotMutation } from '../../graphql'
import env from '../../utils/env'
import useActionNotif from '../../utils/hooks/useActionNotif'
import InputField from './subcomponents/InputField'

interface Props {}

const CustomBotSetup: React.FC<Props> = () => {
  const [clientID, setClientID] = useState<string>(null)
  const [clientSecret, setClientSecret] = useState<string>(null)
  const [token, setToken] = useState<string>(null)
  const { setNotification } = useActionNotif()

  const canProceed =
    clientID &&
    clientID.length > 15 &&
    /^\d+$/.test(clientID) &&
    clientSecret &&
    clientSecret.length > 25 &&
    token &&
    token.includes('.')

  const [setupBot] = useSetupBotMutation()

  return (
    <div className="mt-5">
      <div className="md:grid md:grid-cols-3 md:col-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Setup your custom bot</h3>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            Before getting started with Althaea you must configure your bot.
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form>
            <legend className="text-base leading-6 font-medium text-gray-900">Step 1</legend>
            <p className="pb-3 text-sm leading-5 text-gray-500">
              Create a bot on the
              <a
                target="_blank"
                rel="noreferrer"
                href="https://discordapp.com/developers/applications"
                className="mx-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
              >
                Discord Developer Portal
              </a>
              and input the tokens below.
            </p>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <InputField label="Client ID" setInput={setClientID} />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputField label="Client Secret" setInput={setClientSecret} />
              </div>
              <div className="col-span-6 sm:col-span-5">
                <InputField label="Bot Token" setInput={setToken} />
              </div>
            </div>
            <legend className="pt-6 text-base leading-6 font-medium text-gray-900">Step 2</legend>
            <p className="pb-3 text-sm leading-5 text-gray-500">
              Copy and paste the following callback url into the bot&apos;s list of redirects.
            </p>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4 flex">
                <input
                  disabled
                  placeholder={`${env.API_BASE_URL}/oauth/discord/callback`}
                  className="form-input block w-full py-2 px-3 border rounded-r-none text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                />
                <div
                  onClick={() => {
                    const el = document.createElement('textarea')
                    el.value = `${env.API_BASE_URL}/oauth/discord/callback`
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
            <legend className="pt-6 text-base leading-6 font-medium text-gray-900">Step 3</legend>
            <p className="pb-3 text-sm leading-5 text-gray-500">
              Add the bot to your server if it&apos;s not already added. Your bot must have Admin permissions.
            </p>
            <span className="inline-flex rounded-md shadow-sm">
              <a
                href={canProceed ? `/dashboard/bot/add?client_id=${clientID}&redirect_url=/success` : '#'}
                target={canProceed ? '_blank' : ''}
                rel="noreferrer"
                type="button"
                className={classNames(
                  'inline-flex items-center px-12 py-2 border border-gray-300 text-sm leading-4 font-medium',
                  'rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300',
                  'focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150',
                  {
                    'cursor-not-allowed opacity-50': !canProceed
                  }
                )}
              >
                Add Bot
              </a>
            </span>
            <div className="mt-8 border-t border-gray-200 pt-5">
              <div className="flex justify-end">
                <span className="ml-3 inline-flex rounded-md shadow-sm">
                  <button
                    disabled={!canProceed}
                    onClick={async () => {
                      await setupBot({ variables: { clientID, clientSecret, token } })
                      Router.reload()
                    }}
                    type="submit"
                    className={classNames(
                      'inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md',
                      'text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo',
                      'active:bg-indigo-700 transition duration-150 ease-in-out',
                      {
                        'opacity-50 cursor-not-allowed': !canProceed
                      }
                    )}
                  >
                    Save
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CustomBotSetup
