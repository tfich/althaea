import { Query, Resolver } from 'type-graphql'
import { IsNull, Not } from 'typeorm'
import { Group } from '../../entities/Group'
import GroupTokenPayload from '../../types/GroupTokenPayload'
import jwt from '../../utils/jwt'

@Resolver()
export default class {
  @Query(() => [String])
  async mainBotGroupTokens(): Promise<string[]> {
    const groups = await Group.find({
      botAdded: true,
      botEnabled: true,
      customBotConfigured: false,
      botPlanID: Not(IsNull())
    })
    return groups.map(({ id: id }) => jwt.create<GroupTokenPayload>({ groupID: id }, '60d'))
  }
}
