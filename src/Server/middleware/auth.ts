// src/middleware.ts
/**
 * Middleware centrale per l'applicazione SolidStart.
 * Gestisce CORS (con whitelist), rate limiting (placeholder),
 * e autenticazione generale (Approccio B) eccetto percorsi pubblici.
 */
import { createMiddleware } from "@solidjs/start/middleware";
import type { FetchEvent } from "@solidjs/start/server";
import { json } from "@solidjs/router";
import { Pool } from 'pg'; // Importa se necessario altrove, non usato direttamente qui
import jwt from 'jsonwebtoken';
// Importa le utility CORS e il tipo H3Event da h3
import { handleCors, appendCorsHeaders, isPreflightRequest, type H3Event } from 'h3';

// Importa l'istanza DB (usata in checkAuthLogic)
import { db } from '../db.server'; // Verifica percorso

// --- Configurazione CORS ---
// !!! *** PERSONALIZZA QUESTA LISTA CON I DOMINI AUTORIZZATI *** !!!
const allowedOrigins: ReadonlyArray<string> = [
    'http://localhost:3000',              // Sviluppo locale SolidStart
    'https://tuo-dominio-produzione.com', // Il tuo dominio di produzione
    'https://dominio-sito-esterno-1.com',  // Sito esterno autorizzato
    // Aggiungi altri domini specifici qui
];

// --- Tipi Locali della Richiesta ---
/** Definisce la struttura di event.locals per passare dati */
interface AppLocals {
    user?: { id: number; tokenId: string; state: string; };
    startTime?: number;
}

// --- Interfaccia Payload JWT (sub come numero) ---
/** Struttura attesa del payload JWT decodificato */
interface AccessTokenPayload {
    sub: number; // User ID (numero)
    jti: string; // JWT ID
    iat: number; // Issued At timestamp
    exp: number; // Expiration timestamp
    iss: string; // Issuer
}

// --- Logica di Autenticazione (usata da authMiddleware) ---
/**
 * Controlla l'autenticazione tramite token JWT Bearer.
 * Verifica firma, scadenza, issuer e struttura payload.
 */
