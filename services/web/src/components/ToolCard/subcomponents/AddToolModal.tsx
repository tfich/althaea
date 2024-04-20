import classNames from 'classnames'
import Link from 'next/link'
import client from '../../../apollo/client'
import { SetSelectedGroupIdDocument, Tool, useAddToolConfigMutation, User } from '../../../graphql'
import { capitalizeFirstLetter } from '../../../utils/conventions'
import Modal from '../../Modal'
import RoundAvatar from '../../RoundAvatar'
import SmallButton from '../../SmallButton'

interface Props {
  isShowing: boolean
  toggle: () => void
  user: User | null
  tool: Tool
}

const AddToolModal: React.FC<Props> = ({ isShowing, toggle, user, tool: { type, id: toolID, addableGroupIDs } }) => {
  const [addToolConfig] = useAddToolConfigMutation({
    variables: { toolID }
  })

  const validGroups = user?.groups.filter(({ groupID }) => addableGroupIDs.includes(groupID)) || []

  return (
    <Modal isShowing={isShowing} hide={toggle}>
      <div className="text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mt-1" id="modal-headline">
          {user ? `Add ${capitalizeFirstLetter(type)} to Group` : 'Login Required'}
        </h3>
        <div className="mt-2">
          <p className="text-sm leading-5 text-gray-500">
            {user
              ? validGroups.length
                ? `Select the group you wish to add this ${type.toLowerCase()} to.`
                : `You do not have any groups to add this ${type.toLowerCase()} to.`
              : `You must be logged in before adding this ${type.toLowerCase()} to a group.`}
          </p>
        </div>
      </div>
      {(!user || validGroups.length === 0) && (
        <div className="mt-4">
          <Link href={!user ? '/login' : '/create'}>
            <span className="flex w-full rounded-md shadow-sm">
              <button
                type="button"
                className={classNames(
                  'inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base',
                  'leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 ',
                  'focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5'
                )}
              >
                {!user ? 'Login' : 'Create Group'}
              </button>
            </span>
          </Link>
        </div>
      )}
      {validGroups.length > 0 && (
        <div className="mt-4">
          {validGroups.map(({ groupID, name, icon, groupToken }, i) => (
            <div key={i}>
              {i > 0 && <div className="border-t border-gray-200" />}
              <div className="my-2.5 flex items-center justify-between">
                <div>
                  <RoundAvatar iconType="GROUP" id={groupID} hash={icon} />
                  <span className="ml-2">{name}</span>
                </div>
                <SmallButton
                  color="indigo"
                  text="Add"
                  onClick={async () => {
                    await addToolConfig({
                      context: {
                        headers: {
                          'X-Group-Token': groupToken
                        }
                      }
                    })
                    await client.mutate({
                      mutation: SetSelectedGroupIdDocument,
                      variables: { selectedGroupID: groupID }
                    })
                    window.location.href = '/dashboard/tools'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}

export default AddToolModal
