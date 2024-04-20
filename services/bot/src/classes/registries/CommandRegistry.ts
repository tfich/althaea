import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { Message } from 'discord.js'
import env from '../../env'
import { Group, GroupMemberDocument, GroupToolConfig, Query, QueryGroupMemberArgs } from '../../graphql'
import { Command, CommandArg } from '../../types/Command'
import baseInputType from '../../utils/baseInputType'
import Embed from '../Embed'
import PaginatedMenu from '../PaginatedMenu'
import BaseRegistry from './BaseRegistry'

export default class CommandRegistry extends BaseRegistry {
  public async incomingMessage(message: Message, group: Group, client: ApolloClient<NormalizedCacheObject>) {
    const { content } = message
    const { commandPrefix } = group

    if (!content.startsWith(commandPrefix)) {
      return
    }

    const { data } = await client.query<Query, QueryGroupMemberArgs>({
      query: GroupMemberDocument,
      variables: { memberID: message.author.id }
    })

    if (!data) {
      throw Error(`Could not fetch group member with id ${message.author.id}!`)
    }

    const [commandTrigger, ...args] = content.substr(commandPrefix.length).split(' ').filter(Boolean)

    const tool = this.tools.find(({ options }) => options.commandTrigger === commandTrigger)

    if (!tool || !tool.commands.length) {
      return
    }

    const command = tool.commands.find(({ baseArg }) => !baseArg || baseArg === args[0])

    if (!command) {
      if (tool.commands.length) {
        const baseArgs = tool.commands
          .map(({ baseArg }) => baseArg)
          .filter(Boolean)
          .sort()
        return message.reply(
          `\`${commandPrefix}${tool.options.id}\` must be followed by a sub-command (\`${baseArgs.join('|')}\`).`
        )
      }
      return
    }

    if (command.baseArg) {
      args.shift()
    }

    const groupToolConfig = !env.SKIP_TOOL_DB_VALIDATION
      ? group.toolConfigs.find(({ toolID }) => toolID === tool.options.id)
      : ({ channels: [], channelsAllowed: false, roles: [], rolesAllowed: false } as any)

    if (!groupToolConfig) {
      return
    }

    const [validChannel, validRoles] = this.validateConfig(message, groupToolConfig)

    if (!validChannel) {
      return // silent
    } else if (!validRoles) {
      return message.reply('you are not authorized to use this command!')
    }

    try {
      const parsedArgs = await this.parseArgs(args.join(' '), command, message)
      for (const [key, value] of Object.entries(parsedArgs)) {
        if (!value) {
          return message.reply(`argument ${key} is invalid!`)
        }
      }

      const output = await command.exec(message, parsedArgs, { group, client, member: data.groupMember })
      if (output === undefined) {
        // send nothing
      } else if (typeof output === 'string') {
        await message.reply(output)
      } else if (output instanceof Embed) {
        await message.channel.send(output)
      } else if (output instanceof Message) {
        // send nothing, a message was sent during exec
      } else if (output instanceof PaginatedMenu) {
        await output.sendInitialMsg()
      } else {
        throw Error('Unexpected output from command!')
      }
    } catch (error) {
      await message.reply(
        "an unknown error occured! Don't worry, we report these errors automatically. If the issue persists, please contact a group admin."
      )
      this.handleError(error)
    }
  }

  private validateConfig(message: Message, { channels, channelsAllowed, roles, rolesAllowed }: GroupToolConfig) {
    if (env.SKIP_TOOL_DB_VALIDATION) {
      return [true, true]
    }
    const authorRoles = message.member?.roles.cache.map(({ id }) => id) || []
    const validChannel =
      (channels.includes(message.channel.id) && channelsAllowed) ||
      (!channels.includes(message.channel.id) && !channelsAllowed)
    const validRoles =
      (roles.some((roleID) => authorRoles.includes(roleID)) && rolesAllowed) ||
      (!roles.some((roleID) => authorRoles.includes(roleID)) && !rolesAllowed)
    return [validChannel, validRoles]
  }

  private async parseArgs(argStr: string, { args }: Command<any>, message: Message) {
    const split: string[] = argStr.split(' ').filter(Boolean)

    const parseValue = async (value: string, arg: CommandArg) => {
      if (!value && arg.default) {
        return arg.default
      }
      if (arg.type) {
        Object.assign(arg, baseInputType[arg.type])
      }
      if (arg.finiteOptions && !arg.finiteOptions.includes(value)) {
        return undefined
      }
      if (arg.validator) {
        const isValid = await arg.validator(value, message)
        if (!isValid) {
          return undefined
        }
      }
      if (arg.transformer) {
        return arg.transformer(value, message)
      }
      return value
    }

    const parsedArgs = {}
    for (let i = 0; i < args.length; i++) {
      const value = i < args.length - 1 ? split[i] : split.slice(args.length - 1).join(' ')
      parsedArgs[args[i].key] = await parseValue(value, args[i])
    }

    return parsedArgs
  }
}
