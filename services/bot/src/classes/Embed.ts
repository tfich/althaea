import { MessageEmbed } from 'discord.js'
import _ from 'lodash'
import { Group } from '../graphql'

export default class Embed extends MessageEmbed {
  constructor({ embedColor, embedFooter }: Group) {
    super()

    this.color = embedColor ? parseInt(embedColor, 16) : 3553599 // transparent (Discord dark mode)
    if (embedFooter) {
      this.footer = { text: embedFooter }
    }
  }

  public addBlankField(inline = false) {
    return this.addField('\u200B', '\u200B', inline)
  }

  public addColumnField(title: string, lines: string[], columns: 2 | 3 = 2) {
    if (!lines.length) {
      return this
    }

    _.chunk(lines, Math.ceil(lines.length / columns)).forEach((lines, i) => {
      this.addField(i ? '\u200B' : title, lines.join('\n'), true)
    })

    return this
  }
}
