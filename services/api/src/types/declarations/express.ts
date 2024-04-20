/* eslint-disable */
import ServerContext from '../ServerContext'

// TS Module Augmentation
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare module 'express' {
  interface Request {
    context: ServerContext
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    context: ServerContext
  }
}
