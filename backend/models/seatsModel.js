module.exports = (pool) => {
  return {
    getSeatsByFlightId: async (flight_id) => {
      const result = await pool.query('SELECT * FROM seats WHERE flight_id = $1', [flight_id]);
      return result.rows;
    },

    addSeat: async (data) => {
      const { flight_id, seat_number, seat_type, status } = data;
      const result = await pool.query(
        'INSERT INTO seats (flight_id, seat_number, seat_type, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [flight_id, seat_number, seat_type || 'Middle', status || 'Available']
      );
      return result.rows[0];
    },

    updateSeatStatus: async (id, status) => {
      const result = await pool.query(
        'UPDATE seats SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      if (result.rowCount === 0) {
        throw new Error('Seat not found');
      }
      return result.rows[0];
    },

    deleteSeat: async (id) => {
      const result = await pool.query('DELETE FROM seats WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        throw new Error('Seat not found');
      }
      return result.rows[0];
    }
  };
};