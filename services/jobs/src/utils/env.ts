import { config } from 'dotenv'
import { cleanEnv, str } from 'envalid'
import { join } from 'path'

if (!process.env.NODE_ENV) {
  console.log('You must specify a NODE_ENV before running this application!')
  process.exit()
}

if (process.env.NODE_ENV !== 'production') {
  config({
    path: join(__dirname, '..', '..', '..', '..', 'environments', `.env.${process.env.NODE_ENV}`)
  })
}

export default cleanEnv(process.env, {
  NODE_ENV: str(),

  JWT_SECRET: str(),
  ENCRYPTION_SECRET: str(),

  API_BASE_URL: str(),

  MAIN_BOT_TOKEN: str(),

  BOTBROKER_API_KEY: str(),
  MAPS_API_KEY: str()
})
