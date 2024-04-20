/* eslint-disable */
import { ApolloClient, NormalizedCache } from '@apollo/client'

// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare module 'next' {
  interface NextPageContext {
    apolloClient: ApolloClient<NormalizedCache>
  }
}
