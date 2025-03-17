import pg from 'pg';
const { Pool } = pg;

export const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Finance Tracker',
  password: 'matt9946',
  port: 5433,
});