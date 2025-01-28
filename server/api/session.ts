import { NewSession, Session, User } from '@/types';
import { globalDb } from '@/lib/drizzle/db';
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { session, user } from '@/lib/schema/admin_schema';
import { eq } from 'drizzle-orm';

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
}

export async function createSession(
  token: string,
  userId: string,
): Promise<NewSession> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const newSession: NewSession = {
    // have try first TSOptionalType, Partial<Session>,  but NewSession is the correct one,
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await globalDb.insert(session).values(newSession);
  return newSession;
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result: { userData: User; sessionData: Session }[] = await globalDb
    .select({ userData: user, sessionData: session })
    .from(session)
    .innerJoin(user, eq(session.userId, user.id))
    .where(eq(session.id, sessionId));
  if (result.length < 1) {
    return { session: null, user: null };
  }
  const { userData, sessionData } = result[0];
  if (Date.now() >= sessionData.expiresAt.getTime()) {
    await globalDb.delete(session).where(eq(session.id, session.id));
    return { session: null, user: null };
  }
  if (
    Date.now() >=
    sessionData.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
  ) {
    sessionData.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await globalDb
      .update(session)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(session.id, session.id));
  }
  return { session: sessionData, user: userData };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await globalDb
    .update(session)
    .set({ deleted_at: new Date() })
    .where(eq(session.id, sessionId));
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
