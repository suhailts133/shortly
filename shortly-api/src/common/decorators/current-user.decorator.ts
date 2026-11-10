import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { JwtData } from '../../modules/auth/jwt/jwt.types';

export const CurrentUser = createParamDecorator(
  (field: keyof JwtData | undefined, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest<Request>().user as JwtData;
    return field ? user[field] : user;
  },
);