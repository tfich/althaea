import base64url from 'base64url'
import { Router } from 'express'
import TwitterClient from '../../controllers/TwitterClient'
import { Group } from '../../entities/Group'
import OauthState from '../../types/Oauth'
import redis from '../../utils/redis'

export const twitterOauthRouter = Router()

const twitterClient = new TwitterClient()

twitterOauthRouter.get('/callback', async (req, res) => {
  const { oauth_token, oauth_verifier, state: encodedState }: any = req.query
  if (!oauth_token || !oauth_verifier || !encodedState) {
    return Error('invalid twitter callback')
  }

  const { groupID }: OauthState = JSON.parse(base64url.decode(encodedState as string))
  const twitterSecret = await redis.get(`twitter_secret:group_${groupID}`)

  const group = await Group.findOneOrFail({ id: groupID })

  if (!group || !twitterSecret) {
    return Error('invalid twitter request')
  }

  const tokens = await twitterClient.getAccessToken(req.query as any)

  group.twitterAccessToken = tokens.oauth_token
  group.twitterAccessSecret = tokens.oauth_token_secret

  await group.save()

  return res.redirect('/success')
})
