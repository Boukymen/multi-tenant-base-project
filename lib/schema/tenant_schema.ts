import {
  varchar,
  integer,
  timestamp,
  uuid,
  pgTableCreator,
} from 'drizzle-orm/pg-core';

const pgTable = pgTableCreator((name) => `tenant_${name}`);

export const features = pgTable('features', {
  id: uuid('id').primaryKey(), //
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  enabled: integer('enabled').notNull(),
  deleted_at: timestamp('deleted_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});
