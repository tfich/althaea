import classNames from 'classnames'
import { User } from '../../../graphql'
import useIsOpen from '../../../utils/hooks/useIsOpen'
import RoundAvatar from '../../RoundAvatar'
import ProfileDropdown from './ProfileDropdown'

interface Props {
  user: User
}

const Profile: React.FC<Props> = ({ user }) => {
  const { node, isOpen, setIsOpen } = useIsOpen()

  const userInfo = user.discordInfo

  return (
    <div ref={node} className="ml-3 relative">
      <div>
        <button
          className={classNames(
            'flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300',
            'transition duration-150 ease-in-out'
          )}
          id="user-menu"
          aria-label="User menu"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <RoundAvatar iconType="USER" id={user.id} hash={userInfo.avatar} discriminator={userInfo.discriminator} />
        </button>
      </div>
      {isOpen && <ProfileDropdown discordTag={`${userInfo.username}#${userInfo.discriminator}`} />}
    </div>
  )
}

export default Profile
