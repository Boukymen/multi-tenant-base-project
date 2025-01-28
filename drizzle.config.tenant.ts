import 'dotenv/config';

import type { Config } from 'drizzle-kit';
// https://orm.drizzle.team/docs/goodies#multi-project-schema
export default {
  schema: './lib/tenant_schema.ts',
  out: './drizzle/tenant',
  dialect: 'postgresql',
  dbCredentials: {
    host: String(process.env.DB_TEST_HOST),
    port: Number(process.env.DB_TEST_PORT),
    user: String(process.env.DB_TEST_USERNAME),
    password: String(process.env.DB_TEST_PASSWORD),
    database: String(process.env.DB_TEST_NAME),
    ssl: process.env.DB_TEST_HOST !== 'localhost',
  },
  tablesFilter: ['project1_*', 'project2_*'],
  migrations: {
    schema: 'public',
  },
} satisfies Config;
