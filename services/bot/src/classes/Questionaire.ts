// /* eslint-disable indent */
import { oneLine } from 'common-tags'
import { Message } from 'discord.js'
import { Question, QuestionaireOptions } from '../types/Questionaire'
import baseInputType from '../utils/baseInputType'
import { pluralize } from '../utils/conventions'
import Embed from './Embed'

export default class Questionaire<ResponseType = {}> {
  constructor(private initMessage: Message, private options: QuestionaireOptions) {
    if (options.dm) {
      this.initMessage.reply(
        `please check your direct messages for ${pluralize(
          'follow-up question',
          this.options.questions.length,
          's',
          'a'
        )}.`
      )
    }
  }

  public async collectResponses(): Promise<ResponseType | undefined> {
    const parsedResponses = {}
    for (let i = 0; i < this.options.questions.length; i++) {
      const question = this.options.questions[i]
      const infoStr = oneLine`
        I am going to ask you ${this.options.questions.length} ${pluralize('question', this.options.questions.length)}.
        You have \`${this.options.responseTimeSec || 30} seconds\` to respond.
        Type \`cancel\` to stop.
      `
      const questionStr = [
        question.questionStr.question(),
        question.example ? `(example: ${question.example})` : '',
        question.finiteOptions ? `(${question.finiteOptions.join('|')})` : ''
      ].join(' ')

      const questionMsg = await this.sendMessage(`${i === 0 ? infoStr : ''}\n${questionStr}`)

      const msgWaiter = await questionMsg.channel.awaitMessages(() => true, {
        time: (this.options.responseTimeSec || 30) * 1000,
        max: 1
      })

      const response = msgWaiter.first()?.content
      if (!response) {
        await this.sendMessage('Response not received. You will need to redo the command if you wish to try again.')
        return
      }
      if (response.toLowerCase() === 'cancel') {
        await this.sendMessage('Questionaire cancelled. You will need to redo the command if you wish to try again.')
        return
      }
      const parsedResponse = await this.parseResponse(response, question, questionMsg)
      if (!parsedResponse) {
        await this.sendMessage('Invalid response. You will need to redo the command if you wish to try again.')
        return
      }
      parsedResponses[question.key] = parsedResponse
    }
    return parsedResponses as ResponseType
  }

  public async sendMessage(content: string | Embed) {
    return this.options.dm
      ? this.initMessage.author.send(content)
      : this.initMessage.reply(typeof content === 'string' ? content.reply() : content)
  }

  private async parseResponse(response: string, question: Question, message: Message) {
    if (question.type) {
      Object.assign(question, baseInputType[question.type])
    }
    if (question.finiteOptions && !question.finiteOptions.includes(response)) {
      return undefined
    }
    if (question.validator) {
      const isValid = await question.validator(response, message)
      if (!isValid) {
        return undefined
      }
    }
    if (question.transformer) {
      return question.transformer(response, message)
    }
    return response
  }
}
