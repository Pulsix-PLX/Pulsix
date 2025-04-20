import { json } from '@solidjs/router';
import type { APIEvent } from '@solidjs/start/server';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { setCookie, useSession } from 'vinxi/http';
import { db } from '../../../../server/db.server';
import { generateAccessToken, generateRefreshToken } from './utils';

type LoginInput = {
  password: string;
  username: string;
};

export async function POST(event: APIEvent) {
  const BCRYPT_COST = Number(process.env.BCRYPT_COST) || 12;

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
    const userResult = await db.query<{
      id: string;
      username: string;
      password: string;
      state: string;
    }>('SELECT id, username, password, state FROM auth.users WHERE username = $1', [username]);

    if (userResult.rows.length === 0) {
      return json({ success: false, message: 'Credenziali non valide.' }, { status: 401 });
    }

    const user = userResult.rows[0];

    //// ---- Check state ---- ////
    if (user.state == 'suspended') {
      console.log('user sospended', user.id);
      return json({ success: false, message: 'user sospended.' }, { status: 401 });
    }
    if (user.state == 'blocked') {
      console.log('user blocked', user.id);
      return json({ success: false, message: 'user blocked.' }, { status: 401 });
    }
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
    const userIdNumber = Number(user.id); 
    const accessToken = generateAccessToken(userIdNumber);
    const refreshToken = await generateRefreshToken();
    console.log('Access token: ', accessToken);
    console.log('Refresh token: ', refreshToken);

    //// ---- Session log ---- ////
    const refreshTokenHash = await bcrypt.hash(refreshToken.token, BCRYPT_COST);
    const expires_at = refreshToken.expires_at;
    console.log(refreshTokenHash);
    const sessionSql = `
    INSERT INTO auth.active_sessions
      (id, user_id, ip_address, device_info, last_active, token_hash, expires_at, created_at)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (user_id) -- !! Richiede un vincolo UNIQUE o PRIMARY KEY su user_id !!
    DO UPDATE SET
      ip_address = EXCLUDED.ip_address,     -- Aggiorna IP con quello nuovo da $3
      device_info = EXCLUDED.device_info,  -- Aggiorna info device con quelle nuove da $4
      token_hash = EXCLUDED.token_hash,    -- Aggiorna con il NUOVO hash del token da $6
      expires_at = EXCLUDED.expires_at,    -- Aggiorna con la NUOVA scadenza da $7
      last_active = CURRENT_TIMESTAMP;     -- Aggiorna sempre l'ultimo accesso all'ora attuale
`;

    const queryParams = [
      uuidv4(),
      user.id, 
      ipAddress, 
      userAgent,
      new Date(), 
      refreshTokenHash, 
      expires_at.toISOString(), 
      new Date(), 
    ];

    // Esegui la query in modo sicuro
    try {
      await db.query(sessionSql, queryParams);
      console.log(
        `[Login/Session] Record in auth.active_sessions inserito/aggiornato per user ${user.id}`
      );
    } catch (dbError) {
      console.error(
        `[Login/Session] Errore durante INSERT/UPDATE in auth.active_sessions per user ${user.id}:`,
        dbError
      );
      // Qui dovresti gestire l'errore.
      // Potrebbe essere un errore dovuto alla mancanza del vincolo UNIQUE su user_id?
      // O un problema di connessione DB, tipo dati non valido, ecc.
      // Decidi se questo errore deve bloccare il login o solo essere loggato.
      // Se questa tabella è FONDAMENTALE per il refresh, un errore qui è critico.
      // throw new Error("Impossibile aggiornare la sessione utente."); // Esempio
    }
    //// ---- Set Cookie ---- ////
    const refreshExpirySeconds = Number(process.env.REFRESH_TOKEN_EXPIRY || 1209600);
    const refreshExpiryDate = new Date(Date.now() + refreshExpirySeconds * 1000);

    try {
      setCookie(event.nativeEvent, 'refresh_token', refreshToken.token, {
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

    //// ---- Create Session (used for server functions) ---- ////
    type AuthSessionData = {
      userId?: string;
      username?: string;
    };
    try {
      const session = await useSession<AuthSessionData>(event.nativeEvent, {
        password: process.env.SESSION_SECRET!,
        name: process.env.JWT_ISSUER,
        cookie: {
          maxAge: 60 * 60 * 24, // 1 day
          secure: process.env.ENV === 'production',
          httpOnly: true,
          sameSite: 'lax',
        },
      });
      // Salva userId e username
      await session.update({ userId: user.id, username: user.username });
      console.log(`Login: Sessione server-side aggiornata per userId: ${user.id}`);
    } catch (sessionError) {
      console.error('Login: Errore aggiornamento sessione server-side:', sessionError);
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
