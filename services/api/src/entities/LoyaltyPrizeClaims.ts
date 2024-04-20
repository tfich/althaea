import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Group } from './Group'
import { GroupMember } from './GroupMember'
import { LoyaltyPrize } from './LoyaltyPrize'
import SubEntity from './SubEntity'

@ObjectType()
@Entity('loyalty_prize_claims')
export class LoyaltyPrizeClaim extends SubEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  groupID: string
  @ManyToOne(() => Group, (group) => group.loyaltyPrizes)
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
  prizeID: number
  @Field(() => LoyaltyPrize)
  @ManyToOne(() => LoyaltyPrize, (prize) => prize.claims)
  @JoinColumn({ name: 'prize_id' })
  prize: Promise<LoyaltyPrize>

  @Field()
  @Column({ default: false })
  fulfilled: boolean
}
