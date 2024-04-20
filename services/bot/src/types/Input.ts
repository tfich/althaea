import { Message } from 'discord.js'

export type InputType = 'string' | 'number' | 'boolean' | 'datetime' | 'channel' | 'member' | 'role' | 'memberOrRole'

export type InputValidator = (value: string, msg: Message) => Promise<boolean> | boolean

export type InputTranformer = (value: string, msg: Message) => Promise<any> | any
