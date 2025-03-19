import { action } from "@solidjs/router";
import { db } from '~/Server/db.server';
import { json } from "@solidjs/router";

export const provaAction = action(async () => {
  try {
    const result = await db.query('SELECT * FROM users');
    return json({ success: result });
  } catch (error) {
    console.error('Errore nell\'action:', error);
    return json({ status: 'error', message: 'Query al database fallita' }, { status: 500 });
  }
});

