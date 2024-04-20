import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import env from './env'
import SnakeNamingStrategy from './utils/namingStrategy'

const ormconfig: PostgresConnectionOptions = {
  name: 'default',
  type: 'postgres',
  url: env.PSQL_URI,
  synchronize: env.isDev,
  migrationsRun: !env.isDev,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['build/entities/*.*'],
  migrations: ['build/migrations/*.*'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations'
  },
  logging: false
}

export = ormconfig
