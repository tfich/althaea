import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { GroupResource } from '../../entities/GroupRescource'
import ServerContext from '../../types/ServerContext'

@Resolver()
export default class {
  @Mutation(() => GroupResource)
  async removeResource(@Ctx() { group }: ServerContext, @Arg('id') id: number): Promise<GroupResource> {
    // TODO: add ActivityEvent
    const resource = await GroupResource.findOneOrFail({ id })

    await resource.remove()

    return Object.assign(resource, { id })
  }
}
