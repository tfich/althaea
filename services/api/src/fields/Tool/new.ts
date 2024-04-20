import moment from 'moment-timezone'
import { FieldResolver, Resolver, Root } from 'type-graphql'
import { Tool } from '../../entities/Tool'

const NEW_CUTOFF_DAYS = 7

@Resolver(() => Tool)
export default class {
  @FieldResolver(() => Boolean)
  async new(@Root() tool: Tool): Promise<boolean> {
    return moment(new Date()).diff(tool.createdAt, 'days') <= NEW_CUTOFF_DAYS
  }
}
