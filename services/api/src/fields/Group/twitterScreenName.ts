import { FieldResolver, Resolver, Root } from 'type-graphql'
import TwitterClient from '../../controllers/TwitterClient'
import { Group } from '../../entities/Group'

@Resolver(() => Group)
export default class {
  @FieldResolver(() => String, { nullable: true })
  async twitterScreenName(@Root() group: Group): Promise<string | undefined> {
    const client = new TwitterClient(group)
    return client.getScreenName()
  }
}
