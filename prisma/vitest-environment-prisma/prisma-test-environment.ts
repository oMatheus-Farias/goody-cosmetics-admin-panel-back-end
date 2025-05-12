import 'dotenv/config';

import { execSync } from 'node:child_process';
import crypto from 'node:crypto';

import type { Environment } from 'vitest/environments';

import { prisma } from '../../src/app';

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please, provide a DATABASE_URL environment variable');
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', schema);
  return url.toString();
}

export default <Environment>{
  name: 'prisma-test-environment',
  transformMode: 'ssr',
  async setup() {
    const schema = crypto.randomUUID();
    const databaseUrl = generateDatabaseUrl(schema);
    console.log('DATABASE_URL:', databaseUrl);
    process.env.DATABASE_URL = databaseUrl;

    execSync('npx prisma migrate deploy');

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE;`,
        );
        console.log('Dropped database schema:', schema);
        await prisma.$disconnect();
      },
    };
  },
};
