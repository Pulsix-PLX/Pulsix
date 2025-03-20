import pg from 'pg';
const { Pool } = pg;

export const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'prova',
  password: 'matt9946',
  port: 5433,
});
