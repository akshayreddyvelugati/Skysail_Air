module.exports = (pool) => {
  return {
    getAllFlights: async () => {
      const result = await pool.query('SELECT * FROM flights');
      return result.rows;
    },

    getFlightById: async (id) => {
      const result = await pool.query('SELECT * FROM flights WHERE id = $1', [id]);
      return result.rows[0] || null;
    },

    addFlight: async (data) => {
      const { flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price } = data;
      const result = await pool.query(
        'INSERT INTO flights (flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status || 'Scheduled', price]
      );
      return result.rows[0];
    },

    updateFlight: async (id, data) => {
      const { flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status, price } = data;
      const result = await pool.query(
        'UPDATE flights SET flight_number = $1, origin_airport_id = $2, destination_airport_id = $3, aircraft_id = $4, departure_date = $5, departure_time = $6, arrival_time = $7, status = $8, price = $9 WHERE id = $10 RETURNING *',
        [flight_number, origin_airport_id, destination_airport_id, aircraft_id, departure_date, departure_time, arrival_time, status || 'Scheduled', price, id]
      );
      if (result.rowCount === 0) {
        throw new Error('Flight not found');
      }
      return result.rows[0];
    },

    deleteFlight: async (id) => {
      const result = await pool.query('DELETE FROM flights WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        throw new Error('Flight not found');
      }
      return result.rows[0];
    }
  };
};