import { NestDemoBeProjectsModule } from '@dm/nest/demo-be/projects';
import { NestDemoBeUserModule } from '@dm/nest/demo-be/user';
import { NestSharedAuthModule } from '@dm/nest/shared/auth';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from '../config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(getTypeOrmConfig()), NestSharedAuthModule, NestDemoBeUserModule, NestDemoBeProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
