import { Field, ObjectType, registerEnumType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import TicketType from '../types/TicketType'
import { Group } from './Group'
import { GroupMember } from './GroupMember'
import SubEntity from './SubEntity'

registerEnumType(TicketType, { name: 'TicketType' })

@ObjectType()
@Entity('tickets')
export class Ticket extends SubEntity {
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
  memberID: string
  @Field(() => GroupMember)
  @ManyToOne(() => GroupMember, (member) => member.successTweets)
  @JoinColumn([
    { referencedColumnName: 'memberID', name: 'member_id' },
    { referencedColumnName: 'groupID', name: 'group_id' }
  ])
  member: Promise<GroupMember>

  @Field(() => TicketType)
  @Column({ type: 'enum', enum: TicketType })
  type: TicketType

  @Field()
  @Column()
  channelID: string
}
