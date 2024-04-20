import { Field, InputType } from 'type-graphql'

@InputType()
export class ToolConfig {
  @Field(() => [String])
  channels: string[]

  @Field()
  channelsAllowed: boolean

  @Field(() => [String])
  roles: string[]

  @Field()
  rolesAllowed: boolean
}

export default ToolConfig
