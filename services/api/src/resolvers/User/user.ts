import { Ctx, Query, Resolver } from 'type-graphql'
import { User } from '../../entities/User'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Query(() => User, { nullable: true })
  async user(@Ctx() { user }: ServerContext): Promise<User | undefined> {
    return user
  }
}
