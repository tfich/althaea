import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Group } from './Group'
import SubEntity from './SubEntity'

@ObjectType()
@Entity('keyword_pinger_entries')
export class KeywordPingerEntry extends SubEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Field()
  groupID: string
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.keywordPingerEntries)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>

  @Field()
  @Column()
  keywordSet: string

  @Field(() => [String])
  @Column({ type: 'simple-array', default: '' })
  channels: string[]

  @Field(() => [String])
  @Column({ type: 'simple-array', default: '' })
  pingRoles: string[]
}
