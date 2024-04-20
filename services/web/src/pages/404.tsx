import { NextPage } from 'next'
import Router from 'next/router'

const Custom404: NextPage = () => {
  try {
    Router.push('/', '/home')
  } catch {}
  return null
}

export default Custom404
