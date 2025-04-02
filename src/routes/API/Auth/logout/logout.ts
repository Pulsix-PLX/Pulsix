import { action } from "@solidjs/router";
import { useSession } from "vinxi/http";

type AuthSessionData = { userId?: string; username?: string; };

export const logoutUser = action(async () => {
    'use server';
    try {
         const session = await useSession<AuthSessionData>({
            password: process.env.SESSION_SECRET!,
            name: "auth_session",
        });
        await session.clear(); // Pulisce i dati e invalida il cookie
        console.log('Sessione (cookie criptato) cancellata.');
        return { success: true };
    } catch (error) {
         console.error('Errore durante il logout:', error);
         if (!process.env.SESSION_SECRET) {
            console.error("SESSION_SECRET non è impostata!");
         }
        return { success: false, message: 'Errore durante il logout' };
    }
}, 'logoutUser');