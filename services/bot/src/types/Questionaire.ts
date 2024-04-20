import { InputTranformer, InputType, InputValidator } from './Input'

export interface QuestionaireOptions {
  dm?: boolean
  responseTimeSec?: number
  questions: Question[]
}

export interface Question {
  key: string
  questionStr: string
  example?: string
  type?: InputType
  finiteOptions?: string[]
  validator?: InputValidator
  transformer?: InputTranformer
}

export type QuestionaireExecFunc = <ResponseType>(responses: ResponseType) => Promise<void> | void
