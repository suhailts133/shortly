import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT, type IRedisRepo, type IUserTemp, type RedisClient } from './redis.interface';

const TTL_SECONDS = 300;

@Injectable()
export class RedisRepository implements IRedisRepo {
  constructor(@Inject(REDIS_CLIENT) private readonly client: RedisClient) {}

  // prefix so the key can never collide with other things stored under an email
  private key(email: string): string {
    return `pending-user:${email}`;
  }

  async saveUserData(data: IUserTemp): Promise<boolean> {
    const res = await this.client.set(this.key(data.email), JSON.stringify(data), { EX: TTL_SECONDS });
    return res === 'OK';
  }

  async getUserData(email: string): Promise<IUserTemp | null> {
    const raw = await this.client.get(this.key(email));
    return raw ? (JSON.parse(raw) as IUserTemp) : null;
  }

  async editUserData(otp: string, email: string): Promise<boolean> {
    const existing = await this.getUserData(email);
    if (!existing) return false;
    return this.saveUserData({ ...existing, otp });
  }

  async deleteUserData(email: string): Promise<number> {
    return this.client.del(this.key(email));
  }
}