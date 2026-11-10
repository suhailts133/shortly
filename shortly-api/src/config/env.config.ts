import { z } from 'zod';

export const envSchema = z.object({
  // app
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(5000),
  CLIENT_URL: z.string().min(1, 'CLIENT_URL is required'),

  // db & cache
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  REDIS_URI: z.string().min(1, 'REDIS_URI is required'),

  // brevo
  BREVO_API_KEY: z.string().min(1, 'BREVO_API_KEY is required'),
  BREVO_SENDER: z.string().min(1, 'BREVO_SENDER is required'),

  // jwt
  JWT_ACCESS_SECRET: z.string().min(16, 'JWT_ACCESS_SECRET must be at least 16 chars'),
  JWT_REFRESH_SECRET: z.string().min(16, 'JWT_REFRESH_SECRET must be at least 16 chars'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),

  // url
  BASE: z.string().min(1, 'BASE is required for url generation'),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    throw new Error(`Invalid environment variables:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}