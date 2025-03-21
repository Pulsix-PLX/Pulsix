// src/routes/api/users.ts
import { db } from '~/Server/db.server';

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM users');
    return result.rows
  } catch (error) {
    console.error('Database error:', error);
    return 
  }
}
