module.exports = (pool) => {
  return {
    getAllAirports: async () => {
      const result = await pool.query('SELECT * FROM airports');
      return result.rows;
    },

    addAirport: async (data) => {
      const { code, name, city, country, terminals } = data;
      try {
        // Check if code already exists
        const checkResult = await pool.query(
          'SELECT 1 FROM airports WHERE code = $1',
          [code]
        );
        if (checkResult.rowCount > 0) {
          throw new Error('Airport code already exists');
        }
        // Insert new airport
        const result = await pool.query(
          'INSERT INTO airports (code, name, city, country, terminals) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [code, name, city, country, terminals]
        );
        return result.rows[0];
      } catch (error) {
        throw error; // Re-throw the error to be handled by the controller
      }
    },

    updateAirport: async (id, data) => {
      const { code, name, city, country, terminals } = data;
      const result = await pool.query(
        'UPDATE airports SET code = $1, name = $2, city = $3, country = $4, terminals = $5 WHERE id = $6 RETURNING *',
        [code, name, city, country, terminals, id]
      );
      if (result.rowCount === 0) {
        throw new Error('Airport not found');
      }
      return result.rows[0];
    },

    deleteAirport: async (id) => {
      const result = await pool.query('DELETE FROM airports WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        throw new Error('Airport not found');
      }
      return result.rows[0];
    }
  };
};