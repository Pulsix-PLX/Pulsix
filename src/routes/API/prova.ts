import { action } from '@solidjs/router';
import { db } from '~/Server/db.server';
export const usernameAlreadyexist = action(async () => {
  'use server';
  console.log('Action called with username:');

  try {
    const result = await db.query('SELECT * FROM users');
    console.log(result);
    return result.rows;
  } catch (error) {
    console.error('Error checking username:', error);
    return { status: 'error' };
  }
}, 'usernameChecks');

