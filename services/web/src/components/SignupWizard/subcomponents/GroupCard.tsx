import classNames from 'classnames'
import { CreatableGroup } from '../../../graphql'
import getDiscordAvatarUrl from '../../../utils/getDiscordAvatarUrl'

interface Props {
  group: CreatableGroup
  selected: boolean
  onClick: () => void
}

const GroupCard: React.FC<Props> = ({ group: { name, id, icon }, selected, onClick }) => {
  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center rounded-lg bg-gray-50 border border-gray-200 shadow-sm cursor-pointer',
        {
          'border-4 border-gray-900': selected
        }
      )}
      onClick={onClick}
    >
      <div className="p-3">
        <img src={getDiscordAvatarUrl('GROUP', id, icon)} alt={name} className="rounded-lg" />
      </div>
      <div className="flex justify-center w-full bg-white px-3 py-1.5 text-sm m-px border-t border-gray-200 font-medium rounded-b-lg">
        <div className="text-center truncate">{name}</div>
      </div>
    </div>
  )
}

export default GroupCard
