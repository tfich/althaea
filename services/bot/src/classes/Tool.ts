import { ToolOptions } from '../graphql'
import { Command } from '../types/Command'
import { Listener, ListenerEvent, ListenerHandler } from '../types/Listener'
import eventGroupIDMatcher from '../utils/eventGroupIDMatcher'

export default class Tool {
  public commands: Command<any>[] = []
  public listeners: Listener<any>[] = []

  constructor(public options: ToolOptions) {}

  public addCommand<ArgType = {}>(command: Command<ArgType>) {
    this.commands.push(command)
  }

  public addListener<E extends ListenerEvent>(event: E, handler: ListenerHandler<E>) {
    if (!(event in eventGroupIDMatcher)) {
      throw Error(`You must specify an eventGroupIDMatcher in eventGroupIDMatcher.ts for ${event}!`)
    }
    this.listeners.push({ toolID: this.options.id, event, handler })
  }
}
