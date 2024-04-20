import classNames from 'classnames'
import Link from 'next/link'
import Router from 'next/router'
import client from '../../../apollo/client'
import { SetSelectedGroupIdDocument, User } from '../../../graphql'
import RoundAvatar from '../../RoundAvatar'
import SmallBadge from '../../SmallBadge'

interface Props {
  user: User
  currentGroupID: string
}

const Dropdown: React.FC<Props> = ({ user: { groups }, currentGroupID }) => {
  return (
    <div className="z-50 origin-top-right absolute mt-1 w-56 rounded-md shadow-lg">
      <div className="rounded-md bg-white shadow-xs" role="menu">
        {groups.map(({ groupID, name, isOwner, icon }, i) => (
          <div key={i}>
            <div className="py-1 cursor-pointer">
              <a
                onClick={async (e) => {
                  await client.mutate({
                    mutation: SetSelectedGroupIdDocument,
                    variables: { selectedGroupID: groupID }
                  })
                  Router.reload()
                }}
                className={classNames(
                  'block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                  'focus:outline-none focus:bg-gray-100 focus:text-gray-900 font-medium',
                  { 'bg-gray-100': groupID === currentGroupID }
                )}
              >
                <div className="flex items-center">
                  <RoundAvatar iconType="GROUP" id={groupID} hash={icon} />
                  <span className="ml-2 block">
                    {name}
                    {isOwner && <SmallBadge color="indigo" text="Owner" />}
                  </span>
                </div>
              </a>
            </div>
            <div className="border-t border-gray-100"></div>
          </div>
        ))}
        <div className="py-1 cursor-pointer">
          <Link href="/create">
            <a
              className={classNames(
                'block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                'focus:outline-none focus:bg-gray-100 focus:text-gray-900 font-medium'
              )}
              role="menuitem"
            >
              <div className="flex flex-row items-center justify-between">
                <div>Create Group</div>
                <svg className="h-4 w-4 text-gray-500 hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dropdown
