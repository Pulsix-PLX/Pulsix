import { H3Event } from 'h3'; // Esempio: Usiamo H3Event se usi nitro/h3
// import { json } from "@solidjs/start/server"; // Esempio se SolidStart fornisce un helper json
// import { getRequestIP } from "vinxi/http"; // Esempio ipotetico per ottenere l'IP

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// Store in memoria (vedi note sotto per alternative)
const store: RateLimitStore = {};
// Carica le costanti dall'ambiente (o usa valori di default)
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX) || 100;
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW) || 900000; // 15 minutes

/**
 * Middleware di Rate Limiting per SolidStart/Vinxi (basato su FetchEvent/H3Event).
 *
 * @param event L'oggetto evento della richiesta (es. H3Event, FetchEvent).
 * @returns Una Response con stato 429 se il limite è superato, altrimenti void/undefined.
 */
export async function rateLimitMiddleware(event: H3Event): Promise<Response | void> {
  // --- Ottenere IP e Path ---
  // NOTA: Il modo esatto per ottenere l'IP potrebbe dipendere dal tuo adapter/setup.
  // Prova event.node?.req?.socket?.remoteAddress o headers, o usa un helper specifico.
  // `getRequestIP` è un helper comune nell'ecosistema unjs/nitro/h3.
  const ip = event.node?.req?.socket?.remoteAddress || // Accesso diretto se disponibile (Node adapter)
             event.node?.req?.headers['x-forwarded-for']?.toString().split(',')[0].trim() || // Header X-Forwarded-For
             '0.0.0.0'; // Fallback

  // Ottieni il pathname dall'URL della richiesta
  let path = '/'; // Default
  try {
    // event.path è spesso disponibile in h3/nitro
    path = event.path || new URL(event.node.req.url || '', `http://${event.node.req.headers.host}`).pathname;
  } catch (e) {
      console.error("Error parsing request URL for rate limiting:", e);
  }


  const key = `${ip}-${path}`; // Chiave per lo store
  const now = Date.now();

  // --- Logica del Rate Limiting (quasi invariata) ---

  // Inizializza o resetta il record se la finestra è scaduta
  if (!store[key] || store[key].resetTime <= now) {
    store[key] = {
      count: 1,
      resetTime: now + WINDOW_MS
    };

    // Pianifica la pulizia della vecchia entry (meccanismo semplice)
    // NOTA: Questo timeout potrebbe non essere ideale in produzione ad alto traffico
    setTimeout(() => {
      // Verifica che la entry da cancellare sia ancora quella "vecchia"
      // per evitare race conditions se viene resettata nel frattempo.
      if (store[key]?.resetTime === now + WINDOW_MS) {
           delete store[key];
      }
    }, WINDOW_MS + 1000); // Aggiungi un piccolo buffer

    // Limite non raggiunto, fai proseguire la richiesta (non restituire nulla)
    return; // Equivalente a next() in questo contesto
  }

  // Controlla se il limite è stato raggiunto
  if (store[key].count >= MAX_REQUESTS) {
    // --- Limite Raggiunto: Invia Risposta 429 ---
    const retryAfter = Math.ceil((store[key].resetTime - now) / 1000);
    const body = {
      error: 'Too many requests',
      retryAfter: retryAfter
    };

    console.warn(`Rate limit exceeded for key: ${key}`); // Log opzionale

    // Imposta lo stato e il corpo della risposta
    // Metodo 1: Usando new Response() standard
    return new Response(JSON.stringify(body), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter) // Aggiungi header Retry-After
      }
    });
  }
     // Limite non raggiunto, incrementa il contatore
  store[key].count++;

  // Fai proseguire la richiesta (non restituendo nulla)
  return; // Equivalente a next()
  }