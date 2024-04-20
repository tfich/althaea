import { Field, ObjectType, registerEnumType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import ActivityEvent from '../types/ActivityEvent'
import { Group } from './Group'
import { GroupAdmin } from './GroupAdmin'
import SubEntity from './SubEntity'

registerEnumType(ActivityEvent, { name: 'ActivityEvent' })

@ObjectType()
@Entity('activity_entries')
export class ActivityEntry extends SubEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => ActivityEvent)
  @Column({ type: 'enum', enum: ActivityEvent })
  event: ActivityEvent

  @Column()
  @Field()
  groupID: string
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.activityEntries)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>

  @Column()
  @Field()
  adminID: string
  @Field(() => GroupAdmin)
  @ManyToOne(() => GroupAdmin, (admin) => admin.activityEntries)
  @JoinColumn([
    { referencedColumnName: 'userID', name: 'admin_id' },
    { referencedColumnName: 'groupID', name: 'group_id' }
  ])
  admin: Promise<GroupAdmin>

  @Column({ nullable: true })
  info?: string
}
