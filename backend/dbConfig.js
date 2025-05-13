const { Pool, types } = require('pg');

// Prevent pg from parsing DATE fields into JavaScript Date objects
types.setTypeParser(1082, value => value); // OID 1082 is for DATE type

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = pool;