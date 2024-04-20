import classNames from 'classnames'
import { useState } from 'react'
import { Group, GroupToolConfig, useUpdateToolConfigMutation } from '../graphql'
import useActionNotif from '../utils/hooks/useActionNotif'
import MiniToggle from './MiniToggle'
import MultiChannelSelect from './MultiChannelSelect'
import MultiRoleSelect from './MultiRoleSelect'

interface Props {
  group: Group
  toolConfig: GroupToolConfig
}

const CommandSettings: React.FC<Props> = ({
  group,
  toolConfig: { toolID, channelsAllowed, channels, rolesAllowed, roles }
}) => {
  const groupIDs = group.channels.map(({ id }) => id)
  const [selectedChannelIDs, setSelectedChannelIDs] = useState(channels.filter((c) => groupIDs.includes(c)))
  const [isChannelsAllowed, setIsChannelsAllowed] = useState(channelsAllowed)
  const { setNotification } = useActionNotif()

  const roleIDs = group.roles.map(({ id }) => id)
  const [selectedRoleIDs, setSelectedRoleIDs] = useState(roles.filter((r) => roleIDs.includes(r)))
  const [isRolesAllowed, setIsRolesAllowed] = useState(rolesAllowed)

  const isSubmitable =
    selectedChannelIDs !== channels ||
    isChannelsAllowed !== channelsAllowed ||
    selectedRoleIDs !== roles ||
    isRolesAllowed !== rolesAllowed

  const [udpateToolConfig] = useUpdateToolConfigMutation()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await udpateToolConfig({
          variables: {
            toolID,
            toolConfig: {
              channels: selectedChannelIDs,
              channelsAllowed: isChannelsAllowed,
              roles: selectedRoleIDs,
              rolesAllowed: isRolesAllowed
            }
          }
        })
        setNotification({
          name: 'Command settings successfully updated!'
        })
      }}
      className="bg-white shadow px-4 py-5 rounded-lg sm:p-6"
    >
      <div>
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Command Setttings</h3>
          <p className="mt-1 text-sm leading-5 text-gray-500">Edit the channels and roles this command is enabled in</p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
          <div className="sm:col-span-7 space-y-1">
            <label id="listbox-label" className="block text-sm leading-5 font-medium text-gray-700">
              Channels
            </label>
            <div className="flex items-center justify-between">
              <p className="text-sm leading-5 text-gray-500">
                This command is {isChannelsAllowed ? 'enabled' : 'disabled'} in the following channels
              </p>
              <MiniToggle isOpen={isChannelsAllowed} setIsOpen={setIsChannelsAllowed} />
            </div>
            <MultiChannelSelect
              allChannels={group.channels}
              selectedChannelIDs={selectedChannelIDs}
              setSelectedChannelIDs={setSelectedChannelIDs}
            />
          </div>
          <div className="sm:col-span-7 space-y-1">
            <label id="listbox-label" className="block text-sm leading-5 font-medium text-gray-700">
              Roles
            </label>
            <div className="flex items-center justify-between">
              <p className="text-sm leading-5 text-gray-500">
                This command is {isRolesAllowed ? 'accessible' : 'inaccessible'} to users with the following roles
              </p>
              <MiniToggle isOpen={isRolesAllowed} setIsOpen={setIsRolesAllowed} />
            </div>
            <MultiRoleSelect
              allRoles={group.roles}
              selectedRoleIDs={selectedRoleIDs}
              setSelectedRoleIDs={setSelectedRoleIDs}
            />
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 pt-5">
        <div className="flex justify-end">
          <span className="ml-3 inline-flex rounded-md shadow-sm">
            <button
              disabled={!isSubmitable}
              type="submit"
              className={classNames(
                'inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out',
                {
                  'opacity-75 cursor-not-allowed': !isSubmitable
                }
              )}
            >
              Save
            </button>
          </span>
        </div>
      </div>
    </form>
  )
}

export default CommandSettings
