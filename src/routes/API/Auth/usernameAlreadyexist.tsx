import { action } from "@solidjs/router";
import { db } from "~/Server/DB";


export const prova = action(async () => {
  console.log('Action called with:');
  try {
    console.log('Executing query...');
    const result = await db.query('SELECT * FROM prova');
    console.log('Query result:', result.rows);
    
    if (result.rows.length > 0) {
      return 'already exist';
    }
    return 'available';
  } catch (error) {
    console.error("Error checking username:", error);
    return `error:`;
  }
}, 'prova');


export const usernameAlreadyexist = action(async (formData) => {
  console.log('Action called with:', formData);
  
  // Gestisci sia FormData che stringhe
  const username = typeof formData === 'string' ? formData : formData.get('username');
  
  console.log('Processing username:', username);
  
  try {
    console.log('Executing query...');
    const result = await db.query('SELECT username FROM users WHERE username = $1', [username]);
    console.log('Query result:', result.rows);
    
    if (result.rows.length > 0) {
      return 'already exist';
    }
    return 'available';
  } catch (error) {
    console.error("Error checking username:", error);
    return `error:`;
  }
}, 'usernameAlreadyexist');
