import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Group } from './Group'
import { LoyaltyPrizeClaim } from './LoyaltyPrizeClaims'
import SubEntity from './SubEntity'

@ObjectType()
@Entity('loyalty_prizes')
export class LoyaltyPrize extends SubEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  groupID: string
  @ManyToOne(() => Group, (group) => group.loyaltyPrizes)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>

  @OneToMany(() => LoyaltyPrizeClaim, (prizeClaim) => prizeClaim.member, { onDelete: 'CASCADE' })
  claims: Promise<LoyaltyPrizeClaim[]>

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  cost: number
}
