import Link from 'next/link'
import { GroupToolConfig } from '../graphql'
import { capitalizeFirstLetter } from '../utils/conventions'
import SmallBadge from './SmallBadge'

interface Props {
  toolConfig: GroupToolConfig
}

const ToolConfigCard: React.FC<Props> = ({
  toolConfig: {
    tool: { id, name, description, type }
  }
}) => {
  return (
    <Link href={`/dashboard/tools/${id}`}>
      <li className="flex bg-white cursor-pointer">
        <div className="w-full bg-red-0 w-min-full h-36 overflow-hidden rounded-lg shadow-md lg:shadow-xl hover:shadow-2xl">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-row justify-between">
              <h3 className="text-md leading-6 font-medium text-gray-900">{name}</h3>
              <div>
                <SmallBadge color="gray" text={capitalizeFirstLetter(type)} />
              </div>
            </div>
            <p className="pt-2 text-sm leading-normal text-gray-500">{description}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default ToolConfigCard
