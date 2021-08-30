import { UserProfileEntity } from '@dm/nest/demo-be/user';
import { User } from '@dm/nest/shared/auth';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function getTypeOrmConfig(): TypeOrmModuleOptions {
  console.log('getTypeOrmConfig');

  const config: TypeOrmModuleOptions = {
    type: 'postgres',
    url:
      process.env.NODE_ENV === 'production'
        ? process.env.DATABASE_URL
        : `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PWD}@localhost:5432/demo-be`,
    entities: [User, UserProfileEntity],
    synchronize: true,
  };
  console.log(config);

  return config;
}
