import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { Env } from '../../config/env.config';
import { REDIS_CLIENT, REDIS_REPO } from './redis.interface';
import { RedisRepository } from './redis.repo';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: async (config: ConfigService<Env, true>) => {
        const client = createClient({ url: config.get('REDIS_URI', { infer: true }) });
        client.on('error', (err) => console.error('Redis error:', err));
        await client.connect();
        return client;
      },
    },
    { provide: REDIS_REPO, useClass: RedisRepository },
  ],
  exports: [REDIS_REPO],
})
export class RedisModule {}