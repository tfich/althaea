import { gql } from '@apollo/client'
import classNames from 'classnames'
import { NextPage } from 'next'
import { useState } from 'react'
import client from '../../../apollo/client'
import ConfirmationModal from '../../../components/ConfirmationModal'
import Modal from '../../../components/Modal'
import RoundAvatar from '../../../components/RoundAvatar'
import SettingsLayout from '../../../components/SettingsLayout'
import SmallButton from '../../../components/SmallButton'
import TableHead from '../../../components/TableHead'
import {
  GroupPartsFragmentDoc,
  useAddGroupAdminMutation,
  useRemoveGroupAdminMutation,
  UserPartsFragmentDoc,
  useSearchMembersLazyQuery
} from '../../../graphql'
import BaseCache from '../../../types/BaseCache'
import useActionNotif from '../../../utils/hooks/useActionNotif'
import useModal from '../../../utils/hooks/useModal'

// TODO: add a table column for admin added at date

const SettingsGroupAdmins: NextPage = () => {
  const {
    user: { id: loggedInUserID },
    group
  } = client.cache.readQuery<BaseCache>({
    query: gql`
      {
        user {
          ...UserParts
        }
        group {
          ...GroupParts
        }
      }
      ${UserPartsFragmentDoc}
      ${GroupPartsFragmentDoc}
    `
  })

  const [selectedUserID, setSelectedUserID] = useState<string>(null)
  const { setNotification } = useActionNotif()

  const { isShowing: isAddAdminModalShowing, toggle: addAdminModalToggle } = useModal()
  const { isShowing: isRemoveConfirmationShowing, toggle: removeModalToggle } = useModal()

  const [removeGroupAdmin] = useRemoveGroupAdminMutation()
  const [addGroupAdmin] = useAddGroupAdminMutation()

  const [searchMembers, { data: searchData, loading: searchLoading }] = useSearchMembersLazyQuery()

  const currentGroupAdminIDs = group.admins.map(({ userID }) => userID)
  const validAdmins = searchData
    ? searchData.searchMembers.members.filter(({ memberID }) => !currentGroupAdminIDs.includes(memberID))
    : []

  return (
    <SettingsLayout>
      <div>
        <Modal isShowing={isAddAdminModalShowing} hide={addAdminModalToggle}>
          <h3 className="text-lg text-center leading-6 font-medium text-gray-900" id="modal-headline">
            Add Group Admin
          </h3>
          <div className="mt-4 inline-block w-full rounded-md shadow-sm">
            <input
              onChange={(e) => {
                e.preventDefault()
                searchMembers({
                  variables: {
                    query: e.target.value || 'null.search',
                    limit: 7
                  }
                })
              }}
              className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              placeholder="Search for a user"
            />
          </div>
          {validAdmins.length > 0 && (
            <div className="max-h-60 mt-4 text-base leading-6 overflow-auto focus:outline-none sm:text-sm sm:leading-5">
              {validAdmins.map(({ memberID, avatar, username, discriminator }, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-gray-900 py-2 px-3 text-justify"
                  onClick={(e) => {
                    e.preventDefault()
                    if (selectedUserID === memberID) {
                      setSelectedUserID(null)
                    } else {
                      setSelectedUserID(memberID)
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <RoundAvatar iconType="USER" id={memberID} hash={avatar} size={6} />
                    <span className="font-normal block truncate">
                      {username}#{discriminator}
                    </span>
                  </div>
                  <span>
                    <SmallButton
                      color="indigo"
                      text="Add"
                      onClick={async () => {
                        await addGroupAdmin({ variables: { userID: memberID } })
                        addAdminModalToggle()
                        setNotification({
                          name: 'Group admin successfully added!',
                          description: 'They have been notified via Discord with instructions on how to join.'
                        })
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>
          )}
          {validAdmins.length === 0 && (
            <div className="mt-4">
              <p className="text-sm text-center leading-5 text-gray-500">0 Search Results</p>
            </div>
          )}
        </Modal>
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Group Admins</h3>
                <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                  <p>Group admins have full access to the dashboard. However, they cannot invite other admins.</p>
                </div>
              </div>
              <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    onClick={addAdminModalToggle}
                    type="button"
                    className={classNames(
                      'inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md',
                      'text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo',
                      'active:bg-indigo-700 transition ease-in-out duration-150'
                    )}
                  >
                    Add Admin
                  </button>
                </span>
              </div>
            </div>
            <div className="mt-5 align-middle inline-block min-w-full border border-gray-200 overflow-hidden rounded-lg">
              <table className="min-w-full">
                <thead className="border-b border-gray-200">
                  <tr className="bg-gray-50">
                    <TableHead text="User" />
                    <TableHead text="Role" />
                    <th className="px-6 py-3 border-b border-gray-200" />
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {group.admins.map(({ userID, discordInfo, isOwner }, i) => (
                    <tr key={i}>
                      <td
                        className={classNames('px-6 py-4 whitespace-no-wrap border-b border-gray-200', {
                          'border-none': i === group.admins.length - 1
                        })}
                      >
                        <div className="flex items-center">
                          <RoundAvatar
                            iconType="USER"
                            id={userID}
                            hash={discordInfo.avatar}
                            discriminator={discordInfo.discriminator}
                            size={10}
                          />
                          <div className="ml-4">
                            <div className="text-sm leading-5 font-medium text-gray-900">{discordInfo.username}</div>
                            <div className="text-sm leading-5 text-gray-500">#{discordInfo.discriminator}</div>
                          </div>
                        </div>
                      </td>
                      <td
                        className={classNames(
                          'px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500',
                          { 'border-none': i === group.admins.length - 1 }
                        )}
                      >
                        {isOwner ? 'Owner' : 'Admin'}
                      </td>
                      <td
                        className={classNames(
                          'px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium',
                          { 'border-none': i === group.admins.length - 1 }
                        )}
                      >
                        <ConfirmationModal
                          isShowing={isRemoveConfirmationShowing}
                          toggle={removeModalToggle}
                          onConfirmation={async () => {
                            await removeGroupAdmin({ variables: { userID } })
                            setNotification({
                              name: 'Group admin successfully removed!',
                              description: 'They will no longer have access to this dashboard.'
                            })
                          }}
                          title="Are you sure you want to remove this admin?"
                        />
                        <button
                          onClick={removeModalToggle}
                          disabled={isOwner || userID === loggedInUserID}
                          type="button"
                          className={classNames('text-red-600 font-medium', {
                            'opacity-50 cursor-not-allowed': isOwner || userID === loggedInUserID,
                            'hover:text-red-900': !isOwner && userID !== loggedInUserID
                          })}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  )
}

export default SettingsGroupAdmins
