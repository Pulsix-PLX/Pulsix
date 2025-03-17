import { action } from "@solidjs/router";
import { db } from "~/Server/DB";
  export  const usernameAlreadyexist = action(async (username: string) => {
  
  try {
    const result = await db.query('SELECT User FROM Users WHERE User = $1 RETURNING *', [username]);

    if (result.rows.length > 0) {
      return 'already exist';
    }
    return;
  } catch (error) {
    console.error("Error checking if username already exists:", error);
    throw new Error("Failed to check username");
  }
}, 'usernameAlreadyexist'); //Obbligatorio metterla, altrimenti non funziona & meglio non riutilizzare lo stesso nome
