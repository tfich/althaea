import { Query, Resolver } from 'type-graphql'
import { Proxy } from '../../entities/Proxy'

@Resolver()
export default class {
  @Query(() => [Proxy])
  async proxies(): Promise<Proxy[]> {
    return Proxy.find()
  }
}
