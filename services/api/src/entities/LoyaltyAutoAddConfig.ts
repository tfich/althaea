import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Group } from './Group'
import SubEntity from './SubEntity'

@ObjectType()
@Entity('loyalty_auto_add_configs')
export class LoyaltyAutoAddConfig extends SubEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  groupID: string
  @ManyToOne(() => Group, (group) => group.loyaltyAutoAddConfigs)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>

  @Field()
  @Column()
  channelID: string

  @Field()
  @Column()
  amount: number
}
