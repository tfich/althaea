import classNames from 'classnames'
import signout from '../../../utils/signout'

interface Props {
  discordTag?: string
}

const ProfileDropdown: React.FC<Props> = ({ discordTag }) => {
  const buttonClasses = classNames(
    'block px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer',
    'hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ',
    'transition duration-150 ease-in-out'
  )

  return (
    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
      <div className="py-1 rounded-md bg-white shadow-xs">
        <div className="px-4 py-3">
          <p className="text-sm leading-5">Signed in as</p>
          <p className="text-sm leading-5 font-medium text-gray-900">{discordTag || 'TODO'}</p>
        </div>
        <div className="border-t border-gray-200"></div>
        <div className={buttonClasses} onClick={() => signout()}>
          Sign out
        </div>
      </div>
    </div>
  )
}

export default ProfileDropdown
