import { GraphQLJSONObject } from 'graphql-type-json'
import { Arg, Mutation, registerEnumType, Resolver } from 'type-graphql'
import { TasksClient } from '../controllers/TasksClient'
import { TaskEvent } from '../types/Tasks'

registerEnumType(TaskEvent, { name: 'TaskEvent' })

@Resolver()
export default class {
  @Mutation(() => String, { nullable: true })
  async createScheduledTask(
    @Arg('event', () => TaskEvent) event: TaskEvent,
    @Arg('data', () => GraphQLJSONObject) data: any,
    @Arg('date', () => Date) date: Date
  ): Promise<string | undefined> {
    const task = await TasksClient.create({ event, data }, date)
    return task.name || undefined
  }
}
