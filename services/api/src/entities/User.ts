import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { GroupAdmin } from './GroupAdmin'
import SubEntity from './SubEntity'

@ObjectType()
@Entity('users')
export class User extends SubEntity {
  @Field()
  @PrimaryColumn()
  id: string

  @Field(() => [GroupAdmin])
  @OneToMany(() => GroupAdmin, (groupAdmin) => groupAdmin.user, { onDelete: 'CASCADE' })
  adminGroups: Promise<GroupAdmin[]>

  @Field({ nullable: true })
  @Column({ nullable: true })
  selectedGroupID?: string

  @Column({ nullable: true })
  email?: string

  @Column({ nullable: true })
  discordAccessToken?: string

  @Column({ nullable: true })
  discordRefreshToken?: string
}
