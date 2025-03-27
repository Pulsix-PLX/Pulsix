import { action } from '@solidjs/router';
import { setAuth } from '~/GlobalStores/AuthStore';
import { db } from '~/Server/db.server';
import * as bcrypt from 'bcryptjs';
import { getFormValue } from '~/GlobalStores/FormStore';

export const loginUser = action(async () => {
  "use server";

  const username = getFormValue('username');
  const rawPassword = getFormValue('password');

  try {
    // Recupera l'utente dal database
    const userResult = await db.query(
      'SELECT id, username, password FROM users WHERE username = $1',
      [username]
    );

    // Verifica se l'utente esiste
    if (userResult.rows.length === 0) {
      return {
        success: false,
        message: 'Utente non trovato'
      };
    }

    // Prendi l'utente dal risultato
    const user = userResult.rows[0];

    // Confronta la password inserita con quella hashata
    const isPasswordCorrect = await bcrypt.compare(
      rawPassword, 
      user.password
    );

    // Se la password è corretta
    if (isPasswordCorrect) {
      // Imposta l'autenticazione
      setAuth('userId', user.id);
      setAuth('username', user.username);

      return {
        success: true,
        userId: user.id,
        username: user.username
      };
    } else {
      return {
        success: false,
        message: 'Password non corretta'
      };
    }

  } catch (error: any) {
    console.error('Errore durante il login:', error);
    return {
      success: false,
      message: 'Errore durante il login'
    };
  }
}, 'loginUser');