import bodyParser from 'body-parser'
import { Router } from 'express'
import getContext from '../utils/getContext'
import { discordOauthRouter } from './oauth/discord'
import { twilioOauthRouter } from './oauth/twilio'
import { twitterOauthRouter } from './oauth/twitter'
import { stripeWebhookRouter } from './stripe/webhook'
import { taskHandlerRouter } from './tasks/handler'

const apiRouter = Router()

apiRouter.use(bodyParser.json())

/* Exposes the same context that is available to Apollo Server */
apiRouter.use(async (req, res, next) => {
  req.context = await getContext({ req, res })
  return next()
})

apiRouter.use('/oauth/discord', discordOauthRouter)
apiRouter.use('/oauth/twitter', twitterOauthRouter)
apiRouter.use('/oauth/twilio', twilioOauthRouter)

apiRouter.use('/stripe/webhook', stripeWebhookRouter)

apiRouter.use('/tasks/handler', taskHandlerRouter)

apiRouter.get('/health', async (_, res) => {
  return res.json()
})

export default apiRouter
