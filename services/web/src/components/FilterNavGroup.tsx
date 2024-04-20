import { useRouter } from 'next/router'
import buildQuerystring from '../utils/buildQuerystring'
import VerticalNavButton from './VerticalNavButton'

interface Props {
  name: string
  queryKey: string
  options: string[]
}

const FilterNavGroup: React.FC<Props> = ({ name, queryKey, options }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex flex-row px-3 pb-2 pt-5 justify-between items-center">
        <h3 className="text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider">{name}</h3>
        {router.query[queryKey] && (
          <a
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const { query } = router
              delete query[queryKey]
              return router.push(`/tools${buildQuerystring(query)}`)
            }}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 cursor-pointer"
          >
            <svg className="h-4 w-4" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </a>
        )}
      </div>
      {options.map((o) => (
        <VerticalNavButton
          name={o}
          href={`/tools${buildQuerystring({
            ...router.query,
            [queryKey]: o.toLowerCase()
          })}`}
          selected={router.query[queryKey] === o.toLowerCase()}
          key={o}
        />
      ))}
    </>
  )
}

export default FilterNavGroup
