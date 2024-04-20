import { gql } from '@apollo/client'
import client from '../../apollo/client'
import { Tool, ToolType, UserPartsFragmentDoc } from '../../graphql'
import BaseCache from '../../types/BaseCache'
import { capitalizeFirstLetter } from '../../utils/conventions'
import useModal from '../../utils/hooks/useModal'
import SmallBadge from '../SmallBadge'
import AddToolModal from './subcomponents/AddToolModal'

interface Props {
  tool: Tool
}

const ToolCard: React.FC<Props> = ({ tool }) => {
  const { name, description, new: isNew, type } = tool

  const { isShowing, toggle } = useModal()

  const { user } = client.cache.readQuery<BaseCache>({
    query: gql`
      {
        user {
          ...UserParts
        }
      }
      ${UserPartsFragmentDoc}
    `
  })

  return (
    <>
      <AddToolModal isShowing={isShowing} toggle={toggle} user={user} tool={tool} />
      <div onClick={toggle} className="cursor-pointer">
        <li className="flex">
          <div className="w-full bg-red-0 w-min-full h-36 overflow-hidden rounded-lg shadow-md lg:shadow-xl hover:shadow-2xl">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-row justify-between">
                <h3 className="text-md leading-6 font-medium text-gray-900">{name}</h3>
                <div>
                  <SmallBadge color={type === ToolType.Command ? 'blue' : 'red'} text={capitalizeFirstLetter(type)} />
                  {isNew && <SmallBadge color="gray" text="New" />}
                </div>
              </div>
              <p className="pt-2 text-sm leading-normal text-gray-500">{description}</p>
            </div>
          </div>
        </li>
      </div>
    </>
  )
}

export default ToolCard
