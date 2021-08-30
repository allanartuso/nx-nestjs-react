import { nestAppConfig } from '@dm/nest/shared/config';
import { NestSharedMailerModule } from '@dm/nest/shared/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register(nestAppConfig.auth()),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    NestSharedMailerModule,
  ],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class NestSharedAuthModule {}
