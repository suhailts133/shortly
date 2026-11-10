import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { Env } from '../../../config/env.config';
import type { JwtData } from './jwt.types';

@Injectable()
export class TokenService {
  constructor(private readonly config: ConfigService<Env, true>) {}

  signAccess(payload: JwtData): string {
    return jwt.sign(payload, this.config.get('JWT_ACCESS_SECRET', { infer: true }), {
      expiresIn: this.config.get('JWT_ACCESS_EXPIRY', { infer: true }) as StringValue,
    });
  }

  signRefresh(payload: JwtData): string {
    return jwt.sign(payload, this.config.get('JWT_REFRESH_SECRET', { infer: true }), {
      expiresIn: this.config.get('JWT_REFRESH_EXPIRY', { infer: true }) as StringValue,
    });
  }

  verifyRefresh(token: string): JwtData {
    try {
      return jwt.verify(token, this.config.get('JWT_REFRESH_SECRET', { infer: true })) as JwtData;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}