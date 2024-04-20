import moment from 'moment-timezone'
import { ActivityEntry } from '../graphql'
import RoundAvatar from './RoundAvatar'

interface Props {
  entry: ActivityEntry
}

const RecentActivityEntry: React.FC<Props> = ({ entry: { description, admin, createdAt } }) => {
  return (
    <li className="py-4">
      <div className="flex space-x-3">
        <RoundAvatar iconType="USER" id={admin.discordInfo?.id} hash={admin.discordInfo?.avatar} size={6} />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium leading-5">
              {admin.discordInfo?.username}#{admin.discordInfo?.discriminator}
            </h3>
            <p className="text-sm leading-5 text-gray-500">{moment(createdAt).fromNow()}</p>
          </div>
          <p className="text-sm leading-5 text-gray-500">{description}</p>
        </div>
      </div>
    </li>
  )
}

export default RecentActivityEntry
