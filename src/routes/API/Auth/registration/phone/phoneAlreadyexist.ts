import { action } from '@solidjs/router';
import { db } from '../../../../../server/db.server';

export const phoneAlreadyexist = action(async (phone) => {
  'use server';

  try {
    console.log(phone);
    const result = await db.query('SELECT phone_number FROM users WHERE phone_number=$1', [phone]);
    console.log(result.rows);
    return result.rows.length > 0 ? 'already exist' : 'available';
  } catch (error: any) {
    console.error('Error checking phone:', error);
    return `error:${error.message}`; // Ritorna l'errore completo
  }
}, 'phoneAlreadyexist');
