import { gql } from '@apollo/client'
import classNames from 'classnames'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import client from '../../../apollo/client'
import Layout from '../../../components/Layout'
import MiniToggle from '../../../components/MiniToggle'
import MultiChannelSelect from '../../../components/MultiChannelSelect'
import MultiRoleSelect from '../../../components/MultiRoleSelect'
import SettingsLayout from '../../../components/SettingsLayout'
import SingleChannelSelect from '../../../components/SingleChannelSelect'
import VerticalNavButton from '../../../components/VerticalNavButton'
import {
  GroupPartsFragmentDoc,
  useUpdateDefaultToolConfigMutation,
  useUpdateNotificationSettingsMutation
} from '../../../graphql'
import BaseCache from '../../../types/BaseCache'
import useActionNotif from '../../../utils/hooks/useActionNotif'
import useScreens from '../../../utils/hooks/useScreens'
import isSelected from '../../../utils/isSelected'
import settingsRoutes from '../../../utils/routes/settings'

const Settings: NextPage = () => {
  const screens = useScreens()
  const { asPath, pathname } = useRouter()
  const { setNotification } = useActionNotif()

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

  const [logChannelID, setLogChannelID] = useState<string>(group.logChannelID)
  const [announcementsChannelID, setAnnouncementsChannelID] = useState<string>(group.announcementsChannelID)

  const [defaultChannels, setDefaultChannels] = useState<string[]>(group.defaultChannels)
  const [defaultChannelsAllowed, setDefaultChannelsAllowed] = useState<boolean>(group.defaultChannelsAllowed)
  const [defaultRoles, setDefaultRoles] = useState<string[]>(group.defaultRoles)
  const [defaultRolesAllowed, setDefaultRolesAllowed] = useState<boolean>(group.defaultRolesAllowed)

  const [updateNotificationSettings] = useUpdateNotificationSettingsMutation()
  const [updateDefaultToolConfig] = useUpdateDefaultToolConfigMutation()

  if (!screens.lg && asPath === '/dashboard/settings' && pathname === '/dashboard/settings') {
    return (
      <Layout title="Settings">
        <div className="mt-4">
          {settingsRoutes.map((route) => (
            <VerticalNavButton
              href={route.href}
              asPath={route.asPath}
              name={route.name}
              selected={isSelected(route)}
              key={route.name}
            />
          ))}
        </div>
      </Layout>
    )
  }

  return (
    <SettingsLayout>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await updateNotificationSettings({
              variables: {
                logChannelID,
                announcementsChannelID
              }
            })
            setNotification({
              name: 'Notification settings successfully updated!'
            })
          }}
          className="bg-white shadow px-4 py-5 rounded-lg sm:p-6"
        >
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Notification Setttings</h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                Edit the channels you wish to recieve notifications in
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
              <div className="sm:col-span-7 space-y-1">
                <label id="listbox-label" className="block text-sm leading-5 font-medium text-gray-700">
                  Announements Channel
                </label>
                <p className="text-sm leading-5 text-gray-500">
                  This channel will recieve announcements sent by Althaea
                </p>
                <SingleChannelSelect
                  allChannels={group.channels}
                  selectedChannelID={announcementsChannelID}
                  setSelectedChannelID={setAnnouncementsChannelID}
                />
              </div>
              <div className="sm:col-span-7 space-y-1">
                <label id="listbox-label" className="block text-sm leading-5 font-medium text-gray-700">
                  Log Channel
                </label>
                <p className="text-sm leading-5 text-gray-500">This channel will recieve bot event logs</p>
                <SingleChannelSelect
                  allChannels={group.channels}
                  selectedChannelID={logChannelID}
                  setSelectedChannelID={setLogChannelID}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-5">
            <div className="flex justify-end">
              <span className="ml-3 inline-flex rounded-md shadow-sm">
                <button
                  type="submit"
                  className={classNames(
                    'inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md',
                    'text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo',
                    'active:bg-indigo-700 transition duration-150 ease-in-out'
                  )}
                >
                  Save
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
      <div className="my-6">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await updateDefaultToolConfig({
              variables: {
                defaultToolConfig: {
                  defaultChannels,
                  defaultChannelsAllowed,
                  defaultRoles,
                  defaultRolesAllowed
                }
              }
            })
            setNotification({
              name: 'Default command settings successfully updated!'
            })
          }}
          className="bg-white shadow px-4 py-5 rounded-lg sm:p-6"
        >
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Default Command Setttings</h3>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                Edit the channels and roles commands are enabled in by default
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
              <div className="sm:col-span-7 space-y-1">
                <label id="listbox-label" className="block text-sm leading-5 font-medium text-gray-700">
                  Channels
                </label>
                <div className="flex items-center justify-between">
                  <p className="text-sm leading-5 text-gray-500">
                    Commands are {defaultChannelsAllowed ? 'enabled' : 'disabled'} in the following channels
                  </p>
                  <MiniToggle isOpen={defaultChannelsAllowed} setIsOpen={setDefaultChannelsAllowed} />
                </div>
                <MultiChannelSelect
                  allChannels={group.channels}
                  selectedChannelIDs={defaultChannels}
                  setSelectedChannelIDs={setDefaultChannels}
                />
              </div>
              <div className="sm:col-span-7 space-y-1">
                <label id="listbox-label" className="block text-sm leading-5 font-medium text-gray-700">
                  Roles
                </label>
                <div className="flex items-center justify-between">
                  <p className="text-sm leading-5 text-gray-500">
                    Commands are {defaultRolesAllowed ? 'accessible' : 'inaccessible'} to users with the following roles
                  </p>
                  <MiniToggle isOpen={defaultRolesAllowed} setIsOpen={setDefaultRolesAllowed} />
                </div>
                <MultiRoleSelect
                  allRoles={group.roles}
                  selectedRoleIDs={defaultRoles}
                  setSelectedRoleIDs={setDefaultRoles}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-5">
            <div className="flex items-center justify-between">
              <div className="group inline-flex items-center text-gray-500">
                <svg className="h-4 w-auto mr-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm text-left">Changes made will only affect new commands added</span>
              </div>
              <button
                type="submit"
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
        </form>
      </div>
    </SettingsLayout>
  )
}

export default Settings
