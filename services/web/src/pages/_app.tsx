import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { NextPage } from 'next'
import withApollo from 'next-with-apollo'
import NextApp, { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import client from '../apollo/client'
import NotificationProvider from '../components/NotificationProvider'
import ProtectedRouteProvider from '../components/ProtectedRouteProvider'
import '../css/global.css'
import env from '../utils/env'
import loadEntities from '../utils/loadEntities'
import refreshAccessToken from '../utils/refreshAccessToken'

const stripe = loadStripe(env.STRIPE_PUBLIC_KEY)

type Props = AppProps & {
  apollo: ApolloClient<NormalizedCacheObject>
}

const App: NextPage<Props> = ({ Component, pageProps, apollo: client }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEntities().then(({ user, group }) => {
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    refreshAccessToken()
  })

  if (loading) {
    return null
  }

  return (
    <ApolloProvider client={client}>
      <Elements stripe={stripe}>
        <NotificationProvider>
          <ProtectedRouteProvider>
            <Component {...pageProps} />
          </ProtectedRouteProvider>
        </NotificationProvider>
      </Elements>
    </ApolloProvider>
  )
}

App.getInitialProps = async (pageContext: any) => {
  const appProps = (await NextApp.getInitialProps(pageContext)) as Props
  return { ...appProps }
}

export default withApollo(() => client)(App)
