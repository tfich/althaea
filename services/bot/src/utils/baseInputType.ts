import { parseDate } from 'chrono-node'
import { InputTranformer, InputType, InputValidator } from '../types/Input'

type BaseInputType = {
  [parser in InputType]: {
    validator?: InputValidator
    transformer?: InputTranformer
  }
}

const baseInputType: BaseInputType = {
  string: {},
  number: {
    validator: (value) => !!parseInt(value),
    transformer: (value) => Number(value)
  },
  boolean: {
    validator: (value) => value.toLowerCase() === 'true' || value.toLowerCase() === 'false',
    transformer: (value) => value === 'true'
  },
  datetime: {
    transformer: (value) => parseDate(value)
  },
  channel: {
    transformer: async (value, msg) => {
      const matches = value.match(/^(?:<#)?([0-9]+)>?$/)
      if (!matches) {
        return undefined
      }
      return msg.client.channels.fetch(matches[1])
    }
  },
  member: {
    transformer: async (value, msg) => {
      const matches = value.match(/^(?:<@!?)?([0-9]+)>?$/)
      if (matches) {
        return msg.guild?.members.fetch(matches[1])
      } else {
        const search = value.toLowerCase()
        const members = msg.guild?.members.cache?.filter(
          ({ user, nickname }) =>
            user.username.toLowerCase().includes(search) ||
            (nickname && nickname.toLowerCase().includes(search)) ||
            `${user.username.toLowerCase()}#${user.discriminator}`.includes(search)
        )
        return members?.first()
      }
    }
  },
  role: {
    transformer: async (value, msg) => {
      const matches = value.match(/^(?:<@&)?([0-9]+)>?$/)
      if (matches) {
        return msg.guild?.roles.fetch(matches[1])
      } else {
        const roles = msg.guild?.roles.cache?.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()))
        return roles?.first()
      }
    }
  },
  memberOrRole: {
    transformer: async (value, msg) => {
      const matches = value.match(/^(?:<@&?!?)?([0-9]+)>?$/)
      if (matches) {
        return msg.guild?.members.fetch(matches[1]) || msg.guild?.roles.fetch(matches[1])
      } else {
        const search = value.toLowerCase()
        const members = msg.guild?.members.cache?.filter(
          ({ user, nickname }) =>
            user.username.toLowerCase().includes(search) ||
            (nickname && nickname.toLowerCase().includes(search)) ||
            `${user.username.toLowerCase()}#${user.discriminator}`.includes(search)
        )
        const roles = msg.guild?.roles.cache?.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()))
        return members?.first() || roles?.first()
      }
    }
  }
}

export default baseInputType
