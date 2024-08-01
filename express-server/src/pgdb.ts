const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DBUSERNAME,
  password: process.env.DBPW,
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DBNAME,
});

/*
module.exports = {
  query: (text: string, params: any) => pool.query(text, params),
};
*/
export const db = {
  query: (text: string, params?: any) => pool.query(text, params),
};
