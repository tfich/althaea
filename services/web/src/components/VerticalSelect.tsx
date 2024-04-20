import classNames from 'classnames'
import { useRouter } from 'next/router'
import buildQuerystring from '../utils/buildQuerystring'

interface Props {
  name: string
  queryKey: string
  options: string[]
}

const VerticalSelect: React.FC<Props> = ({ name, queryKey, options }) => {
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const query = {
      ...router.query,
      [queryKey]: e.target.value
    }

    if (!e.target.value) {
      delete query[queryKey]
    }

    router.push(`/tools${buildQuerystring(query)}`)
  }

  return (
    <select
      className={classNames(
        'form-select relative min-w-full rounded-md bg-transparent focus:z-10',
        'transition ease-in-out duration-150 sm:text-sm sm:leading-5'
      )}
      onChange={handleChange}
      defaultValue={router.query[queryKey]}
    >
      <option value="">Select {name}</option>
      {options.map((o, i) => (
        <option value={o.toLowerCase()} key={i}>
          {o}
        </option>
      ))}
    </select>
  )
}

export default VerticalSelect
