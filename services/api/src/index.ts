import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors, { CorsOptions } from 'cors'
import Express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import env from './env'
import applyDevHeaders from './middleware/applyDevHeaders'
import ormconfig from './ormconfig'
import apiRouter from './routes'
import * as seeds from './seeds'
import authChecker from './utils/authChecker'
import formatGraphqlError from './utils/formatGraphqlError'
import getContext from './utils/getContext'
import graphqlLogger from './utils/graphqlLogger'

const main = async () => {
  await createConnection(ormconfig)

  const schema = await buildSchema({
    resolvers: [`${__dirname}/resolvers/**/*.{ts,js}`, `${__dirname}/fields/**/*.{ts,js}`],
    authChecker,
    authMode: 'error'
  })

  const apolloServer = new ApolloServer({
    schema,
    context: getContext,
    formatError: formatGraphqlError,
    playground: env.isDev,
    debug: env.isDev,
    tracing: env.isDev,
    plugins: [graphqlLogger]
  })

  /* Run Seeds */
  await Promise.all(Object.values(seeds).map((seed) => seed()))

  // const group = (await Group.find())[0]
  // const nonAdmins = (await group.admins).filter(({ userID }) => userID !== group.ownerID).map((admin) => admin.remove())
  // await Promise.all(nonAdmins)

  // const group = (await Group.find())[0]
  // group.botPlanID = 'free'
  // console.log('------START-------')
  // await group.save()
  // console.log('------END-------')

  const app = Express()

  const corsOptions: CorsOptions = {
    origin: ['http://localhost:4000', 'http://localhost:3000'],
    credentials: true,
    maxAge: 86400 // 1 day
  }

  app.use(cookieParser())

  app.use('/api/graphql', applyDevHeaders)

  apolloServer.applyMiddleware({
    path: '/api/graphql',
    cors: corsOptions,
    app
  })

  app.use(cors(corsOptions))

  app.use('/api', apiRouter)

  app.listen(env.PORT, () => {
    console.log(`API Server started on port ${env.PORT}`)
  })
}

main()
