import { nestAppConfig } from '@dm/nest/shared/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtPayload } from './models/auth.models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: nestAppConfig.auth().secret,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return { ...payload };
  }
}
