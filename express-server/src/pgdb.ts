import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DBUSERNAME,
  password: process.env.DBPW,
  host: process.env.DBHOST,
  port: process.env.DBPORT as any,
  database: process.env.DBNAME,
});

/*
export const db = {
  query: (text: string, params?: any) => pool.query(text, params),
};
*/
export const db = {
  pool,
};
