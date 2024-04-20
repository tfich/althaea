import base64url from 'base64url'
import { Router } from 'express'
import rp from 'request-promise'
import { Group } from '../../entities/Group'
import { User } from '../../entities/User'
import env from '../../env'
import DiscordOauthState from '../../types/DiscordOauthState'
import encodeDiscordAuth from '../../utils/encodeDiscordAuth'
import jwt from '../../utils/jwt'
import redis from '../../utils/redis'

export const discordOauthRouter = Router()

discordOauthRouter.get('/callback', async (req, res) => {
  const { state: encodedState, code, guild_id }: any = req.query
  if (!encodedState || !code) {
    return Error('invalid discord callback')
  }

  const { isBot, client, redirectUrl }: DiscordOauthState = JSON.parse(base64url.decode(encodedState as string))

  const group = guild_id ? await Group.findOne({ id: guild_id }) : null

  if (client === 'WEB' && isBot && group) {
    group.botAdded = true
    await group.save()
    return res.redirect(redirectUrl)
  }

  const clientAuth =
    group && group.customBotConfigured
      ? encodeDiscordAuth(group.botClientID, group.botClientSecret)
      : encodeDiscordAuth()

  const { access_token: discordAccessToken, refresh_token: discordRefreshToken, expires_in: expiresIn } = await rp({
    method: 'POST',
    url: 'https://discordapp.com/api/oauth2/token',
    formData: {
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${env.API_BASE_URL}/oauth/discord/callback`
    },
    headers: { Authorization: `Basic ${clientAuth}` },
    json: true
  })

  const { id: userID, email } = await rp({
    url: 'https://discordapp.com/api/users/@me',
    headers: { Authorization: `Bearer ${discordAccessToken}` },
    json: true
  })

  if (client === 'WEB') {
    let user = await User.findOne({ id: userID })
    if (!user) {
      user = User.create({
        id: userID,
        email,
        discordRefreshToken,
        discordAccessToken
      })
      await user.save()
    } else {
      user.email = email
      user.discordRefreshToken = discordRefreshToken
      user.discordAccessToken = discordAccessToken
      await user.save()
      await redis.setex(`access_token:user_${userID}`, expiresIn, discordAccessToken)
    }
    const refreshToken = jwt.create({ client: 'WEB', userID }, '7d')
    res.cookie('refresh_token', refreshToken)
    return res.redirect(redirectUrl)
  }

  if (client === 'DASH') {
    const groupID = '' // TODO
    let member = await User.findOne({ id: userID })
    if (!member) {
      member = User.create({
        id: userID,
        email,
        discordRefreshToken,
        discordAccessToken
      })
      await member.save()
    } else {
      member.email = email
      member.discordRefreshToken = discordRefreshToken
      member.discordAccessToken = discordAccessToken
      await member.save()
      await redis.setex(`access_token:member_${groupID}_${userID}`, expiresIn, discordAccessToken)
    }

    const refreshToken = jwt.create({ client: 'WEB', userID }, '7d')
    const groupToken = jwt.create({ client: 'DASH', userID }, '7d')
    res.cookie('refresh_token', refreshToken)
    res.cookie('group_token', groupToken)
    return res.redirect(redirectUrl)
  }

  return Error('invalid discord callback')
})
