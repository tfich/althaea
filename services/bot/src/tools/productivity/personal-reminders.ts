import moment from 'moment-timezone'
import Questionaire from '../../classes/Questionaire'
import Tool from '../../classes/Tool'
import {
  CreateScheduledTaskDocument,
  Mutation,
  MutationCreateScheduledTaskArgs,
  TaskEvent,
  ToolCategory,
  ToolType
} from '../../graphql'

const tool = new Tool({
  id: 'personal-reminders',
  name: 'Personal Reminders',
  description: 'Become more productive with personal reminders sent via DM',
  category: ToolCategory.Productivity,
  type: ToolType.Command,
  commandTrigger: 'remindme'
})

interface Responses {
  date: Date
  event: string
}

tool.addCommand({
  description: 'Create a personal reminder',
  args: [],
  async exec(message, _, { client }) {
    const questionaire = new Questionaire<Responses>(message, {
      dm: true,
      questions: [
        {
          key: 'date',
          questionStr: 'When would you like me to remind you?',
          example: 'Tomorrow at 8:30 pm pst',
          type: 'datetime'
        },
        {
          key: 'event',
          questionStr: 'What would you like me to remind you of?',
          example: 'Post survey in announcements'
        }
      ]
    })

    const responses = await questionaire.collectResponses()
    if (!responses) {
      return undefined
    }
    const { date, event } = responses

    const maxDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // 30 days
    if (date.getTime() > maxDate) {
      return questionaire.sendMessage('Your remind must be within the next 30 days.')
    }

    if (date <= new Date()) {
      return questionaire.sendMessage('Your remind must be scheduled for the future.')
    }

    await client.mutate<Mutation, MutationCreateScheduledTaskArgs>({
      mutation: CreateScheduledTaskDocument,
      variables: {
        event: TaskEvent.DmUser,
        data: { groupID: message.guild!.id, userID: message.author.id, message: `Reminder: ${event}` },
        date
      }
    })

    return questionaire.sendMessage(`Success! You will get a direct message from me ${moment(date).fromNow()}.`)
  }
})

export default tool
