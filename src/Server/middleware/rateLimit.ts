// src/server/middleware/rateLimit.ts
import { defineEventHandler, H3Event, getRequestIP, createError, setResponseStatus, setHeader, send } from 'h3';
import { redisClient, isRedisReady } from './redis'; // << MODIFICA PERCORSO

// --- Configurazione ---
const WINDOW_SECONDS = parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS || '900', 10); // 15 min
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);           // 100 reqs
const TRUST_PROXY = process.env.RATE_LIMIT_TRUST_PROXY === 'true';
const RATE_LIMIT_ENABLED = !!process.env.REDIS_URL && MAX_REQUESTS > 0; // Abilitato solo se REDIS_URL e MAX > 0

// --- Funzione Helper per Risposta 429 ---
function sendRateLimitResponse(event: H3Event, retryAfterSeconds: number) {
    const body = {
        error: 'Too Many Requests',
        message: `Limite richieste superato. Riprova tra ${retryAfterSeconds} secondi.`,
        retryAfter: retryAfterSeconds
    };
    setResponseStatus(event, 429);
    setHeader(event, 'Content-Type', 'application/json');
    // Header standard per indicare quando riprovare
    setHeader(event, 'Retry-After', retryAfterSeconds);
    // Header standard opzionali (più complessi da calcolare remaining/reset in modo atomico)
    setHeader(event, 'X-RateLimit-Limit', String(MAX_REQUESTS));
    // setHeader(event, 'X-RateLimit-Remaining', '0');
    // setHeader(event, 'X-RateLimit-Reset', /* timestamp scadenza finestra */);
    return send(event, JSON.stringify(body));
}

// --- Middleware ---
export default defineEventHandler(async (event: H3Event): Promise<void> => {
    // Salta se il rate limiting è disabilitato o Redis non è pronto/configurato
    if (!RATE_LIMIT_ENABLED) return;
    if (!redisClient || !isRedisReady) {
        // Logga l'errore solo periodicamente per evitare spam se Redis è giù
        if (!redisClient || Math.random() < 0.01) { // Logga circa 1% delle volte se non pronto
             console.warn('Rate Limiter: Redis non disponibile o non configurato, controllo saltato (fail open).');
        }
        return; // Fail open: permette la richiesta se Redis non funziona
    }

    try {
        // 1. Identificatore Client (IP)
        // getRequestIP gestisce x-forwarded-for se xff: true
        const ip = getRequestIP(event, { xForwardedFor: TRUST_PROXY }) || 'unknown_ip';

        // 2. Identificatore Risorsa (Path) - potresti voler limitare solo per IP globale
        const path = event.path || '/unknown_path';

        // 3. Chiave Redis
        // Potresti voler normalizzare il path o usare solo l'IP
        const key = `ratelimit:${ip}:${path}`;

        // 4. Operazioni Atomiche con Pipeline Redis
        const pipeline = redisClient.multi();
        pipeline.incr(key); // Incrementa il contatore (se non esiste lo crea a 1)
        pipeline.expire(key, WINDOW_SECONDS, 'NX'); // Imposta la scadenza SOLO se non ne ha già una (NX)

        const results = await pipeline.exec();

        // Controllo errori pipeline
        if (!results) throw new Error('Risultati pipeline Redis nulli.');

        const incrResult = results[0]; // Risultato di INCR [errore, nuovoValore]
        // const expireResult = results[1]; // Risultato di EXPIRE NX [errore, 0 o 1]

        if (incrResult[0]) throw incrResult[0]; // Errore nell'INCR

        const currentCount = incrResult[1] as number;

        // 5. Verifica Limite
        if (currentCount > MAX_REQUESTS) {
            console.warn(`Rate limit superato per chiave: ${key} (Conteggio: ${currentCount})`);
            // Ottieni il TTL per Retry-After
            let ttl = await redisClient.ttl(key);
            if (ttl < 0) ttl = WINDOW_SECONDS; // Fallback se TTL non disponibile

            // Blocca la richiesta e invia 429
            return sendRateLimitResponse(event, ttl);
        }

        // 6. Limite non superato: la richiesta prosegue
        // console.log(`Rate limit check passed for key: ${key} (Count: ${currentCount})`); // Debug log

    } catch (redisError) {
        console.error('Rate Limiter: Errore interazione Redis:', redisError);
        // Fail open: se Redis fallisce, permetti la richiesta ma logga l'errore.
        // Potresti decidere di "fail closed" (bloccare) se preferisci.
        return;
    }
});