import classNames from 'classnames'
import { Dispatch, SetStateAction, useState } from 'react'
import { DiscordChannel } from '../graphql'
import { pluralize } from '../utils/conventions'
import useIsOpen from '../utils/hooks/useIsOpen'
import sortChannels from '../utils/sortChannels'

interface Props {
  allChannels: DiscordChannel[]
  selectedChannelIDs: string[]
  setSelectedChannelIDs: Dispatch<SetStateAction<string[]>>
}

const ChannelSelect: React.FC<Props> = ({ allChannels, selectedChannelIDs, setSelectedChannelIDs }) => {
  const { node, isOpen, setIsOpen } = useIsOpen()
  const [searchQuery, setSearchQuery] = useState<string>(null)
  const [selectedCategoryIDs, setSelectedCategoryIDs] = useState([])

  const sortedChannels = sortChannels(allChannels).filter(({ name }) =>
    searchQuery ? name.toLowerCase().includes(searchQuery) : true
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
          placeholder={`${selectedChannelIDs.length} Selected ${pluralize('Channel', selectedChannelIDs.length)}`}
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
              const isSelected = selectedChannelIDs.includes(channel.id) || selectedCategoryIDs.includes(channel.id)

              return (
                <li
                  key={i}
                  className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9"
                  onClick={() => {
                    if (channel.type === 'GUILD_CATEGORY') {
                      const childrenIDs = allChannels
                        .filter(({ parentID }) => parentID === channel.id)
                        .map(({ id }) => id)
                      if (isSelected) {
                        setSelectedChannelIDs(selectedChannelIDs.filter((id) => !childrenIDs.includes(id)))
                        setSelectedCategoryIDs(selectedCategoryIDs.filter((id) => channel.id !== id))
                      } else {
                        setSelectedChannelIDs(selectedChannelIDs.concat(...childrenIDs))
                        setSelectedCategoryIDs(selectedCategoryIDs.concat(channel.id))
                      }
                    } else {
                      if (isSelected) {
                        setSelectedChannelIDs(selectedChannelIDs.filter((id) => channel.id !== id))
                      } else {
                        setSelectedChannelIDs(selectedChannelIDs.concat(channel.id))
                      }
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

export default ChannelSelect
