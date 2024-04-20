import { Field, InputType } from 'type-graphql'
import BotStatusType from '../types/BotStatusType'

@InputType()
export class BotConfig {
  @Field()
  botEnabled: boolean

  @Field(() => BotStatusType, { nullable: true })
  botStatusType?: BotStatusType

  @Field({ nullable: true })
  botStatus?: string

  @Field({ nullable: true })
  commandPrefix?: string

  @Field({ nullable: true })
  embedColor?: string

  @Field({ nullable: true })
  embedFooter?: string
}

export default BotConfig
