import type { APIEvent } from '@solidjs/start/server';
import { setCookie, useSession } from 'vinxi/http'; // Importa useSession per la gestione delle sessioni
import { db } from '../../../../Server/db.server'; // Assicurati che il percorso sia corretto
import * as bcrypt from 'bcryptjs';
import { json } from '@solidjs/router';
import { v4 as uuidv4 } from 'uuid';
import { generateAccessToken, generateRefreshToken } from './utils';

type LoginInput = {
  password: string;
  username: string;
};

export async function POST(event: APIEvent) {
  //// ---- Get body ---- ////
  let inputData: LoginInput;
  try {
    inputData = await event.request.json();
  } catch (error) {
    return json(
      { success: false, message: 'Corpo della richiesta non valido o mancante.' },
      { status: 400 }
    );
  }
  const { username, password } = inputData;

  if (!username || !password) {
    return json(
      { success: false, message: 'Username e password sono obbligatori.' },
      { status: 400 }
    );
  }

  //// ---- Get user ---- ////
  try {
    const userResult = await db.query<{ id: string; username: string; password: string }>(
      'SELECT id, username, password FROM auth.users WHERE username = $1',
      [username]
    );

    if (userResult.rows.length === 0) {
      return json({ success: false, message: 'Credenziali non valide.' }, { status: 401 });
    }

    const user = userResult.rows[0];

    //// ---- Check password ---- ////
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      console.log('password wrong');
      return json({ success: false, message: 'Credenziali non valide.' }, { status: 401 });
    }
    //// ---- Get ip & browser info ---- ////
    const ipAddress =
      event.request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      event.clientAddress ||
      'unknown';
    const userAgent = event.request.headers.get('user-agent') || '';
    console.log(ipAddress, userAgent);

    //// ---- Tokens ---- ////
    const accessToken = generateAccessToken(user.id);
    const refreshToken = await generateRefreshToken(user.id, ipAddress, userAgent);
    console.log('Access token: ', accessToken);
    console.log('Refresh token: ', refreshToken);

    //// ---- Session log ---- ////
    try {
      const sessionSql = `
        INSERT INTO auth.active_sessions (id, user_id, ip_address, user_agent)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, ip_address, user_agent) DO UPDATE SET last_active = CURRENT_TIMESTAMP`;
      await db.query(sessionSql, [uuidv4(), user.id, ipAddress, userAgent]);
    } catch (sessionError) {
      console.error('Error registering active session:', sessionError);
    }
    //// ---- Session log ---- ////
    const refreshExpirySeconds = Number(process.env.REFRESH_TOKEN_EXPIRY || 1209600);
    const refreshExpiryDate = new Date(Date.now() + refreshExpirySeconds * 1000);

    //// ---- Set Cookie ---- ////
    try {
      setCookie(event.nativeEvent, 'refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.ENV === 'production', // permette richieste solo da https se è production
        sameSite: 'strict', // non permette richieste da altri siti
        expires: refreshExpiryDate,
        path: '/',
        maxAge: refreshExpirySeconds,
      });
    } catch (cookieError) {
      console.error('Error setting refresh token cookie:', cookieError);
      return json(
        { success: false, message: "Errore durante l'impostazione del cookie di sessione." },
        { status: 500 }
      );
    }

    return json({ accessToken });
  } catch (error: any) {
    console.error('Errore durante il processo di login:', error);
    return json(
      { success: false, message: 'Errore interno del server durante il login.' },
      { status: 500 }
    );
  }
}
