import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { RequestMethod } from '@nestjs/common';
import { AppModule } from './app.module';
import type { Env } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<Env, true>>(ConfigService);

  app.setGlobalPrefix('api', {
    exclude: [{ path: ':shortId', method: RequestMethod.GET }],
  });

  app.enableCors({
    origin: config.get('CLIENT_URL', { infer: true }),
    credentials: true,
  });

  await app.listen(config.get('PORT', { infer: true }));
}

bootstrap();