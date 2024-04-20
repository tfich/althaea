import cookies from 'react-cookies'
import client from '../apollo/client'

const signout = async () => {
  await client.resetStore()
  cookies.remove('refresh_token')
  try {
    window.location.href = '/'
  } catch {}
}

export default signout
