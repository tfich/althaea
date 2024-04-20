import classNames from 'classnames'
import Link from 'next/link'
import { GroupToolConfig } from '../graphql'
import { capitalizeFirstLetter, pluralize } from '../utils/conventions'
import SmallBadge from './SmallBadge'

interface Props {
  toolConfig: GroupToolConfig
  index: number
}

const ToolConfigRow: React.FC<Props> = ({
  toolConfig: {
    tool: { id, name, type, description },
    channels,
    channelsAllowed
  },
  index
}) => {
  return (
    <li className={classNames({ 'border-t border-gray-200': index > 0 })}>
      <Link href={`/dashboard/tools/${id}`}>
        <a className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50">
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="min-w-0 flex-1 flex items-center">
              <div className="min-w-0 flex-1">
                <div>
                  <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                    {name}
                    <span className="font-normal text-gray-500">
                      <SmallBadge color="gray" text={capitalizeFirstLetter(type)} />
                      {type === 'COMMAND' && (
                        <SmallBadge
                          color="gray"
                          text={`${channelsAllowed ? 'Enabled' : 'Disabled'} in ${channels.length} ${pluralize(
                            'channel',
                            channels.length
                          )}`}
                        />
                      )}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">{description}</div>
                </div>
              </div>
            </div>
            <div>
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default ToolConfigRow
