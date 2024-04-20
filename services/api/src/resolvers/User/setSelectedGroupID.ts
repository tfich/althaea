import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { User } from '../../entities/User'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => User)
  async setSelectedGroupID(
    @Ctx() { user }: ServerContext,
    @Arg('selectedGroupID') selectedGroupID: string
  ): Promise<User> {
    user!.selectedGroupID = selectedGroupID

    return user!.save()
  }
}
