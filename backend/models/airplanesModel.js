const pool = require('../config/dbConfig');

exports.getAllAirplanes = async () => {
  const result = await pool.query('SELECT * FROM airplanes ORDER BY id ASC');
  return result.rows;
};

exports.addAirplane = async ({ registration_number, model, manufacturer, capacity, status, manufacture_year }) => {
  const result = await pool.query(
    `INSERT INTO airplanes (registration_number, model, manufacturer, capacity, status, manufacture_year)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [registration_number, model, manufacturer, capacity, status, manufacture_year]
  );
  return result.rows[0];
};

exports.updateAirplane = async (id, { registration_number, model, manufacturer, capacity, status, manufacture_year }) => {
  const result = await pool.query(
    `UPDATE airplanes
     SET registration_number = $1, model = $2, manufacturer = $3, capacity = $4, status = $5, manufacture_year = $6
     WHERE id = $7
     RETURNING *`,
    [registration_number, model, manufacturer, capacity, status, manufacture_year, id]
  );
  return result.rows[0];
};

exports.deleteAirplane = async (id) => {
  const result = await pool.query(
    `DELETE FROM airplanes
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};
