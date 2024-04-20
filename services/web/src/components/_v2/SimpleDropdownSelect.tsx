import classNames from 'classnames'
import useIsOpen from '../../utils/hooks/useIsOpen'

interface Props {
  options: {
    name: string
    value: string
  }[]
  selectedValue: string
  onChange: (value: string) => void
}

const SimpleDropdownSelect: React.FC<Props> = ({ options, selectedValue, onChange }) => {
  const { node, isOpen, setIsOpen } = useIsOpen()

  const selectedOption = options.find(({ value }) => value === selectedValue)

  return (
    <div ref={node} className="relative">
      <span className="inline-block w-full rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        >
          <span className="block truncate">{selectedOption.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </span>
      {isOpen && (
        <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg z-50">
          <ul
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto text-left focus:outline-none sm:text-sm sm:leading-5"
          >
            {options.map(({ name, value }, i) => (
              <li
                id={value}
                role="option"
                className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9"
                key={i}
                onClick={(e) => {
                  e.preventDefault()
                  onChange(value)
                }}
              >
                <span
                  className={classNames('font-normal block truncate', {
                    'font-semibold': value === selectedValue
                  })}
                >
                  {name}
                </span>
                {value === selectedValue && (
                  <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SimpleDropdownSelect
