// utils/auth.ts
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import {db} from '../../../../Server/db.server';
import jwt from 'jsonwebtoken';

// Constants
const BCRYPT_COST = Number(process.env.BCRYPT_COST) || 12;
const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_ISSUER = process.env.JWT_ISSUER || 'app';
const ACCESS_TOKEN_EXPIRY = Number(process.env.ACCESS_TOKEN_EXPIRY) || 900; // 15 min
const REFRESH_TOKEN_EXPIRY = Number(process.env.REFRESH_TOKEN_EXPIRY) || 1209600; // 14 days


interface JWTPayload {
  sub: string; // subject (user ID)
  // iat, exp, iss are handled by jsonwebtoken library options
  jti: string; // JWT ID (unique identifier)
}

// Interface for the object returned by verifyAccessToken on success
interface VerifiedAccessTokenPayload {
    userId: string;
    jti: string;
}

// Password hashing 
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_COST);
}

// Password verification 
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate secure random token
export function generateSecureToken(length = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

// =========== Create Tokens ===========

export function generateAccessToken(userId: string): string {

  const payload: Partial<JWTPayload> = { 
    sub: userId,
    jti: uuidv4() // Unique identifier for this specific token
  };

  const token = jwt.sign(
    payload,
    JWT_SECRET!, // Use non-null assertion '!' because we checked it above
    {
      algorithm: 'HS256',         // Explicitly set algorithm
      expiresIn: ACCESS_TOKEN_EXPIRY, // Set expiration time (e.g., '15m' or 900 seconds)
      issuer: JWT_ISSUER          // Set the issuer claim
      // 'iat' (issued at) is added automatically by the library
    }
  );

  return token;
}

// generate and hash refresh token and save it in the DB
export async function generateRefreshToken(
  userId: string,
  ipAddress: string | null, // Allow null IP address
  userAgent: string | null // Allow null user agent
): Promise<string> {
  const token = generateSecureToken(40); // The actual token given to the user
  const tokenHash = crypto // The hash stored in the DB
    .createHash('sha256')
    .update(token)
    .digest('hex');

  // Set expiration date
  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + REFRESH_TOKEN_EXPIRY);

  // Use JSON.stringify only if userAgent is not null/undefined
  const deviceInfo = userAgent ? JSON.stringify({ userAgent }) : null;

  try {

    await db.query(
      `INSERT INTO refresh_tokens (id, user_id, token_hash, device_info, ip_address, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
      uuidv4(),
      userId,
      tokenHash,
      deviceInfo, // Can be null
      ipAddress,  // Can be null
      expiresAt.toISOString()
      ]
    );
    return token; // Return the original token, not the hash
  } catch (error) {
    console.error("Error storing refresh token:", error);
    throw new Error("Failed to generate refresh token due to database error.");
  }
}

// =========== Verify Tokens ===========

// Verify JWT Access Token using jsonwebtoken
export function verifyAccessToken(token: string): VerifiedAccessTokenPayload | null {
  try {

    const decoded = jwt.verify(
      token,
      JWT_SECRET!, 
      {
        algorithms: ['HS256'], // **Important:** Specify allowed algorithms
        issuer: JWT_ISSUER      // Verify the issuer matches
      }
    ) as JWTPayload & { iat: number; exp: number }; // Assert type including standard claims added by jwt

    // return the required user info
    return { userId: decoded.sub, jti: decoded.jti };

  } catch (error) {

    if (error instanceof jwt.TokenExpiredError) {
      console.log('Access token verification failed: Token has expired.'); 
    } else if (error instanceof jwt.JsonWebTokenError) {
      
      console.log(`Access token verification failed: ${error.message}`);
    } else {
     
      console.error('Unexpected error during access token verification:', error);
    }
    return null; 
  }
}


export async function verifyRefreshToken(
  token: string,
): Promise<string | null> {
  try {
    // 1. Calcola l'hash del token ricevuto
    const tokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const result = await db.query<{ user_id: string }>(
      /* SQL inline */
      `SELECT user_id FROM refresh_tokens
       WHERE token_hash = $1 AND expires_at > $2`,
      /* Valori inline */
      [
        tokenHash,                // $1: l'hash del token da cercare
        new Date().toISOString()  // $2: l'ora corrente come stringa ISO per il confronto
      ]
    );


    if (result.rows.length === 0) {
      return null;
    }

    // Estrai e restituisci l'user_id
    const storedToken = result.rows[0];
    return storedToken.user_id;

  } catch (error) {
    console.error('Refresh token verification error:', error);
    return null;
  }
}



// ---Cleanup expired tokens (run periodically) ---
export interface UserLockoutInfo {
  failed_login_attempts: number | null;
  last_failed_login: string | Date | null; // Può essere stringa ISO o oggetto Date
}


// Rimuove tutti i refresh token scaduti dal database
export async function cleanupExpiredTokens(): Promise<void> {

const sql = 'DELETE FROM refresh_tokens WHERE expires_at < CURRENT_TIMESTAMP';
try {
  await db.query(sql);
  console.log('Expired refresh tokens cleaned up successfully.'); 
} catch (error) {
  console.error('Error cleaning up expired tokens:', error);

}
}

/**
* Invalida (rimuove) tutti i refresh token per un utente specifico.
* Utile ad esempio dopo un cambio password.
* @param userId L'ID dell'utente i cui token devono essere invalidati.
*/

export async function invalidateAllUserTokens(userId: string): Promise<void> {
// Sostituisci '?' con '$1' per PostgreSQL
const sql = 'DELETE FROM refresh_tokens WHERE user_id = $1';
const values = [userId]; // Valore per $1

try {

  const result = await db.query(sql, values);
  console.log(`Invalidated ${result.rowCount ?? 0} refresh tokens for user ${userId}.`);
} catch (error) {
  console.error(`Error invalidating user tokens for user ${userId}:`, error);

}
}

/**
* Traccia un tentativo di login (successo o fallimento) aggiornando
* il contatore tentativi falliti e l'ultimo tentativo fallito per l'utente.
* @param email L'email dell'utente che ha tentato il login.
* @param success true se il login ha avuto successo, false altrimenti.
*/
export async function trackLoginAttempt(email: string, success: boolean): Promise<void> {
let sql: string;
const values = [email]; // Valore per $1 in entrambi i casi

if (success) {
  // Reset failed attempts on successful login
  sql = `
    UPDATE users
    SET failed_login_attempts = 0,
        last_failed_login = NULL
    WHERE email = $1
  `;
} else {
  // Increment failed attempts and set last failed login time
  sql = `
    UPDATE users
    SET failed_login_attempts = COALESCE(failed_login_attempts, 0) + 1,
        last_failed_login = CURRENT_TIMESTAMP
    WHERE email = $1
  `;
  // Nota: Usato COALESCE per gestire il caso in cui failed_login_attempts sia NULL
}

try {
  // Esegui la query UPDATE
  await db.query(sql, values);
} catch (error) {
  console.error(`Error tracking login attempt for email ${email}:`, error);

}
}

/**
* Controlla se l'account utente è temporaneamente bloccato a causa
* di troppi tentativi di login falliti.
* Non interagisce direttamente con il DB, opera sui dati utente già recuperati.
* @param user Oggetto contenente le informazioni sui tentativi falliti e l'ultimo tentativo.
* @returns true se l'account è bloccato, false altrimenti.
*/
export function isAccountLocked(user: UserLockoutInfo | null | undefined): boolean {
// Variabili d'ambiente per la configurazione
const maxAttempts = Number(process.env.MAX_FAILED_ATTEMPTS) || 5;
const lockoutTime = Number(process.env.LOCKOUT_TIME) || 900; // 15 minuti

// Controlli iniziali sull'oggetto user e sui suoi campi necessari
if (!user || user.failed_login_attempts === null || user.failed_login_attempts < maxAttempts || !user.last_failed_login) {
  // Se l'utente non esiste, o i tentativi sono null o sotto la soglia,
  // o non c'è una data dell'ultimo fallimento, l'account non è bloccato.
  return false;
}

try {
  // Calcola quando scade il blocco
  const lastFailedDate = new Date(user.last_failed_login);
  // Verifica se la data è valida dopo il parsing
  if (isNaN(lastFailedDate.getTime())) {
      console.warn("Invalid date format for last_failed_login:", user.last_failed_login);
      return false; // Non possiamo determinare se è bloccato se la data non è valida
  }

  const lockoutExpiry = new Date(lastFailedDate);
  lockoutExpiry.setSeconds(lockoutExpiry.getSeconds() + lockoutTime);

  // Confronta la data di scadenza del blocco con l'ora attuale
  return lockoutExpiry > new Date();

} catch (error) {
    // Gestisce errori nel caso la data non sia parsabile da new Date()
    console.error("Error processing date for account lock check:", error);
    return false; // Considera l'account non bloccato in caso di errore di data
}
}