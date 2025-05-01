const { Pool } = require('pg');

// Configure PostgreSQL connection (moved to controller or app.js if needed)
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'skysail_db', // Replace with your database name
  password: 'your_password', // Replace with your PostgreSQL password
  port: 5432,
});

const getAllFlights = async (pool, filters = {}) => {
  const { origin_airport_id, destination_airport_id, departure_date } = filters;

  try {
    let query = 'SELECT * FROM flights WHERE 1=1';
    const params = [];

    if (origin_airport_id) {
      query += ' AND origin_airport_id = $' + (params.length + 1);
      params.push(origin_airport_id);
    }
    if (destination_airport_id) {
      query += ' AND destination_airport_id = $' + (params.length + 1);
      params.push(destination_airport_id);
    }
    if (departure_date) {
      query += ' AND departure_date = $' + (params.length + 1);
      params.push(departure_date);
    }

    const result = await pool.query(query, params);
    return result.rows;
  } catch (err) {
    throw new Error('Failed to fetch flights: ' + err.message);
  }
};

const createFlight = async (pool, flightData) => {
  const { flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price } = flightData;
  try {
    const result = await pool.query(
      'INSERT INTO flights (flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price]
    );
    return result.rows[0];
  } catch (err) {
    throw err; // Let the controller handle specific errors
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