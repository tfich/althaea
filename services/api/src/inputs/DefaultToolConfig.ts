import { Field, InputType } from 'type-graphql'

@InputType()
export class DefaultToolConfig {
  @Field(() => [String])
  defaultChannels: string[]

  @Field()
  defaultChannelsAllowed: boolean

  @Field(() => [String])
  defaultRoles: string[]

  @Field()
  defaultRolesAllowed: boolean
}

export default DefaultToolConfig
