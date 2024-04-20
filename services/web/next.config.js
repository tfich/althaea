const { config } = require('dotenv')
const { join } = require('path')

if (!process.env.NODE_ENV) {
  console.log('You must specify a NODE_ENV before running this application!')
  process.exit()
}

if (process.env.NODE_ENV !== 'production') {
  config({
    path: join(__dirname, '..', '..', 'environments', `.env.${process.env.NODE_ENV}`)
  })
}

module.exports = {
  distDir: 'build',
  typescript: {
    ignoreDevErrors: false
  },
  rewrites: () => [
    {
      source: '/marketplace',
      destination: '/tools'
    },
    {
      source: '/new',
      destination: '/create'
    }
  ],
  /* Edit ./utils/env.ts if changing this config */
  publicRuntimeConfig: {
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    API_BASE_URL: process.env.API_BASE_URL,
    WEB_BASE_URL: process.env.WEB_BASE_URL
  }
}
