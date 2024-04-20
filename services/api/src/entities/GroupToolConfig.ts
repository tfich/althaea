import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Group } from './Group'
import SubEntity from './SubEntity'
import { Tool } from './Tool'

@ObjectType()
@Entity('group_tool_configs')
export class GroupToolConfig extends SubEntity {
  @Field()
  @PrimaryColumn()
  toolID: string
  @Field(() => Tool)
  @ManyToOne(() => Tool, (tool) => tool.configs)
  @JoinColumn({ name: 'tool_id' })
  tool: Promise<Tool>

  @Field()
  @PrimaryColumn()
  groupID: string
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.members)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>

  @Field(() => [String])
  @Column({ type: 'simple-array', default: '' })
  channels: string[]

  @Field(() => Boolean)
  @Column({ default: true })
  channelsAllowed: boolean

  @Field(() => [String])
  @Column({ type: 'simple-array', default: '' })
  roles: string[]

  @Field(() => Boolean)
  @Column({ default: true })
  rolesAllowed: boolean
}
