import { action } from '@solidjs/router';
import { db } from '~/Server/db.server';

export const usernameAlreadyexist = action(async (username) => {
  console.log('Action called with:', username);
  try {
    const result = await db.query('SELECT username FROM users WHERE username = $1', [username]);
    console.log('Query result:', result.rows);

    if (result.rows.length > 0) {
      return 'already exist';
    }
    return 'available';
  } catch (error) {
    console.error('Error checking username:', error);
    return `error:`;
  }
}, 'usernameAlreadyexist');
