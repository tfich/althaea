import getDiscordAvatarUrl from '../utils/getDiscordAvatarUrl'

interface Props {
  iconType: 'GROUP' | 'USER'
  id: string
  hash?: string
  discriminator?: string
  size?: number
}

const RoundAvatar: React.FC<Props> = ({ iconType, id, hash, discriminator, size = 8 }) => (
  <img
    className={`inline-block h-${size} w-${size} rounded-full`}
    src={getDiscordAvatarUrl(iconType, id, hash, size < 8 ? '32' : undefined, discriminator)}
    alt="Avatar"
  />
)

export default RoundAvatar
