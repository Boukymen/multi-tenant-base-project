import { NewUser, Tenant } from '@/types';
import { getTenantDb } from '@/lib/drizzle/db';
import { user } from '@/lib/schema/admin_schema';
import { TransactionRollbackError, eq } from 'drizzle-orm';
import { getTenantByName } from '@/server/api/tenants';

export const createUser = async (tenantName: string, newUser: NewUser) => {
  try {
    const tenant: Tenant = await getTenantByName(tenantName);
    const tenantDb = await getTenantDb(tenantName);
    if (!tenantDb) throw new Error(`Tenant, ${tenantName} not found`);
    await tenantDb.transaction(async (trx) => {
      const newUserCreated = await trx
        .insert(user)
        .values({
          id: crypto.randomUUID(),
          tenantId: tenant.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          password: newUser.password, // In production, hash the password using bcrypt or similar library
        })
        .returning({
          id: user.id, // Return the id of the newly created user
        });
      if (!newUserCreated) {
        // This exception is caught by drizzle transaction block and rollback error is rethrown
        // throw new TRPCError({
        //   code: "BAD_REQUEST",
        //   message: "Balance low"
        // });
        trx.rollback();
      }
    });
  } catch (tRE: unknown) {
    console.error(tRE);
    if (tRE instanceof TransactionRollbackError) {
      return {
        statusCode: 400,
        message: tRE?.message ?? 'Transaction rollback error on user creation',
        cause: tRE?.cause ?? 'Unknown cause',
      };
    }
  }
};

export const listUsers = async (tenantName: string) => {
  const tenantDb = await getTenantDb(tenantName);
  if (!tenantDb) throw new Error(`Tenant, ${tenantName} not found`);
  return await tenantDb.select().from(user);
};

export const deleteUser = async (tenantName: string, email: string) => {
  const tenantDb = await getTenantDb(tenantName);
  if (!tenantDb) throw new Error(`Tenant, ${tenantName} not found`);
  await tenantDb
    .update(user)
    .set({ deleted_at: new Date() })
    .where(eq(user.email, email));
};
