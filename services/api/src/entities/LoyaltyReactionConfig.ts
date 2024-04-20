import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Group } from './Group'
import SubEntity from './SubEntity'

@ObjectType()
@Entity('loyalty_reaction_configs')
export class LoyaltyReactionConfig extends SubEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  groupID: string
  @ManyToOne(() => Group, (group) => group.loyaltyReactionConfigs)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>

  @Field()
  @Column()
  emoji: string

  @Field()
  @Column()
  amount: number

  @Field(() => [String])
  @Column({ type: 'simple-array', default: '' })
  channels: string[]
}
