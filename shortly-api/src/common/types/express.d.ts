import type { JwtData } from '../../modules/auth/jwt/jwt.types';

declare global {
  namespace Express {
    interface Request {
      user?: JwtData;
    }
  }
}

export {};