import env from '../env'

const encodeDiscordAuth = (clientID = env.MAIN_BOT_CLIENT_ID, clientSecret = env.MAIN_BOT_CLIENT_SECRET) => {
  return Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
}

export default encodeDiscordAuth
