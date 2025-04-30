const { Pool } = require('pg');

// Configure PostgreSQL connection (moved to controller or app.js if needed)
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'skysail_db', // Replace with your database name
  password: 'your_password', // Replace with your PostgreSQL password
  port: 5432,
});

const createFlight = async (pool, flightData) => {
  const query = `
    INSERT INTO flights (
      flight_number, origin_airport_id, destination_airport_id, aircraft_id,
      departure_date, departure_time, arrival_time, status, price
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
  const values = [
    flightData.flight_number,
    flightData.origin_airport_id,
    flightData.destination_airport_id,
    flightData.aircraft_id,
    flightData.departure_date,
    flightData.departure_time,
    flightData.arrival_time,
    flightData.status,
    flightData.price,
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getAllFlights = async (pool) => {
  const query = 'SELECT * FROM flights ORDER BY departure_date, departure_time;';
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const updateFlight = async (pool, id, flightData) => {
  const query = `
    UPDATE flights
    SET flight_number = $1, origin_airport_id = $2, destination_airport_id = $3,
        aircraft_id = $4, departure_date = $5, departure_time = $6,
        arrival_time = $7, status = $8, price = $9
    WHERE id = $10
    RETURNING *;
  `;
  const values = [
    flightData.flight_number,
    flightData.origin_airport_id,
    flightData.destination_airport_id,
    flightData.aircraft_id,
    flightData.departure_date,
    flightData.departure_time,
    flightData.arrival_time,
    flightData.status,
    flightData.price,
    id,
  ];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error('Flight not found');
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteFlight = async (pool, id) => {
  const query = 'DELETE FROM flights WHERE id = $1 RETURNING *;';
  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw new Error('Flight not found');
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createFlight,
  getAllFlights,
  updateFlight,
  deleteFlight,
};