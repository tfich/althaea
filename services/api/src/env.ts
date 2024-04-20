import { config } from 'dotenv'
import { cleanEnv, num, str } from 'envalid'
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

  PORT: num({ default: 4000 }),

  JWT_SECRET: str(),
  ENCRYPTION_SECRET: str(),

  API_BASE_URL: str(),
  WEB_BASE_URL: str(),

  MAIN_BOT_TOKEN: str(),
  MAIN_BOT_CLIENT_ID: str(),
  MAIN_BOT_CLIENT_SECRET: str(),

  STRIPE_SECRET_KEY: str(),
  STRIPE_WEBHOOK_SECRET: str(),

  BOT_PLAN_FREE_PRICE_ID: str(),
  BOT_PLAN_STANDARD_PRICE_ID: str(),
  BOT_PLAN_CUSTOM_PRICE_ID: str(),

  TWITTER_API_KEY: str(),
  TWITTER_API_SECRET: str(),

  TWILIO_ACCOUNT_SID: str(),
  TWILIO_AUTH_TOKEN: str(),
  TWILIO_CONNECT_SID: str(),

  GCP_PROJECT_ID: str(),
  GCP_REGION: str(),
  GCP_PRIVATE_KEY: str(),
  GCP_CLIENT_EMAIL: str(),

  CLOUD_TASKS_QUEUE: str(),

  PSQL_URI: str(),

  REDIS_URI: str(),

  SUPPORT_SERVER_GUILD_ID: str(),
  SUPPORT_SERVER_INVITE: str(),

  DEV_USER_ID: str({ default: undefined }),
  DEV_GROUP_ID: str({ default: undefined })
})
