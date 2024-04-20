import Twilio from 'twilio'
import env from '../env'

export default class TwilioClient {
  private client: Twilio.Twilio

  constructor(twilioAccountSid: string) {
    this.client = Twilio(twilioAccountSid, env.TWILIO_AUTH_TOKEN)
  }

  public async createNotifyService() {
    const { sid } = await this.client.messaging.services.create({
      friendlyName: 'Althaea SMS System (Messaging)'
    })
    return this.client.notify.services.create({
      messagingServiceSid: sid,
      friendlyName: 'Althaea SMS System (Notify)'
    })
  }

  public async sendMessage(message: string, numbers: string[], notifyServiceSID: string) {
    const service = this.client.notify.services(notifyServiceSID)
    const bindings = numbers.map((n) => JSON.stringify({ binding_type: 'sms', address: n }))
    return service.notifications.create({ toBinding: bindings, body: message })
  }
}
