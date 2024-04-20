import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import SubEntity from './SubEntity'

@ObjectType()
@Entity('coupons')
export class Coupon extends SubEntity {
  @Field()
  @PrimaryColumn()
  id: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  userID?: string

  @Field()
  @Column({ default: false })
  claimed: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  trialPeriodDays?: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  percentOff?: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  amountOff?: number

  @Field()
  @Column({ default: false })
  forever: boolean
}
