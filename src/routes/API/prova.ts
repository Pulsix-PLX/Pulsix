import { json } from "@solidjs/router";
import type { APIEvent } from '@solidjs/start/server';
import { checkStateUser } from "./utils/checkStateUser";
export async function POST(event: APIEvent) {
  "use server";
  console.log('prima del check')
  const authHeader = event.request.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  console.log('Bearer Token:', bearerToken);
  try {
    //checkStateUser();
  } catch (error) {
    return json(
      { success: false, message: 'Errore interno del server durante il login.' },
      { status: 401 });
  }
  
 
try {

  return json(
    { success: true, message: 'Good.' },
    { status: 200 }
  )
} catch (error) {
  return json(
    { success: false, message: 'Errore interno del server durante il login.' },
    { status: 500 }
  );
}
    
  
}
