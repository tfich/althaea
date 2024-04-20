import getConfig from 'next/config'

const {
  publicRuntimeConfig
}: {
  publicRuntimeConfig: { [_: string]: string }
} = getConfig()

const env = {
  STRIPE_PUBLIC_KEY: publicRuntimeConfig.STRIPE_PUBLIC_KEY,
  API_BASE_URL: publicRuntimeConfig.API_BASE_URL,
  WEB_BASE_URL: publicRuntimeConfig.WEB_BASE_URL
}

export default env
