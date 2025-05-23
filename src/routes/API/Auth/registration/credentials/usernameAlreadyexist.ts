import { action } from '@solidjs/router';
import { db } from '../../../../../server/db.server';

export const usernameAlreadyexist = action(async (username) => {
  'use server';
  try {
    console.log(username);
    const result = await db.query('SELECT username FROM auth.users WHERE username=$1', [username]);
    console.log(result.rows);
    return result.rows.length > 0 ? 'already exist' : 'available';
  } catch (error: any) {
    console.error('Error checking username:', error);
    return `error:${error.message}`; // Ritorna l'errore completo
  }
}, 'usernameAlreadyexist');
