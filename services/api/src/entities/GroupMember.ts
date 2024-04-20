import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { Group } from './Group'
import { LoyaltyPrizeClaim } from './LoyaltyPrizeClaims'
import SubEntity from './SubEntity'
import { SuccessTweet } from './SuccessTweet'
import { Ticket } from './Ticket'

@ObjectType()
@Entity('group_members')
export class GroupMember extends SubEntity {
  @Field()
  @PrimaryColumn()
  memberID: string

  @Field()
  @PrimaryColumn()
  groupID: string
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.members)
  @JoinColumn()
  group: Promise<Group>

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  discordAccessToken?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  discordRefreshToken?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  smsNumber?: string

  @Field()
  @Column({ default: 0 })
  currentLoyaltyPoints: number

  @Field()
  @Column({ default: 0 })
  lifetimeLoyaltyPoints: number

  @Field(() => [LoyaltyPrizeClaim])
  @OneToMany(() => LoyaltyPrizeClaim, (prizeClaim) => prizeClaim.member, { onDelete: 'CASCADE' })
  loyaltyPrizeClaims: Promise<LoyaltyPrizeClaim[]>

  @OneToMany(() => SuccessTweet, (tweet) => tweet.member, { onDelete: 'CASCADE' })
  successTweets: Promise<SuccessTweet[]>

  @OneToMany(() => Ticket, (ticket) => ticket.member, { onDelete: 'CASCADE' })
  tickets: Promise<Ticket[]>

  public async adjustLoyaltyPoints(pointDifference: number) {
    this.currentLoyaltyPoints = this.currentLoyaltyPoints + pointDifference
    if (pointDifference > 0) {
      this.lifetimeLoyaltyPoints = this.lifetimeLoyaltyPoints + pointDifference
    }
    return this.save()
  }
}
