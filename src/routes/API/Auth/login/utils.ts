'use server';

import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { db } from '~/Server/db.server';
import bcrypt from 'bcryptjs';
import * as jose from 'jose';

const BCRYPT_COST = Number(process.env.BCRYPT_COST) || 12;
const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_ISSUER = process.env.JWT_ISSUER || 'app';
const ACCESS_TOKEN_EXPIRY = Number(process.env.ACCESS_TOKEN_EXPIRY) || 900; // 15 min
const REFRESH_TOKEN_EXPIRY = Number(process.env.REFRESH_TOKEN_EXPIRY) || 1209600; // 14 days

export function generateAccessToken(userId: string): string {
  const payload = {
    sub: userId,
    jti: uuidv4(),
  };

  const token = jwt.sign(payload, JWT_SECRET!, {
    algorithm: 'HS256',
    expiresIn: ACCESS_TOKEN_EXPIRY,
    issuer: JWT_ISSUER,
  });

  return token;
}

export async function generateRefreshToken(
  userId: string,
  ipAddress: string | null,
  userAgent: string | null
): Promise<string> {
  const token = await generateSecureToken();

  const tokenHash = await bcrypt.hash(token, BCRYPT_COST);

  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + REFRESH_TOKEN_EXPIRY);

  const deviceInfo = userAgent ? JSON.stringify({ userAgent }) : null;

  try {
    await db.query(
      `INSERT INTO auth.refresh_tokens (id, user_id, token_hash, device_info, ip_address, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [uuidv4(), userId, tokenHash, deviceInfo, ipAddress, expiresAt.toISOString()]
    );

    return token;
  } catch (error) {
    console.error('Errore durante la memorizzazione del refresh token:', error);
    throw new Error('Impossibile generare il refresh token a causa di un errore del database.');
  }
}

async function generateSecureToken(): Promise<string> {
  const tokenKey = await jose.generateSecret('HS256');

  const randomData = uuidv4() + uuidv4();

  const token = await new jose.CompactSign(new TextEncoder().encode(randomData))
    .setProtectedHeader({ alg: 'HS256' })
    .sign(tokenKey);

  return token;
}

/**
 * Verifica se un refresh token è valido
 * @param token - Il token da verificare
 * @returns Promise con l'ID utente se valido, null altrimenti
 */
export async function verifyRefreshToken(token: string): Promise<string | null> {
  try {
    // Cerca il token nel database
    const result = await db.query(
      `SELECT user_id, token_hash, expires_at FROM auth.refresh_tokens 
       WHERE expires_at > NOW()`
    );

    // Nessun token trovato o token scaduto
    if (result.rows.length === 0) {
      return null;
    }

    // Verifica ogni token fino a trovare una corrispondenza
    for (const row of result.rows) {
      const isValid = await bcrypt.compare(token, row.token_hash);
      if (isValid) {
        return row.user_id;
      }
    }

    return null;
  } catch (error) {
    console.error('Errore durante la verifica del refresh token:', error);
    return null;
  }
}
