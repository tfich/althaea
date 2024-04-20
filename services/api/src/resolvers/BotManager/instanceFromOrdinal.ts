import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import { IsNull, Not } from 'typeorm'
import { Group } from '../../entities/Group'
import GroupTokenPayload from '../../types/GroupTokenPayload'
import jwt from '../../utils/jwt'

@ObjectType()
class CustomBotInstance {
  @Field()
  groupToken: string

  @Field()
  botToken: string
}

@Resolver()
export default class {
  @Query(() => CustomBotInstance)
  async instanceFromOrdinal(@Arg('podOrdinal') podOrdinal: number): Promise<CustomBotInstance> {
    const groups = await Group.find({
      botAdded: true,
      botEnabled: true,
      customBotConfigured: true,
      botPlanID: Not(IsNull())
    })
    const { id: id, botToken } = groups[podOrdinal - 1]
    return {
      groupToken: jwt.create<GroupTokenPayload>({ groupID: id }, '60d'),
      botToken: botToken!
    }
  }
}
