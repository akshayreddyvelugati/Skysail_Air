const pool = require('../config/dbConfig');

exports.getAllBookings = async () => {
  const result = await pool.query('SELECT * FROM bookings ORDER BY id ASC');
  return result.rows;
};

exports.addBooking = async ({ booking_id, flight_id, passenger_id, seat_id, booking_status, total_price }) => {
  const result = await pool.query(
    `INSERT INTO bookings (booking_id, flight_id, passenger_id, seat_id, booking_status, total_price)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [booking_id, flight_id, passenger_id, seat_id, booking_status, total_price]
  );
  return result.rows[0];
};

exports.updateBookingStatus = async (id, booking_status) => {
  const result = await pool.query(
    `UPDATE bookings
     SET booking_status = $1
     WHERE id = $2
     RETURNING *`,
    [booking_status, id]
  );
  return result.rows[0];
};

exports.deleteBooking = async (id) => {
  const result = await pool.query(
    `DELETE FROM bookings
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};
