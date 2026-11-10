import type { createClient } from 'redis';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');
export const REDIS_REPO = Symbol('REDIS_REPO');

export type RedisClient = ReturnType<typeof createClient>;

export interface IUserTemp {
  name: string;
  email: string;
  password: string;
  otp: string;
}

export interface IRedisRepo {
  saveUserData(data: IUserTemp): Promise<boolean>;
  getUserData(email: string): Promise<IUserTemp | null>;
  editUserData(otp: string, email: string): Promise<boolean>;
  deleteUserData(email: string): Promise<number>;
}