import { AnyPgTable } from 'drizzle-orm/pg-core';
import { globalDb } from '@/lib/drizzle/db';
import { eq } from 'drizzle-orm';

export async function getItem<T extends AnyPgTable>( //  <-- If you're using pg
  schema: T,
): Promise<T['$inferSelect']> {
  const query = globalDb.select().from(schema).limit(1);

  const [item] = await query;

  return item;
}

export async function getItems<T extends AnyPgTable>( //  <-- If you're using pg
  schema: T,
): Promise<T['$inferSelect'][]> {
  const query = await globalDb.select().from(schema);

  const items = query;

  return items;
}

export async function createItem<T extends AnyPgTable>( //  <-- If you're using pg
  schema: T,
  data: Partial<T['$inferInsert']>,
): Promise<T['$inferSelect']> {
  if (!data) {
    throw new Error('No data provided to create item');
  }
  const query = await globalDb.insert(schema).values(data).returning();

  const [item] = query;

  return item;
}

export async function updateItem<T extends AnyPgTable>( //  <-- If you're using pg
  schema: T,
  findingKey: keyof T,
  id: string,
  data: Partial<T['$inferInsert']>,
): Promise<T['$inferSelect']> {
  if (!data) {
    throw new Error('No data provided to update item');
  }
  if (!id || !findingKey) {
    throw new Error('No id provided to update item');
  }

  const query = await globalDb
    .update(schema)
    .set(data)
    .where(eq(schema[findingKey], id))
    .returning();

  const [item] = query;

  return item;
}

// deleteItem using update delete_at

export async function deleteItem<T extends AnyPgTable>( //  <-- If you're using pg
  schema: T,
  findingKey: keyof T,
  id: string,
  // data: Partial<T["$inferInsert"]> as { [Key in keyof T["_"]["columns"] & string]: T["_"]["columns"][Key]["_"]["data"] | null },
): Promise<T['$inferSelect']> {
  if (!id || !findingKey) {
    throw new Error('No id provided to delete item');
  }
  const query = await globalDb
    .update(schema)
    .set({ deleted_at: new Date() })
    .where(eq(schema[findingKey], id))
    .returning();

  const [item] = query;

  return item;
}
