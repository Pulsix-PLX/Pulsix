// Dentro una Server Function (es. getWallets)
'use server';
import { json } from '@solidjs/router';
import { getUserId } from '~/Server/auth.server';
import { db } from '../../../server/db.server';
import { logoutUser } from '../Auth/logout/logout';
import { authStore } from '~/GlobalStores/auth';

// ...

export async function checkStateUser() {
  let userId;
  try {
    userId = await getUserId();

    if (!userId) {
      return json({ success: false, message: 'user not logged.' }, { status: 401 });
    }
  } catch (error) {
    console.log('user not logged');
    return json({ success: false, message: 'internal error .' }, { status: 401 });
  }
  try {
    console.log('check user state for: ', userId);
    const userStatusQuery = await db.query('SELECT state FROM auth.users WHERE id = $1', [userId]);

    if (userStatusQuery.rows[0]?.state == 'suspended') {
      console.log('user sospended', userId);
     // await authStore.api.post('API/Auth/logout');
      throw new Error('User blocked.');
    }
    if (userStatusQuery.rows[0]?.state == 'blocked') {
      console.log('User blocked', userId);
    // await authStore.api.post('API/Auth/logout');
      throw new Error('User blocked.');
    }
  } catch (dbError) {
    console.error(
      `Server Function: Errore controllo stato utente server function ${userId}`,
      dbError
    );
    return null;
  }
}
