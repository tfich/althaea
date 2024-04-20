import CustomBot from './classes/bots/CustomBot'
import MainBot from './classes/bots/MainBot'
import env from './env'

import './utils/prototypes'
import './utils/sentry'

const podOrdinal = Number(env.POD_NAME.split('-')[1])

const bot = podOrdinal === 0 ? new MainBot() : new CustomBot(podOrdinal)

process.on('SIGINT', () => {
  bot.quit()
  process.exit()
})

process.on('exit', () => {
  bot.quit()
  process.exit()
})
