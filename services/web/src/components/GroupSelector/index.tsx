import classNames from 'classnames'
import { Group, User } from '../../graphql'
import useIsOpen from '../../utils/hooks/useIsOpen'
import RoundAvatar from '../RoundAvatar'
import Dropdown from './subcomponents/Dropdown'

interface Props {
  user: User
  group: Group
}

const GroupSelector: React.FC<Props> = ({ user, group }) => {
  const { node, isOpen, setIsOpen } = useIsOpen()

  return (
    <div ref={node} className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            type="button"
            className={classNames(
              'inline-flex items-center w-full rounded py-2 bg-white text-sm',
              'leading-5 font-medium text-gray-700 focus:outline-none'
            )}
          >
            <RoundAvatar iconType="GROUP" id={group.id} hash={group.discordInfo.icon} />
            <div className="mx-3 text-sm tracking-wide">{group.discordInfo.name}</div>
            <svg
              className="-ml-1 h-5 w-5 text-gray-600 hover:text-gray-900 active:text-gray-900"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </span>
      </div>
      {isOpen && <Dropdown user={user} currentGroupID={group.id} />}
    </div>
  )
}

export default GroupSelector
