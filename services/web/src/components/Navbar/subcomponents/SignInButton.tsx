import classNames from 'classnames'
import Link from 'next/link'

const SignInButton: React.FC = () => {
  return (
    <Link href="/login">
      <span className="inline-flex rounded-md cursor-pointer">
        <div
          className={classNames(
            'inline-flex items-center px-4 py-1.5 border border-gray-500 text-sm leading-5 font-medium rounded-md',
            'text-gray-500 bg-white hover:text-gray-900 hover:border-gray-900 focus:outline-none focus:border-blue-300',
            'focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150'
          )}
        >
          Sign In
        </div>
      </span>
    </Link>
  )
}

export default SignInButton
