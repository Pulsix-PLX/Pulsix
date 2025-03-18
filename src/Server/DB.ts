import pg from 'pg';
const { Pool } = pg;

export const db = new Pool({
  user: 'matteo',
  host: '16.171.146.210',
  database: 'Pulsix',
  password: 'matt9946',
  port: 5432,
});