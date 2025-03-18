import type { APIEvent } from "@solidjs/start/server";
import { db } from "~/Server/DB";

export async function GET({ request }: APIEvent) {
  console.log('yes')
  try {
    const result = await db.query('SELECT * from prova');
    console.log(result.rows)
return result.rows;
  } catch (error) {
    console.error("Database test failed:", error);

  }
}