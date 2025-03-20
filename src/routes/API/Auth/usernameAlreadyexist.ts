import { action } from '@solidjs/router';
import { db } from '~/Server/db.server';

export const usernameAlreadyexist = action(async (username) => {
  "use server";
  try {
    const result = await db.query('SELECT username FROM users WHERE username = $1', [username]);
    return result.rows.length > 0 ? 'already exist' : 'available';
  } catch (error:any) {
    console.error('Error checking username:', error);
    return `error:${error.message}`; // Ritorna l'errore completo
  }
});
