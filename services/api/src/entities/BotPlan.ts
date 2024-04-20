import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Group } from './Group'
import SubEntity from './SubEntity'

@ObjectType()
@Entity('bot_plans')
export class BotPlan extends SubEntity {
  @Field()
  @PrimaryColumn()
  id: string

  @Field()
  @Column({ unique: true })
  name: string

  @Field()
  @Column({ default: true })
  active: boolean

  @Field()
  @Column({ unique: true })
  stripePriceID: string

  @Field()
  @Column({ default: 0 })
  hierarchy: number

  @Field(() => [String])
  @Column({ type: 'simple-array', default: '' })
  highlights: string[]

  @Field(() => Boolean)
  @Column()
  customBot: boolean

  @Field()
  @Column()
  adminLimit: number

  @Field(() => Boolean)
  @Column()
  allowPaidTools: boolean

  @Field(() => [Group])
  @OneToMany(() => Group, (group) => group.botPlan)
  groups: Promise<Group[]>
}
