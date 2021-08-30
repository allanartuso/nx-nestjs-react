import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from './models/auth.models';

export const GetUserPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);

export const GetToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.authorization.replace('Bearer ', '');
  }
);
