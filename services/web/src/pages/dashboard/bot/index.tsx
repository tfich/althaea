import { gql } from '@apollo/client'
import classNames from 'classnames'
import { NextPage } from 'next'
import { useState } from 'react'
import client from '../../../apollo/client'
import Layout from '../../../components/Layout'
import MiniToggle from '../../../components/MiniToggle'
import RoundAvatar from '../../../components/RoundAvatar'
import { GroupPartsFragmentDoc, StatusType, useUpdateBotMutation } from '../../../graphql'
import BaseCache from '../../../types/BaseCache'
import useActionNotif from '../../../utils/hooks/useActionNotif'

const DashboardBot: NextPage = () => {
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

  const { setNotification } = useActionNotif()

  const [botEnabled, setBotEnabled] = useState(group.botEnabled)
  const [commandPrefix, setCommandPrefix] = useState(group.commandPrefix)
  const [botStatusType, setBotStatusType] = useState(group.botStatusType)
  const [botStatus, setBotStatus] = useState(group.botStatus)
  const [embedColor, setEmbedColor] = useState(group.embedColor)
  const [embedFooter, setEmbedFooter] = useState(group.embedFooter)

  const [updateBot] = useUpdateBotMutation({
    variables: {
      botConfig: {
        botEnabled,
        commandPrefix,
        botStatusType,
        botStatus,
        embedColor,
        embedFooter
      }
    }
  })

  const { botUser } = group

  return (
    <Layout title="Bot" grayBackground>
      <div className="mt-5">
        <div className="md:grid md:grid-cols-5 md:gap-6">
          <div className="md:col-span-2 flex items-center h-36 bg-white shadow rounded-md">
            <div className="p-3 flex justify-start items-center">
              <div className="w-1/3">
                <span className="inline-block relative">
                  <RoundAvatar
                    iconType="USER"
                    id={botUser.id}
                    hash={botUser.avatar}
                    discriminator={botUser.discriminator}
                    size={24}
                  />
                  <span
                    className={classNames(
                      'absolute bottom-0 right-0 block h-5 w-5 rounded-full text-white shadow-solid',
                      {
                        'bg-green-400': !group.botPlan.customBot || group.botEnabled,
                        'bg-red-500': group.botPlan.customBot && !group.botEnabled
                      }
                    )}
                  ></span>
                </span>
              </div>
              <div className="ml-4 w-2/3">
                <div className="truncate text-2xl leading-6 font-medium text-gray-900">{botUser.username}</div>
                <div className="-mt-0.5 text-base truncate text-gray-800">#{botUser.discriminator}</div>
                <div className="text-base truncate text-gray-400">{botUser.id}</div>
              </div>
            </div>
          </div>
          <div className="my-5 md:mt-0 md:col-span-3">
            <form>
              <div className="shadow overflow-hidden rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Bot Settings</h3>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Manage and customize everything about your bot here.
                    </p>
                  </div>
                  <div className="mt-5">
                    <div className="mt-5">
                      <label id="listbox-label" className="block text-sm leading-5 font-medium text-gray-700">
                        Bot Enabled
                      </label>
                      <div className="flex items-center mt-1.5">
                        <MiniToggle isOpen={botEnabled} setIsOpen={setBotEnabled} />
                        <p className="ml-2 text-sm leading-5 text-gray-500">
                          {group.botPlan.customBot
                            ? `Your bot will remain ${botEnabled ? 'online' : 'offline'}.`
                            : `The bot is ${botEnabled ? 'enabled' : 'not enabled'} in your server.`}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5">
                      <label className="block text-sm font-medium leading-5 text-gray-700">Command Prefix</label>
                      <div className="mt-1.5 relative rounded-md shadow-sm w-16">
                        <input
                          onChange={(e) => {
                            e.preventDefault()
                            setCommandPrefix(e.target.value)
                          }}
                          maxLength={3}
                          className="form-input block w-full sm:text-sm sm:leading-5"
                          defaultValue={commandPrefix}
                        />
                      </div>
                    </div>
                    {group.botPlan.customBot && (
                      <div>
                        <div className="mt-5">
                          <label className="block text-sm font-medium leading-5 text-gray-700">Bot Status</label>
                          <div className="mt-1.5 flex items-center rounded-md shadow-sm">
                            <div className="w-36 bg-gray-50 text-gray-500">
                              <select
                                onChange={(e) => {
                                  e.preventDefault()
                                  setBotStatusType(StatusType[e.target.value])
                                }}
                                defaultValue={(botStatusType || StatusType.Playing).toString()}
                                className="form-select pr-4 relative block w-full rounded-md rounded-r-none bg-transparent focus:z-10 sm:text-sm sm:leading-5"
                              >
                                {Object.keys(StatusType).map((s, i) => (
                                  <option key={i}>{s.toString()}</option>
                                ))}
                              </select>
                            </div>
                            <div className="w-full">
                              <input
                                onChange={(e) => {
                                  e.preventDefault()
                                  setBotStatus(e.target.value)
                                }}
                                maxLength={50}
                                className="form-input block w-full rounded-md rounded-l-none border-l-0 sm:text-sm sm:leading-5"
                                defaultValue={botStatus}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-5">
                          <label className="block text-sm font-medium leading-5 text-gray-700">Embed Color</label>
                          <div className="mt-1.5">
                            <div className="flex items-center">
                              <span
                                className="h-9 w-9 rounded-md border border-gray-300"
                                style={{ background: `#${embedColor}` }}
                              />
                              <span className="ml-3 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                  #
                                </span>
                                <input
                                  onChange={(e) => {
                                    e.preventDefault()
                                    setEmbedColor(e.target.value)
                                  }}
                                  className="form-input flex-1 block w-20 px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                                  placeholder="ff0000"
                                  defaultValue={embedColor}
                                  maxLength={6}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-5">
                          <label className="block text-sm font-medium leading-5 text-gray-700">Embed Footer</label>
                          <div className="mt-1.5 relative rounded-md shadow-sm w-full">
                            <input
                              onChange={(e) => {
                                e.preventDefault()
                                setEmbedFooter(e.target.value)
                              }}
                              maxLength={50}
                              className="form-input block w-full sm:text-sm sm:leading-5"
                              defaultValue={embedFooter}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="group inline-flex items-center text-gray-500">
                      <svg className="h-4 w-auto mr-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-sm text-left">Changes may take up to 30 seconds to take effect</span>
                    </div>
                    <button
                      onClick={async () => {
                        await updateBot()
                        setNotification({
                          name: 'Bot settings successfully updated!'
                        })
                      }}
                      type="button"
                      className={classNames(
                        'inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md',
                        'text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo',
                        'active:bg-indigo-700 transition duration-150 ease-in-out'
                      )}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardBot
