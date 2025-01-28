import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import * as admin_schema from '@/lib/schema/admin_schema';
import * as tenant_schema from '@/lib/schema/tenant_schema';

export type userTenant = typeof admin_schema.userTenant.$inferSelect; // return type when queried
export type newUserTenant = typeof admin_schema.userTenant.$inferInsert; // insert type
export type Session = InferSelectModel<typeof admin_schema.session>;
export type SessionX = admin_schema.session.$inferSelect; // return type when queried
export type NewSession = InferInsertModel<typeof admin_schema.session>;
export type Tenant = InferSelectModel<typeof admin_schema.tenant>;
export type NewTenant = InferInsertModel<typeof admin_schema.tenant>;
export type Features = InferSelectModel<typeof tenant_schema.features>;
export type User = admin_schema.user.$inferSelect; // return type when queried
export type NewUser = admin_schema.user.$inferInsert; // insert type

// type user as optional parameter
export type OptionalUser = admin_schema.user.$inferSelect | null;
export type OptionalSession = InferSelectModel<
  typeof admin_schema.session
> | null;

export type TType = {
  [x: string]: unknown;
};

// To retrieve a type from your table schema for select and insert queries, you can make use of our type helpers.
// type SelectUser = typeof users.$inferSelect;
// type InsertUser = typeof users.$inferInsert;
// // or
// type SelectUser = typeof users._.$inferSelect;
// type InsertUser = typeof users._.$inferInsert;
// // or
// type SelectUser = InferSelectModel<typeof users>;
// type InsertUser = InferInsertModel<typeof users>;
