import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { GroupResource } from '../../entities/GroupRescource'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => GroupResource)
  async addResource(
    @Ctx() { group }: ServerContext,
    @Arg('title') title: string,
    @Arg('link') link: string
  ): Promise<GroupResource> {
    return GroupResource.create({ groupID: group?.id!, title, link }).save()
  }
}
