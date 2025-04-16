import { Pool } from 'pg';
import { H3Event, defineEventHandler, getCookie, deleteCookie, createError } from 'h3';
import crypto from 'crypto';

export default defineEventHandler(async (event: H3Event) => {
    const db = event.context.db as Pool | undefined;
     if (!db) {
      console.error("logoutHandler: Database connection not found in event context");
    }

    const refreshToken = getCookie(event, 'refresh_token');
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/'
    };

    try {
        if (refreshToken && db) {
        const tokenHash = crypto
            .createHash('sha256')
            .update(refreshToken)
            .digest('hex');
        const deleteSql = 'DELETE FROM refresh_tokens WHERE token_hash = $1';
        await db.query(deleteSql, [tokenHash]);
        }
    } catch (error) {
        console.error('Error invalidating refresh token during logout:', error);
    }

    try {
         deleteCookie(event, 'refresh_token', cookieOptions);
    } catch (cookieError) {
        console.error("Error clearing refresh token cookie during logout:", cookieError);
    }

    // Usa event.context.auth se impostato dal middleware requireAuth
    const userId = event.context.auth?.userId;
    if (userId && db) {
        try {
        const deleteSessionSql = 'DELETE FROM active_sessions WHERE user_id = $1';
        await db.query(deleteSessionSql, [userId]);
        } catch (error) {
        console.error('Error clearing active session during logout:', error);
        }
    }

    return { success: true };
});