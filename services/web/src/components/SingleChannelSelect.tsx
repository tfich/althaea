import classNames from 'classnames'
import { Dispatch, SetStateAction, useState } from 'react'
import { DiscordChannel } from '../graphql'
import useIsOpen from '../utils/hooks/useIsOpen'
import sortChannels from '../utils/sortChannels'

interface Props {
  allChannels: DiscordChannel[]
  selectedChannelID: string
  setSelectedChannelID: Dispatch<SetStateAction<string>>
}

const SingleChannelSelect: React.FC<Props> = ({ allChannels, selectedChannelID, setSelectedChannelID }) => {
  const { node, isOpen, setIsOpen } = useIsOpen()
  const [searchQuery, setSearchQuery] = useState<string>(null)

  const sortedChannels = sortChannels(allChannels).filter(
    ({ name }) => !searchQuery || name.toLowerCase().includes(searchQuery)
  )

  return (
    <div ref={node} className="relative">
      <div
        className="my-1 inline-block w-full rounded-md shadow-sm"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <input
          onChange={(e) => {
            e.preventDefault()
            setSearchQuery(e.target.value.toLowerCase())
          }}
          className="form-select form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="Select a channel"
        />
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-50">
          <ul
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
          >
            {sortedChannels.map((channel, i) => {
              const isSelected = channel.id === selectedChannelID

              return (
                <li
                  key={i}
                  className={classNames('text-gray-900 select-none relative py-2 pl-3 pr-9', {
                    'cursor-pointer': channel.type === 'GUILD_TEXT'
                  })}
                  onClick={(e) => {
                    e.preventDefault()
                    if (channel.type !== 'GUILD_TEXT') {
                      return
                    }
                    if (isSelected) {
                      setSelectedChannelID(null)
                    } else {
                      setSelectedChannelID(channel.id)
                    }
                  }}
                >
                  <span
                    className={classNames('font-normal block truncate', {
                      'ml-3': channel.type === 'GUILD_TEXT',
                      'font-semibold': channel.type !== 'GUILD_TEXT'
                    })}
                  >
                    {channel.name}
                  </span>
                  {isSelected && (
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
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SingleChannelSelect
