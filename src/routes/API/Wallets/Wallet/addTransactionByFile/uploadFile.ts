// src/routes/api/parse-statement.ts
import { parse } from 'csv-parse/sync';
import { action } from '@solidjs/router';
import type { APIEvent } from '@solidjs/start/server';

export async function POST (event:APIEvent) {
  'use server';

  try {
    // Leggi il contenuto del file come testo
    // Get the form data from the request
    const formData = await event.request.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      throw new Error('No file uploaded or invalid file');
    }
    const fileContent = await file.text();


    // Converti il CSV in un array di oggetti JavaScript
    const delimiter = detectDelimiter(fileContent);
    console.log(`Delimitatore rilevato: '${delimiter}'`);
    
    // Usa il delimitatore rilevato per il parsing
    const rows = parse(fileContent, {
      delimiter: delimiter,
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_quotes: true,
      relax_column_count: true
    });

   // Estraiamo le intestazioni (prima riga)
   const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
   
    console.log(headers);

    // Prendiamo solo le prime 5 righe per l'anteprima
   ///OPSIONALE const previewRows = rows.slice(0, 5);
    return { 
       headers: headers,
        rows: rows, // Includi tutti i dati per l'elaborazione successiva
        length: rows.length, 
    }
  } catch (error: any) {
    console.error('Errore nel parsing del CSV:', error);
    return {
      error: "Errore durante l'elaborazione del file",
      details: error.message,
    };
  }
}
function detectDelimiter(csvContent: string): string {
  // Esamina solo le prime righe per efficienza
  const sampleLines = csvContent.split('\n').slice(0, 10).join('\n');
  
  // Possibili delimitatori comuni
  const possibleDelimiters = [',', ';', '\t', '|'];
  let bestDelimiter = ','; // Default a virgola
  let maxCount = 0;
  
  // Conta le occorrenze di ciascun delimitatore
  for (const delimiter of possibleDelimiters) {
    // Ignora i delimitatori all'interno di campi racchiusi tra virgolette
    // Regex che esclude delimitatori all'interno di virgolette
    const regex = new RegExp(`(?=(?:[^"]*"[^"]*")*[^"]*$)\\${delimiter}`, 'g');
    const count = (sampleLines.match(regex) || []).length;
    
    if (count > maxCount) {
      maxCount = count;
      bestDelimiter = delimiter;
    }
  }
  
  return bestDelimiter;
}