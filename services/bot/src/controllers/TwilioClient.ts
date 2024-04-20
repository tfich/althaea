import { env } from 'process'
import twilio from 'twilio'

const Twilio = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)

export default class TwilioClient {
  public static async lookupNumber(number: string) {
    try {
      const { phoneNumber } = await Twilio.lookups.v1.phoneNumbers(number).fetch()
      return phoneNumber
    } catch {
      return undefined
    }
  }
}
