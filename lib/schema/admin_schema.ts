import { SQL, sql } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  timestamp,
  uuid,
  text,
  json,
} from 'drizzle-orm/pg-core';

export const tenant = pgTable('tenant', {
  id: uuid('id').primaryKey(), //   id: integer().generatedAlwaysAsIdentity().primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  dbUrl: varchar('db_url', { length: 512 }).notNull(),
  subdomain: varchar('subdomain', { length: 255 }).notNull().unique(),
  domain: varchar('domain', { length: 255 }).notNull().unique(),
  deleted_at: timestamp('deleted_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const user = pgTable('user', {
  id: uuid('id').primaryKey(), //   id: integer().generatedAlwaysAsIdentity().primaryKey(),
  tenantId: uuid('tenant_id').references(() => tenant.id),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  // bio: text(),
  // preferences: json(),
  deleted_at: timestamp('deleted_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const profile = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => user.id),
  avatar: varchar('avatar', { length: 255 }),
  welcomeMessage: text('gen_name').generatedAlwaysAs(
    (): SQL => sql`hi, ${user.firstName}, ${user.lastName}!`,
  ),
  bio: text(),
  preferences: json(),
  deleted_at: timestamp('deleted_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const role = pgTable('roles', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  updated_at: timestamp('updated_at', { mode: 'string' }),
  created_at: timestamp('created_at', { mode: 'string' }),
  deleted_at: timestamp('deleted_at', { mode: 'string' }),
});

export const userRole = pgTable('user_roles', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => user.id),
  roleId: uuid('role_id').references(() => role.id),
  deleted_at: timestamp('deleted_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const permission = pgTable('permissions', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  deleted_at: timestamp('deleted_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const rolePermission = pgTable('role_permissions', {
  id: uuid('id').primaryKey(),
  roleId: uuid('role_id').references(() => role.id),
  permissionId: uuid('permission_id').references(() => permission.id),
  deleted_at: timestamp('deleted_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const userPermission = pgTable('user_permissions', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => user.id),
  permissionId: uuid('permission_id').references(() => permission.id),
  deleted_at: timestamp('deleted_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const userTenant = pgTable('user_tenant', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => user.id),
  tenantId: uuid('tenant_id').references(() => tenant.id),
  deleted_at: timestamp('deleted_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const session = pgTable('session', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  deleted_at: timestamp('deleted_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});
