// passengerBookingsModel.js
module.exports = (pool) => {
    return {
      createPassengerBooking: async (data) => {
        const { passenger_id, booking_id } = data;
        const result = await pool.query(
          'INSERT INTO passenger_bookings (passenger_id, booking_id) VALUES ($1, $2) RETURNING *',
          [passenger_id, booking_id]
        );
        return result.rows[0];
      },
  
      getBookingsByPassengerId: async (passengerId) => {
        const result = await pool.query(
          `SELECT b.*, f.flight_number, f.departure_date, a1.code AS origin_code, a2.code AS dest_code
           FROM bookings b
           JOIN passenger_bookings pb ON b.id = pb.booking_id
           JOIN flights f ON b.flight_id = f.id
           JOIN airports a1 ON f.origin_airport_id = a1.id
           JOIN airports a2 ON f.destination_airport_id = a2.id
           WHERE pb.passenger_id = $1`,
          [passengerId]
        );
        return result.rows;
      },
  
      deletePassengerBooking: async (passengerId, bookingId) => {
        const result = await pool.query(
          'DELETE FROM passenger_bookings WHERE passenger_id = $1 AND booking_id = $2 RETURNING *',
          [passengerId, bookingId]
        );
        return result.rows[0] || null;
      }
    };
  };