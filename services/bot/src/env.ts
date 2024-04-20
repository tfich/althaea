import { config } from 'dotenv'
import { bool, cleanEnv, str } from 'envalid'
import { join } from 'path'

if (!process.env.NODE_ENV) {
  console.log('You must specify a NODE_ENV before running this application!')
  process.exit()
}

if (process.env.NODE_ENV !== 'production') {
  config({
    path: join(__dirname, '..', '..', '..', 'environments', `.env.${process.env.NODE_ENV}`)
  })
}

export default cleanEnv(process.env, {
  NODE_ENV: str(),

  JWT_SECRET: str(),
  ENCRYPTION_SECRET: str(),

  API_BASE_URL: str(),

  MAIN_BOT_TOKEN: str(),

  BOTBROKER_API_KEY: str(),
  MAPS_API_KEY: str(),

  TWILIO_ACCOUNT_SID: str(),
  TWILIO_AUTH_TOKEN: str(),

  SKIP_TOOL_DB_VALIDATION: bool({ devDefault: true, default: false }),

  // set in services/bot.yaml
  POD_NAME: str({ devDefault: 'bot-0' })
})
