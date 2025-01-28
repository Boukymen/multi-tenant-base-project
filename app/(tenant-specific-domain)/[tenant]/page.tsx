import { globalDb } from '@/lib/drizzle/db';
import { users } from '@/lib/schema/admin_schema';
import { Users } from '@/types/user';
import { eq } from 'drizzle-orm';

export default async function TenantPage({
  params,
}: {
  params: { tenant: string };
}) {
  const tenantUsers: Users[] = await globalDb
    .select()
    .from(users)
    .where(eq(users.tenantId, params.tenant));

  return (
    <div>
      <h1>Welcome to {params.tenant} Space</h1>
      <ul>
        {tenantUsers.map(
          (user: { id: number; name: string }, index: number) => (
            <li key={index}>{user.name}</li>
          ),
        )}
      </ul>
    </div>
  );
}
