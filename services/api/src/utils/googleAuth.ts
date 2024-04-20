import { GoogleAuth } from 'google-auth-library'
import env from '../env'

const googleAuth = new GoogleAuth({
  credentials: {
    private_key: `-----BEGIN PRIVATE KEY-----${env.GCP_PRIVATE_KEY}-----END PRIVATE KEY-----\n`,
    client_email: env.GCP_CLIENT_EMAIL
  }
})

export default googleAuth
