import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  CreateDateColumn,
  DeepPartial,
  getRepository,
  ObjectType as EntityObjectType,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
export default class SubEntity extends BaseEntity {
  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  public static async findOrCreate<T extends BaseEntity>(this: EntityObjectType<T>, entity: DeepPartial<T>) {
    const repo = getRepository(this)
    const id = repo.getId(entity as any)
    return (await repo.findOne(id)) || (await repo.create(entity).save())
  }

  public static async createOrUpdate<T extends BaseEntity>(this: EntityObjectType<T>, entity: DeepPartial<T>) {
    const repo = getRepository(this)
    const id = repo.getId(entity as any)
    const row = await repo.findOne(id)
    return row ? Object.assign(row, entity).save() : repo.create(entity).save()
  }
}
