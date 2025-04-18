// src/server/lib/redis.ts
import Redis from 'ioredis';
import { H3Event } from 'h3';

const redisURL = process.env.REDIS_URL;
let redisClient: Redis | null = null;
let isRedisReady = false;

if (!redisURL) {
    console.warn('!!! ATTENZIONE: REDIS_URL non impostata. Il Rate Limiter non funzionerà. !!!');
} else {
    try {
        redisClient = new Redis(redisURL, {
            maxRetriesPerRequest: 3, // Limita i tentativi per comando
            showFriendlyErrorStack: process.env.ENV !== 'production',
            lazyConnect: true, // Connettiti solo quando serve la prima volta
            retryStrategy(times) {
                if (times > 10) {
                    console.error('Redis: Troppi tentativi di riconnessione. Rinuncio.');
                    isRedisReady = false; // Segna come non pronto
                    return null; // Stop retrying
                }
                const delay = Math.min(times * 100, 2000); // Backoff esponenziale
                console.warn(`Redis: Connessione fallita (tentativo ${times}). Riprovo tra ${delay}ms...`);
                return delay;
            },
        });

        redisClient.on('connect', () => {
            console.log('Redis Client Connesso.');
            isRedisReady = true;
        });

        redisClient.on('ready', () => {
            console.log('Redis Client Pronto.');
            isRedisReady = true; // Assicura sia pronto
        });

        redisClient.on('error', (err) => {
            console.error('Redis Client Error:', err);
            // Il client potrebbe tentare di riconnettersi, ma lo segniamo come non pronto
            // finché non si riconnette esplicitamente.
            isRedisReady = false;
        });

        redisClient.on('reconnecting', () => {
             console.log('Redis Client in Riconnessione...');
             isRedisReady = false; // Non pronto durante la riconnessione
        });

        redisClient.on('end', () => {
            console.log('Redis Client Disconnesso.');
            isRedisReady = false;
        });

        // Tenta la connessione iniziale in background
        redisClient.connect().catch(err => {
            console.error("Redis: Fallita connessione iniziale:", err);
            isRedisReady = false;
         });

    } catch (err) {
        console.error('Fallita creazione istanza Redis client:', err);
        redisClient = null;
    }
}

// Funzione helper per ottenere il client Redis nel contesto (se necessario)
// O semplicemente esporta il client se usato come singleton
// export function getRedis(event?: H3Event): Redis | null {
//    // Logica per ottenere il client, magari dal contesto se iniettato da un middleware precedente
//    return redisClient;
// }

export { redisClient, isRedisReady };