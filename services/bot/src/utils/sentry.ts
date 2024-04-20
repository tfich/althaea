import * as Sentry from '@sentry/node'
import env from '../env'
// import Tracing from '@sentry/tracing'

Sentry.init({
  // dsn: 'https://d73558543ad949879ec69206094a530d@o462560.ingest.sentry.io/5466102',
  dsn: 'https://9365222131b2429db17c4ef2ae71524f@o462560.ingest.sentry.io/5466119',
  environment: env.NODE_ENV,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0
})

// const transaction = Sentry.startTransaction({
//   op: 'test',
//   name: 'My First Test Transaction'
// })

// setTimeout(() => {
//   try {
//     throw ''
//   } catch (e) {
//     Sentry.captureException(e)
//   } finally {
//     transaction.finish()
//   }
// }, 99)
