import { Field, ObjectType, registerEnumType } from 'type-graphql'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import ToolCategory from '../types/ToolCategory'
import ToolType from '../types/ToolType'
import { GroupToolConfig } from './GroupToolConfig'
import SubEntity from './SubEntity'

registerEnumType(ToolType, { name: 'ToolType' })
registerEnumType(ToolCategory, { name: 'ToolCategory' })

@ObjectType()
@Entity('tools')
export class Tool extends SubEntity {
  @Field()
  @PrimaryColumn()
  id: string

  @Field()
  @Column({ unique: true })
  name: string

  @Field()
  @Column()
  description: string

  @Field(() => ToolCategory)
  @Column({ type: 'enum', enum: ToolCategory })
  category: ToolCategory

  @Field(() => ToolType)
  @Column({ type: 'enum', enum: ToolType })
  type: ToolType

  @Field({ nullable: true })
  @Column({ nullable: true })
  commandTrigger?: string

  @Field()
  @Column({ default: false })
  default: boolean

  @Field()
  @Column({ default: false })
  free: boolean

  @Field()
  @Column({ default: false })
  featured: boolean

  @Field(() => [GroupToolConfig])
  @OneToMany(() => GroupToolConfig, (config) => config.tool, { onDelete: 'CASCADE' })
  configs: Promise<GroupToolConfig[]>
}
