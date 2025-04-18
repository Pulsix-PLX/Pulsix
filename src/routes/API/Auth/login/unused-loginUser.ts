import { action } from '@solidjs/router'; // o @solidjs/start/server
// Importa l'helper di Vinxi
import * as bcrypt from 'bcryptjs';
import { useSession } from 'vinxi/http';
import { db } from '../../../../server/db.server'; // Ancora necessario per verificare le credenziali

type AuthSessionData = {
  userId?: string;
  username?: string;
};

export const loginUser = action(async (data) => {
  'use server';
  const { password, username } = data;

  // 1. Verifica le credenziali utente (come prima)
  try {
    const userResult = await db.query<{ id: string; username: string; password: string }>(
      'SELECT id, username, password FROM users WHERE username = $1',
      [username]
    );
    if (userResult.rows.length === 0) {
      return { success: false, message: 'Credenziali non valide' };
    }
    const user = userResult.rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      // 2. Autenticazione riuscita -> Usa useSession per salvare i dati nel cookie criptato
      const session = await useSession<AuthSessionData>({
        password: process.env.SESSION_SECRET!, // Assicurati che sia caricata!
        name: 'auth_session', // Scegli un nome per il cookie di sessione
      });

      await session.update({
        userId: user.id,
        username: user.username,
      });

      console.log(`Sessione (cookie criptato) aggiornata per utente ${user.username}`);
      return { success: true };
    } else {
      return { success: false, message: 'Credenziali non valide' };
    }
  } catch (error: any) {
    console.error('Errore durante il login:', error);
    // Gestisci anche potenziali errori da useSession o db.query
    if (!process.env.SESSION_SECRET) {
      console.error('SESSION_SECRET non è impostata!');
      return { success: false, message: 'Errore di configurazione server.' };
    }
    return { success: false, message: 'Errore durante il processo di login' };
  }
}, 'loginUser');
