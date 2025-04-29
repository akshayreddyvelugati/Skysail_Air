const pool = require('../config/dbConfig');

exports.getAllAirports = async () => {
  const result = await pool.query('SELECT * FROM airports ORDER BY id ASC');
  return result.rows;
};

exports.addAirport = async ({ code, name, city, country, terminals }) => {
  const result = await pool.query(
    `INSERT INTO airports (code, name, city, country, terminals)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [code, name, city, country, terminals]
  );
  return result.rows[0];
};

exports.updateAirport = async (id, { code, name, city, country, terminals }) => {
  const result = await pool.query(
    `UPDATE airports
     SET code = $1, name = $2, city = $3, country = $4, terminals = $5
     WHERE id = $6
     RETURNING *`,
    [code, name, city, country, terminals, id]
  );
  return result.rows[0];
};

exports.deleteAirport = async (id) => {
  const result = await pool.query(
    `DELETE FROM airports
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};
