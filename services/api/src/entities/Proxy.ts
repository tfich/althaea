import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import SubEntity from './SubEntity'

@ObjectType()
@Entity('proxies')
export class Proxy extends SubEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  proxy: string
}
