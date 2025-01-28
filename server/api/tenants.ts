import { globalDb } from '@/lib/drizzle/db';
import { tenant } from '@/lib/schema/admin_schema';
import { eq } from 'drizzle-orm';
import { Tenant } from '@/types';

export const createTenant = async (name: string, dbUrl: string) => {
  await globalDb
    .insert(tenant)
    .values({ id: crypto.randomUUID(), name, dbUrl });
};

export const getTenantByName = async (name: string): Promise<Tenant> => {
  const res = await globalDb.select().from(tenant).where(eq(tenant.name, name));
  return res?.[0] ?? null;
};

export const loginTenant = async (tenantName: string) => {
  const tenant = await getTenantByName(tenantName);
  if (!tenant) throw new Error('Tenant not found');
  return tenant;
};
