import base64url from 'base64url'
import { Router } from 'express'
import TwilioClient from '../../controllers/TwilioClient'
import { Group } from '../../entities/Group'
import OauthState from '../../types/Oauth'

export const twilioOauthRouter = Router()

twilioOauthRouter.get('/callback', async (req, res) => {
  const { state: encodedState, AccountSid: twilioConnectAccountSID }: any = req.query
  if (!encodedState || !twilioConnectAccountSID) {
    return Error('invalid twilio callback')
  }

  const { groupID }: OauthState = JSON.parse(base64url.decode(encodedState as string))

  const group = await Group.findOneOrFail({ id: groupID })
  group.twilioConnectAccountSID = twilioConnectAccountSID

  const twilio = new TwilioClient(twilioConnectAccountSID)
  const { sid } = await twilio.createNotifyService()
  group.twilioNotifyServiceSID = sid

  await group.save()

  return res.redirect('/success')
})
