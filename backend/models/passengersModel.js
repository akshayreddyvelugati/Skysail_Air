module.exports = (pool) => {
  return {
    getAllPassengers: async () => {
      try {
        const query = `
          SELECT p.*, pb.booking_id
          FROM passengers p
          LEFT JOIN passenger_bookings pb ON p.id = pb.passenger_id;
        `;
        const result = await pool.query(query);
        return result.rows;
      } catch (error) {
        throw new Error('Database error fetching passengers: ' + error.message);
      }
    },

    addPassenger: async (passengerData) => {
      const {
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        gender,
        nationality,
        meal_preference,
        passport_number
      } = passengerData;

      try {
        const passengerQuery = `
          INSERT INTO passengers (first_name, last_name, email, phone, date_of_birth, gender, nationality, meal_preference, passport_number, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)
          RETURNING *;
        `;
        const passengerValues = [
          first_name,
          last_name,
          email,
          phone,
          date_of_birth,
          gender,
          nationality,
          meal_preference || 'Vegetarian', // Default to Vegetarian if not provided
          passport_number || null
        ];
        const passengerResult = await pool.query(passengerQuery, passengerValues);
        return passengerResult.rows[0];
      } catch (error) {
        throw new Error('Database error adding passenger: ' + error.message);
      }
    },

    updatePassenger: async (id, passengerData) => {
      const {
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        gender,
        nationality,
        meal_preference,
        passport_number
      } = passengerData;

      try {
        const query = `
          UPDATE passengers
          SET first_name = $1, last_name = $2, email = $3, phone = $4, date_of_birth = $5,
              gender = $6, nationality = $7, meal_preference = $8, passport_number = $9
          WHERE id = $10
          RETURNING *;
        `;
        const values = [
          first_name,
          last_name,
          email,
          phone,
          date_of_birth,
          gender,
          nationality,
          meal_preference,
          passport_number || null,
          id
        ];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
          throw new Error('Passenger not found');
        }
        return result.rows[0];
      } catch (error) {
        throw new Error('Database error updating passenger: ' + error.message);
      }
    },

    deletePassenger: async (id) => {
      try {
        const query = `
          DELETE FROM passengers
          WHERE id = $1
          RETURNING *;
        `;
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
          throw new Error('Passenger not found');
        }
        return result.rows[0];
      } catch (error) {
        throw new Error('Database error deleting passenger: ' + error.message);
      }
    }
  };
};