const pool = require('../config/dbConfig');

exports.getSeatsByFlightId = async (flight_id) => {
  const result = await pool.query(
    `SELECT * FROM seats WHERE flight_id = $1 ORDER BY seat_number ASC`,
    [flight_id]
  );
  return result.rows;
};

exports.addSeat = async ({ flight_id, seat_number, seat_type, status }) => {
  const result = await pool.query(
    `INSERT INTO seats (flight_id, seat_number, seat_type, status)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [flight_id, seat_number, seat_type, status]
  );
  return result.rows[0];
};

exports.updateSeatStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE seats
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

exports.deleteSeat = async (id) => {
  const result = await pool.query(
    `DELETE FROM seats
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};
