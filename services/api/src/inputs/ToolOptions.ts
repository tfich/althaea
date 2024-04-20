import { Field, InputType } from 'type-graphql'
import ToolCategory from '../types/ToolCategory'
import ToolType from '../types/ToolType'

@InputType()
export class ToolOptions {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  description: string

  @Field(() => ToolCategory)
  category: ToolCategory

  @Field(() => ToolType)
  type: ToolType

  @Field({ nullable: true })
  commandTrigger?: string

  @Field({ defaultValue: false })
  default: boolean

  @Field({ defaultValue: false })
  free: boolean

  @Field({ defaultValue: false })
  featured: boolean
}

export default ToolOptions
