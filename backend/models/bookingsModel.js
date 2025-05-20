module.exports = (pool) => {
  return {
    getAllBookings: async () => {
      const result = await pool.query('SELECT * FROM bookings');
      return result.rows;
    },

    getBookingById: async (id) => {
      const result = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
      return result.rows[0] || null;
    },

    createBooking: async (data) => {
      const { booking_id, flight_id, return_flight_id, seat_id, booking_status, total_price } = data;
      const result = await pool.query( 
        'INSERT INTO bookings (booking_id, flight_id, return_flight_id, seat_id, booking_status, total_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [booking_id, flight_id, return_flight_id, seat_id, booking_status || 'Confirmed', total_price]
      );
      return result.rows[0];
    },

    updateBooking: async (id, data) => {
      const { booking_id, flight_id, return_flight_id, seat_id, booking_status, total_price } = data;
      const result = await pool.query(
        'UPDATE bookings SET booking_id = $1, flight_id = $2, return_flight_id = $3, seat_id = $4, booking_status = $5, total_price = $6 WHERE id = $7 RETURNING *',
        [booking_id, flight_id, return_flight_id, seat_id, booking_status || 'Confirmed', total_price, id]
      );
      return result.rows[0] || null;
    },

    deleteBooking: async (id) => {
      const result = await pool.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
      return result.rows[0] || null;
    }
  };
};