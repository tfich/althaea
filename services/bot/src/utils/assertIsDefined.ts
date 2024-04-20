import { AssertionError } from 'assert'

const assertIsDefined = <T>(val: T, message?: string): asserts val is NonNullable<T> => {
  if (val === undefined || val === null) {
    throw new AssertionError({
      message: message ? message : `Expected 'val' to be defined, but received ${val}`
    })
  }
}

export default assertIsDefined
