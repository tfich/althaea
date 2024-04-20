import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { Message } from 'discord.js'
import Embed from '../classes/Embed'
import PaginatedMenu from '../classes/PaginatedMenu'
import Questionaire from '../classes/Questionaire'
import { Group, GroupMember } from '../graphql'
import { InputTranformer, InputType, InputValidator } from './Input'

type CommandOutput = Embed | Message | Questionaire | PaginatedMenu | string | undefined

export interface CommandPassableInfo {
  group: Group
  client: ApolloClient<NormalizedCacheObject>
  member: GroupMember
}

export interface Command<ArgsType> {
  baseArg?: string
  description: string
  args: CommandArg[]
  exec: (message: Message, args: ArgsType, info: CommandPassableInfo) => Promise<CommandOutput> | CommandOutput
}

export interface CommandArg {
  key: string
  example?: string
  default?: any
  type?: InputType
  finiteOptions?: string[]
  validator?: InputValidator
  transformer?: InputTranformer
}
