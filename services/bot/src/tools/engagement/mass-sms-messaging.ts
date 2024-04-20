import { oneLine } from 'common-tags'
import Questionaire from '../../classes/Questionaire'
import Tool from '../../classes/Tool'
import TwilioClient from '../../controllers/TwilioClient'
import {
  Mutation,
  MutationSendSmsMessageArgs,
  MutationUpdateSmsNumberArgs,
  SendSmsMessageDocument,
  ToolCategory,
  ToolType,
  UpdateSmsNumberDocument
} from '../../graphql'

const tool = new Tool({
  id: 'mass-sms-messaging',
  name: 'Mass SMS Messaging',
  description: 'A complete SMS messaging system right in your server',
  category: ToolCategory.Engagement,
  type: ToolType.Command,
  commandTrigger: 'sms',
  featured: true
})

tool.addCommand({
  baseArg: 'add',
  description: 'Add your phone number to the system',
  args: [],
  async exec(message, _, { group, client, member }) {
    if (member.smsNumber) {
      return oneLine`
        you have already added a SMS number.
        If you wish to replace it, you must first remove it using \`${group.commandPrefix}sms remove\`.
      `
    }
    const questionaire = new Questionaire<{ smsNumber: string }>(message, {
      dm: true,
      questions: [
        {
          key: 'smsNumber',
          questionStr: 'What is your phone number?',
          example: '212-966-7799',
          transformer: (value) => TwilioClient.lookupNumber(value)
        }
      ]
    })
    const responses = await questionaire.collectResponses()
    if (!responses) {
      return undefined
    }
    await client.mutate<Mutation, MutationUpdateSmsNumberArgs>({
      mutation: UpdateSmsNumberDocument,
      variables: { memberID: message.author.id, smsNumber: responses.smsNumber }
    })
    return questionaire.sendMessage(`Your phone number was successfuly updated to \`${responses.smsNumber}\`.`)
  }
})

tool.addCommand({
  baseArg: 'remove',
  description: 'Remove your phone number from the system',
  args: [],
  async exec(message, _, { group, client, member }) {
    if (!member.smsNumber) {
      return `you do not have a SMS number added. Add one using \`${group.commandPrefix}sms add\`.`
    }
    await client.mutate<Mutation, MutationUpdateSmsNumberArgs>({
      mutation: UpdateSmsNumberDocument,
      variables: { memberID: message.author.id, smsNumber: undefined }
    })
    return oneLine`
      successfuly removed your phone number from our system!
      If you wish to add it again use \`${group.commandPrefix}sms add\`.
    `
  }
})

tool.addCommand({
  baseArg: 'view',
  description: 'Check which phone number you have in our system',
  args: [],
  async exec(message, _, { member }) {
    if (member.smsNumber) {
      await message.author.send(`Your phone number in our system is \`${member.smsNumber}\`.`)
      return 'please check your direct messages.'
    } else {
      return 'you do not have a SMS number added.'
    }
  }
})

tool.addCommand({
  baseArg: 'send',
  description: 'Send a message to all phone numbers in the system',
  args: [],
  async exec(message, _, { group, client }) {
    const questionaire = new Questionaire<{ message: string }>(message, {
      dm: true,
      responseTimeSec: 60,
      questions: [
        {
          key: 'message',
          questionStr: 'What message would you like to send via SMS?',
          example: 'Check #announements for an important message.',
          transformer: undefined // TODO: transform to cleanContent
        }
      ]
    })
    const responses = await questionaire.collectResponses()
    if (!responses) {
      return undefined
    }
    const { data } = await client.mutate<Mutation, MutationSendSmsMessageArgs>({
      mutation: SendSmsMessageDocument,
      variables: { message: responses.message }
    })
    return questionaire.sendMessage(
      oneLine`
        Your message was successfully sent! You can view the logs here:
        https://www.twilio.com/console/notify/services/${group.twilioNotifyServiceSID}/logs/${data?.sendSmsMessage}.
      `
    )
  }
})

export default tool
