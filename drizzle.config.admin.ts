import 'dotenv/config';

import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/admin_schema.ts',
  out: './drizzle/admin',
  dialect: 'postgresql',
  dbCredentials: {
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    user: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_NAME),
    ssl: process.env.DB_HOST !== 'localhost',
  },
  migrations: {
    schema: 'public',
  },
} satisfies Config;
