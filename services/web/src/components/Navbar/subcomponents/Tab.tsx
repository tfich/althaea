import classNames from 'classnames'
import Link from 'next/link'

interface Props {
  href: string
  name: string
  selected?: boolean
}

const Tab: React.FC<Props> = ({ href, name, selected = false }) => {
  return (
    <Link href={href}>
      <a
        className={classNames(
          'whitespace-no-wrap mr-2 sm:mr-4 first:ml-0 pb-3 px-1 border-b-2',
          'font-medium text-sm leading-5 focus:outline-none',
          {
            'border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700': selected,
            'border-transparent text-gray-500': !selected,
            'hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300': !selected
          }
        )}
      >
        {name}
      </a>
    </Link>
  )
}

export default Tab
