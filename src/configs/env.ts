import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(8080),
  APP_URL: z.string().url(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  UPLOADTHING_TOKEN: z.string(),
  MAIL_HOST: z.string(),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format());
  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
