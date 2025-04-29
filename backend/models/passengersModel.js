module.exports = (pool) => {
  return {
    getAllPassengers: async () => {
      const result = await pool.query('SELECT * FROM passengers');
      return result.rows;
    },

    addPassenger: async (data) => {
      const { first_name, last_name, email, phone, date_of_birth, gender, nationality, meal_preference, passport_number } = data;
      const result = await pool.query(
        'INSERT INTO passengers (first_name, last_name, email, phone, date_of_birth, gender, nationality, meal_preference, passport_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [first_name, last_name, email, phone, date_of_birth, gender, nationality, meal_preference, passport_number]
      );
      return result.rows[0];
    },

    updatePassenger: async (id, data) => {
      const { first_name, last_name, email, phone, date_of_birth, gender, nationality, meal_preference, passport_number } = data;
      const result = await pool.query(
        'UPDATE passengers SET first_name = $1, last_name = $2, email = $3, phone = $4, date_of_birth = $5, gender = $6, nationality = $7, meal_preference = $8, passport_number = $9 WHERE id = $10 RETURNING *',
        [first_name, last_name, email, phone, date_of_birth, gender, nationality, meal_preference, passport_number, id]
      );
      if (result.rowCount === 0) {
        throw new Error('Passenger not found');
      }
      return result.rows[0];
    },

    deletePassenger: async (id) => {
      const result = await pool.query('DELETE FROM passengers WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        throw new Error('Passenger not found');
      }
      return result.rows[0];
    }
  };
};