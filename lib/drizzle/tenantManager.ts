import { globalDb } from './db';
import { tenant } from '../schema/admin_schema';
import { eq } from 'drizzle-orm';
export const createTenant = async (name: string, dbUrl: string) => {
  const tenantId = crypto.randomUUID();
  await globalDb.insert(tenant).values({ id: tenantId, name, dbUrl });
  return tenantId;
};

export const deleteTenant = async (name: string) => {
  await globalDb
    .update(tenant)

    .set({ deleted_at: new Date() })
    .where(eq(tenant.name, name));
};

export const listTenants = async () => {
  return await globalDb.select().from(tenant);
};
