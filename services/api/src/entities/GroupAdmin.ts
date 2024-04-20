import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, Unique } from 'typeorm'
import { ActivityEntry } from './ActivityEntry'
import { Group } from './Group'
import SubEntity from './SubEntity'
import { User } from './User'

@ObjectType()
@Entity('group_admins')
@Unique('user_group_merge', ['userID', 'groupID'])
export class GroupAdmin extends SubEntity {
  @Field()
  @PrimaryColumn()
  userID: string
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.adminGroups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>

  @Field()
  @PrimaryColumn()
  groupID: string
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.admins)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>

  @Field(() => [ActivityEntry])
  @OneToMany(() => ActivityEntry, (entry) => entry.group, { onDelete: 'CASCADE' })
  activityEntries: Promise<ActivityEntry[]>

  @Field(() => Boolean)
  @Column({ default: false })
  isOwner: boolean
}
