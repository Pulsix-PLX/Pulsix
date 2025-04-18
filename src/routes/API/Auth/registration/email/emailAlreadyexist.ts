import { action } from '@solidjs/router';
import { db } from '../../../../../server/db.server';

export const emailAlreadyexist = action(async (email) => {
  'use server';
  try {
    console.log(email);
    const result = await db.query('SELECT email FROM users WHERE email=$1', [email]);
    console.log(result.rows.length > 0 ? 'already exist' : 'available');
    return result.rows.length > 0 ? 'already exist' : 'available';
  } catch (error: any) {
    console.error('Error checking email:', error);
    return `error:${error.message}`; // Ritorna l'errore completo
  }
}, 'emailAlreadyexist');
