'use server';

import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../../server/db.server';
import { webcrypto } from 'node:crypto';
const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_ISSUER = process.env.JWT_ISSUER || 'app';
const ACCESS_TOKEN_EXPIRY = Number(process.env.ACCESS_TOKEN_EXPIRY) || 900; // 15 min
const REFRESH_TOKEN_EXPIRY = Number(process.env.REFRESH_TOKEN_EXPIRY) || 1209600; // 14 days

export function generateAccessToken(userId: number): string {
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

export async function generateRefreshToken(){
  const token = await generateSecureToken();

  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + REFRESH_TOKEN_EXPIRY);

  try {
  

    return {token:token, expires_at:expiresAt};
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
      `SELECT user_id, token_hash, expires_at FROM auth.active_sessions 
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
