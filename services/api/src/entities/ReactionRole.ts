import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Group } from './Group'
import SubEntity from './SubEntity'

@ObjectType()
@Entity('reaction_roles')
export class ReactionRole extends SubEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Field()
  groupID: string
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.reactionRoles)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>

  @Field()
  @Column()
  emoji: string

  @Field()
  @Column()
  roleID: string
}
