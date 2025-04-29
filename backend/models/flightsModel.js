const pool = require('../config/dbConfig');

exports.getAllFlights = async () => {
  const result = await pool.query('SELECT * FROM flights ORDER BY id ASC');
  return result.rows;
};

exports.addFlight = async ({ flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price }) => {
  const result = await pool.query(
    `INSERT INTO flights (flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price]
  );
  return result.rows[0];
};

exports.updateFlight = async (id, { flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price }) => {
  const result = await pool.query(
    `UPDATE flights
     SET flight_number = $1, origin_airport_id = $2, destination_airport_id = $3, aircraft_id = $4,
         departure_date = $5, departure_time = $6, arrival_time = $7, status = $8, price = $9
     WHERE id = $10
     RETURNING *`,
    [flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price, id]
  );
  return result.rows[0];
};

exports.deleteFlight = async (id) => {
  const result = await pool.query(
    `DELETE FROM flights
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};