async function checkAuthLogic(event: FetchEvent): Promise<Response | { user: AppLocals['user'] }> {
    const authHeader = event.request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Non è un errore grave se manca per risorse pubbliche, ma restituisce 401
        // console.log(`[Auth Logic] Nessun header Authorization Bearer per ${event.request.url}.`);
        return json({ error: 'Authentication required', code: 'NO_AUTH_HEADER' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    let decodedPayload: string | jwt.JwtPayload | null = null;
    const JWT_SECRET = process.env.JWT_SECRET || '';
    const JWT_ISSUER = process.env.JWT_ISSUER || 'pulsix'; // Usa il tuo issuer

    if (!JWT_SECRET) {
        console.error('[Auth Logic] Errore critico: JWT_SECRET non configurato!');
        return json({ error: 'Server configuration error', code: 'JWT_SECRET_MISSING' }, { status: 500 });
    }

    try {
        decodedPayload = jwt.verify(token, JWT_SECRET, { issuer: JWT_ISSUER });
        
    } catch (error) {
        let errorMessage = 'Invalid or expired token'; let errorCode = 'INVALID_TOKEN';
        if (error instanceof jwt.TokenExpiredError) { errorMessage = 'Token expired'; errorCode = 'TOKEN_EXPIRED'; console.log(`[Auth Logic] Token scaduto per ${event.request.url}.`); }
        else if (error instanceof jwt.JsonWebTokenError) { errorMessage = `Invalid token (${error.message})`; errorCode = 'TOKEN_INVALID_SIGNATURE_OR_PAYLOAD'; console.warn(`[Auth Logic] Errore verifica token per ${event.request.url}: ${error.message}`);}
        else { console.error(`[Auth Logic] Errore verifica token (sconosciuto) per ${event.request.url}:`, error); }
        return json({ error: errorMessage, code: errorCode }, { status: 401 });
    }

    // Verifica Runtime della Struttura e Tipi del Payload
    if ( typeof decodedPayload !== 'object' || decodedPayload === null || typeof decodedPayload.sub !== 'number' || typeof decodedPayload.jti !== 'string' ) {
        console.log('[Auth Logic] Payload token decodificato non valido. Payload:', decodedPayload);
        return json({ error: 'Invalid token payload structure or types', code: 'INVALID_TOKEN_PAYLOAD' }, { status: 401 });
    }

    const userIdNum = decodedPayload.sub;
    const tokenId = decodedPayload.jti;

    // Controlla stato utente nel DB
    try {
        const userQuery = await db.query<{ id: number; state: string }>( 'SELECT id, state FROM auth.users WHERE id = $1', [userIdNum] );
        const user = userQuery.rows[0];
        if (!user) { /* ... gestione utente non trovato ... */
            console.warn(`[Auth Logic] Utente ${userIdNum} non trovato.`);
            return json({ error: 'User associated with token not found', code: 'USER_NOT_FOUND' }, { status: 401 });
         }
        if (user.state === 'blocked' || user.state === 'sospended') { /* ... gestione utente bloccato/sospeso ... */
             console.warn(`[Auth Logic] Accesso negato per utente ${userIdNum} (Stato: ${user.state})`);
             return json({ error: `User account is ${user.state}`, code: `USER_${user.state.toUpperCase()}` }, { status: 403 });
        }
        // Autenticazione riuscita
        console.log(`[Auth Logic] Utente ${userIdNum} autenticato per ${event.request.url}.`);
        return { user: { id: userIdNum, tokenId: tokenId, state: user.state } };
    } catch (dbError) { /* ... gestione errore DB ... */
        console.error(`[Auth Logic] Errore DB check utente ${userIdNum}:`, dbError);
        return json({ error: 'Internal server error during user check' }, { status: 500 });
    }
}

// --- Funzioni Middleware Specifiche ---

/** Middleware CORS con whitelist, gestione credenziali e maxAge come stringa. */
async function corsMiddleware(event: FetchEvent): Promise<Response | void> {
    
    const nativeEvent = event.nativeEvent as H3Event;
    if (isPreflightRequest(nativeEvent)) {
        
        const origin = event.request.headers.get('origin');
        // console.log(`[CORS Middleware] Handling OPTIONS preflight from origin: ${origin || 'unknown'}`);
        const corsHandled = handleCors(nativeEvent, {
            origin: (requestOrigin) => !requestOrigin || allowedOrigins.includes(requestOrigin),
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowHeaders: ['Authorization', 'Content-Type', 'Accept', 'X-Requested-With'],
            credentials: true,
            maxAge: '86400', // Cache preflight per 1 giorno (come STRINGA)
        });
        if (corsHandled) {
            // console.log('[CORS Middleware] Preflight handled.');
            return new Response(null, { status: 204 });
        } else {
            console.error(`[CORS Middleware] Preflight check failed for origin: ${origin}`);
            return json({ error: "CORS Preflight Check Failed" }, { status: 403 });
        }
    }
}

/** Middleware Rate Limiting (Placeholder). */
async function rateLimitMiddleware(event: FetchEvent): Promise<Response | void> {
    // console.log("[Middleware] Checking rate limit (placeholder)...");
    // Implementa la tua logica qui (es. con Redis e ioredis)
}

// --- Lista Percorsi Pubblici da Saltare (Approccio B) ---
// Definisce percorsi e pattern che NON richiedono autenticazione Bearer.
const publicPathsToSkipAuth: ReadonlyArray<string | RegExp> = [
    '/', // Root path
    '/favicon.ico',
    '/manifest.webmanifest',
    '/sw.js',
    '/robots.txt',
    '/assets/',          // Prefisso asset statici
    '/@vite/',          // Vite dev paths
    '/@id/',            // Vite dev paths
    '/node_modules/',   // Vite dev paths
    // API Pubbliche di Autenticazione
    '/API/Auth/login',
    '/API/Auth/registration',
    '/LoginRegistration',
    '/LoginRegistration/Login',
    '/LoginRegistration/Registration',
    '/API/Auth/refresh',
    '/API/Auth/logout', // Il logout spesso si basa sul refresh token nel cookie
    // Aggiungi qui altri percorsi specifici (es. '/api/public-data', '/about-us')
    // Esempio Regex per tipi di file comuni (opzionale, più fragile):
    // /\.(css|js|json|png|jpe?g|gif|svg|webp|woff2?|ttf|otf)(\?.*)?$/i,
];

/**
 * Middleware di Autenticazione (Approccio B - Generale).
 * Tenta l'autenticazione per tutte le richieste tranne quelle in `publicPathsToSkipAuth`.
 */
async function authMiddleware(event: FetchEvent): Promise<Response | void> {
    const url = new URL(event.request.url);
    const pathname = url.pathname; // Il percorso della richiesta attuale

    // console.log(`[Auth Middleware DEBUG] Checking auth for path: "${pathname}"`);

    // 1. Controlla se il percorso è esplicitamente pubblico
    let matchedPattern: string | RegExp | null = null;
    const shouldSkipAuth = publicPathsToSkipAuth.some(pattern => {
        let isMatch = false;
        if (typeof pattern === 'string') {
            // !!! LOGICA CORRETTA !!!
            if (pattern === '/') {
                // Caso speciale: Il pattern '/' matcha SOLO il percorso root esatto
                isMatch = pathname === '/';
            } else {
                // Altri pattern stringa: gestisci prefissi (endsWith '/') o match esatti
                isMatch = pattern.endsWith('/') ? pathname.startsWith(pattern) : pathname === pattern;
            }
        } else { // È una RegExp
            isMatch = pattern.test(pathname);
        }

        if (isMatch) {
            matchedPattern = pattern;
        }
        return isMatch;
    });

    // 2. Gestisci lo skip o procedi con l'autenticazione
    if (shouldSkipAuth) {
        console.log(`[Auth Middleware] SKIPPING AUTH for path "${pathname}" because it matched the public pattern: ${matchedPattern}`);
        return; // Salta autenticazione
    } else {
        console.log(`[Auth Middleware] Path "${pathname}" is NOT public. Running auth check...`);
        const result = await checkAuthLogic(event); // Chiama la logica di verifica token

        if (result instanceof Response) {
            // Auth fallita
            console.warn(`[Middleware] Auth check failed for "${pathname}". Status: ${result.status}`);
            return result;
        } else {
            // Auth riuscita
            (event.locals as AppLocals).user = result.user;
            console.log(`[Middleware] Auth successful for user ${result.user?.id} on path "${pathname}"`);
        }
    }



    // 2. Non è pubblico: tenta l'autenticazione
    // console.log(`[Middleware] Running Auth check for potentially protected path: ${pathname}`);
    const result = await checkAuthLogic(event);
    
    if (result instanceof Response) {
        // Auth fallita (manca header per risorsa protetta, token invalido, ecc.)
        // Il log dettagliato è già in checkAuthLogic
        return result; // Restituisci l'errore (401, 403, 500)
    } else {
        // Auth riuscita: allega l'utente a event.locals
        (event.locals as AppLocals).user = result.user;
        // console.log(`[Middleware] Auth successful for user ${result.user?.id} on path ${pathname}`);
        // Lascia proseguire alla route API o Server Action
    }
}

// --- Configurazione Middleware Principale ---

export default createMiddleware({
    /** Eseguiti per ogni richiesta in entrata, in ordine. */
    onRequest: [
        // Opzionale: Inizio misurazione tempo
        (event) => { (event.locals as AppLocals).startTime = Date.now(); },

        // 1. Gestione CORS (prima di Auth!)
        corsMiddleware,
 
        // 2. Rate Limiting (da implementare)
        rateLimitMiddleware,

        // 3. Autenticazione (Approccio B)
        authMiddleware
    ],

    /** Eseguiti prima di inviare la risposta. */
    onBeforeResponse: [
        // Aggiunge header CORS necessari alle risposte effettive
        (event) => {
            // Cast a H3Event per compatibilità
            appendCorsHeaders(event.nativeEvent as H3Event, {
                origin: (requestOrigin) => !requestOrigin || allowedOrigins.includes(requestOrigin),
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                allowHeaders: ['Authorization', 'Content-Type', 'Accept', 'X-Requested-With'],
                credentials: true, // Necessario per risposte a richieste autenticate
            });
        },

        // Opzionale: Log durata richiesta
        (event) => {
            const locals = event.locals as AppLocals;
            if (locals.startTime) {
                const duration = Date.now() - locals.startTime;
                const pathname = new URL(event.request.url).pathname;
                if (duration > 10 || pathname !== '/favicon.ico') {
                    // Riduci verbosità dei log se necessario
                    // console.log(`[Perf] Request to ${pathname} took ${duration}ms`);
                }
            }
        }
    ]
});