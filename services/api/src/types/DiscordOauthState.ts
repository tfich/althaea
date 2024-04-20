import Client from './Client'

interface DiscordOauthState {
  client?: Client
  isBot: boolean
  redirectUrl: string
}

export default DiscordOauthState
