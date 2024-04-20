import { Message, TextChannel } from 'discord.js'
import Embed from './Embed'

export default class PaginatedMenu {
  private embeds: Embed[]
  private currentPage = 0
  private message: Message

  constructor(private channel: TextChannel, embeds: Embed[]) {
    if (!embeds.length) {
      throw Error('You must supply at least 1 embed to a PaginatedMenu!')
    }
    this.embeds = embeds.map((embed, i) =>
      embed.setTitle(`${embed.title || ''} (Page ${i + 1} of ${embeds.length})`.trim())
    )
  }

  public async sendInitialMsg() {
    this.message = await this.channel.send(this.embeds[0])
    await this.message.react('◀')
    await this.message.react('▶')
    await this.createReactionCollector()
    this.currentPage++
  }

  private async createReactionCollector() {
    this.message
      .createReactionCollector(
        (reaction, user) =>
          user.id !== this.message.author.id && (reaction.emoji.name === '◀' || reaction.emoji.name === '▶')
      )
      .on('collect', async (reaction, user) => {
        const emote = reaction.emoji.name
        if (emote === '◀') {
          await this.prevPage()
          await this.message.reactions.resolve('◀')?.users.remove(user)
        } else if (emote === '▶') {
          await this.nextPage()
          await this.message.reactions.resolve('▶')?.users.remove(user)
        }
      })
  }

  private async nextPage() {
    if (this.currentPage < this.embeds.length - 1) {
      this.currentPage++
      await this.message.edit(this.embeds[this.currentPage])
    }
  }

  private async prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--
      await this.message.edit(this.embeds[this.currentPage])
    }
  }
}
