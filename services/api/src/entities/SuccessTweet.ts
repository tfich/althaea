import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Group } from './Group'
import { GroupMember } from './GroupMember'
import SubEntity from './SubEntity'

@ObjectType()
@Entity('success_tweets')
export class SuccessTweet extends SubEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  groupID: string
  @ManyToOne(() => Group, (group) => group.successTweets)
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

  @Field()
  @Column()
  imageUrl: string

  @Field()
  @Column()
  caption: string

  @Field()
  @Column()
  channelID: string

  @Field()
  @Column()
  messageID: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  followUpMessageID?: string

  @Field()
  @Column({ default: false })
  queued: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  tweetID?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  tweetUrl?: string
}
