import classNames from 'classnames'
import Link from 'next/link'

interface Props {
  name: string
  href?: string
  asPath?: string
  selected?: boolean
  onClick?: () => any
}

const VerticalNavButton: React.FC<Props> = ({
  name,
  href = undefined,
  asPath = undefined,
  selected = false,
  onClick = undefined
}) => {
  return (
    <Link href={href || '/tools'} as={asPath}>
      <a
        className={classNames(
          'mb-1 group flex items-center px-2 lg:px-3 py-2 text-sm leading-5 font-medium rounded-md',
          'hover:text-gray-900 focus:outline-none transition ease-in-out duration-150',
          {
            'lg:text-gray-900 lg:bg-gray-200 lg:hover:bg-gray-200': selected,
            'text-gray-600 hover:bg-gray-100 focus:bg-gray-200': !selected
          }
        )}
        onClick={onClick}
      >
        <span className="truncate">{name}</span>
      </a>
    </Link>
  )
}

export default VerticalNavButton
