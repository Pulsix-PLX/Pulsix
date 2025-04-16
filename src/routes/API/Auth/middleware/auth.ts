import { createError, defineEventHandler, getHeader, H3Event } from 'h3';
import { Pool } from 'pg';
import { verifyAccessToken } from '../utils/auth.server'; // Adjust path as needed

// Type augmentation for event context (o definisci in un file .d.ts globale)
declare module 'h3' {
  interface H3EventContext {
    db?: Pool;
    auth?: {
      userId: string;
      tokenId: string;
    };
    // Deprecato se si usa event.context.auth, ma mantenuto per compatibilità se logout lo usa ancora
    userId?: string;
    tokenId?: string;
  }
}

export const requireAuth = defineEventHandler(async (event: H3Event) => {
  const db = event.context.db;
  if (!db) {
    console.error('requireAuth: Database connection not found in event context');
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error (DB Context)' });
  }

  const authHeader = getHeader(event, 'authorization') || '';

  if (!authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required',
      data: { code: 'NO_AUTH_HEADER' },
    });
  }

  const token = authHeader.substring(7);
  const payload = verifyAccessToken(token);

  if (!payload) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token',
      data: { code: 'INVALID_TOKEN' },
    });
  }

  event.context.auth = { userId: payload.userId, tokenId: payload.jti };
  event.context.userId = payload.userId; // Mantenuto per compatibilità potenziale

  try {
    const sql = `UPDATE active_sessions SET last_active = CURRENT_TIMESTAMP WHERE user_id = $1`;
    await db.query(sql, [payload.userId]);
  } catch (error) {
    console.error('Error updating session activity:', error);
  }
});
