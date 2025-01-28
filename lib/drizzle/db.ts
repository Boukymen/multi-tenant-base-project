import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate as migrateNode } from 'drizzle-orm/node-postgres/migrator';
import { eq } from 'drizzle-orm';
import * as admin_schema from '../schema/admin_schema';
import { Logger } from 'drizzle-orm/logger';
import { Tenant } from '@/types';
import { NodePgDatabase } from 'drizzle-orm/node-postgres/driver';

class QueryLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.debug('___QUERY___');
    console.debug(query);
    console.debug(params);
    console.debug('___END_QUERY___');
  }
}

const globalDb = drizzle(process.env.ADMIN_DB_URL!, {
  logger: new QueryLogger(),
});

export const getTenantDb = async (
  tenantName: string,
): Promise<Promise<NodePgDatabase<Record<string, never>>> | null> => {
  const tenant: Tenant[] = await globalDb
    .select()
    .from(admin_schema.tenant)
    .where(eq(admin_schema.tenant.name, tenantName));

  if (!tenant) throw new Error('Tenant not found');
  return tenant?.[0]?.dbUrl ? drizzle(tenant?.[0].dbUrl) : null;
};
export const getTenantDbById = async (
  tenantId: string,
): Promise<Promise<NodePgDatabase<Record<string, never>>> | null> => {
  const tenant: Tenant[] = await globalDb
    .select()
    .from(admin_schema.tenant)
    .where(eq(admin_schema.tenant.id, tenantId));

  if (!tenant) throw new Error('Tenant not found');
  return tenant?.[0]?.dbUrl ? drizzle(tenant?.[0].dbUrl) : null;
};

export const migrateAdminDB = async () => {
  const admin_db = drizzle(process.env.ADMIN_DB_URL!);
  // Run migrations here if required
  await migrateNode(admin_db, { migrationsFolder: './drizzle/admin' });
};
export const migrateTenantDB = async (tenantId: string) => {
  const tenantDb = await getTenantDb(tenantId);
  if (!tenantDb) throw new Error(`Tenant ${tenantId} not found`);

  await migrateNode(tenantDb, { migrationsFolder: './drizzle/tenant' });
  // Run migrations here if required
};

export { globalDb };
