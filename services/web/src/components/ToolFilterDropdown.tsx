import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import buildQuerystring from '../utils/buildQuerystring'
import { capitalizeFirstLetters } from '../utils/conventions'

interface Props {
  name: 'Category' | 'Type'
  options: string[]
  openedDropdown: string | null
  setOpenDropdown: Dispatch<SetStateAction<string>>
}

const ToolFilterDropdown: React.FC<Props> = ({ name, options, openedDropdown, setOpenDropdown }) => {
  const router = useRouter()

  options = [`All ${name === 'Category' ? 'Categories' : 'Types'}`, ...options]

  const getHref = (option: string) => {
    const query = {
      ...router.query,
      [name.toLowerCase()]: option.toLowerCase()
    }

    if (option.startsWith('All')) {
      delete query[name.toLowerCase()]
    }

    return `/dashboard/tools${buildQuerystring(query)}`
  }

  const getSelectedName = () => {
    const key = router.query[name.toLowerCase()] as string | null
    return key ? capitalizeFirstLetters(key) : options[0]
  }

  return (
    <div className="relative inline-block text-left w-1/2 sm:w-40">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            onClick={() => {
              if (!openedDropdown) {
                setOpenDropdown(name)
              } else {
                if (openedDropdown === name) {
                  setOpenDropdown(null)
                } else {
                  setOpenDropdown(name)
                }
              }
            }}
            type="button"
            className={classNames(
              'inline-flex justify-between w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm',
              'leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none',
              'active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150'
            )}
          >
            {getSelectedName()}
            <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>
      {openedDropdown === name && (
        <div className="origin-top-right absolute mt-2 w-40 rounded-md shadow-lg">
          <div className="rounded-md bg-white shadow-xs">
            <div className="py-1">
              {options.map((o, i) => (
                <Link key={i} href={getHref(o)}>
                  <a
                    className={classNames(
                      'block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
                    )}
                  >
                    {o}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToolFilterDropdown
