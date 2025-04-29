module.exports = (pool) => {
  return {
    getAllAirports: async () => {
      const result = await pool.query('SELECT * FROM airports');
      return result.rows;
    },

    addAirport: async (data) => {
      const { code, name, city, country, terminals } = data;
      const result = await pool.query(
        'INSERT INTO airports (code, name, city, country, terminals) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [code, name, city, country, terminals || 1]
      );
      return result.rows[0];
    },

    updateAirport: async (id, data) => {
      const { code, name, city, country, terminals } = data;
      const result = await pool.query(
        'UPDATE airports SET code = $1, name = $2, city = $3, country = $4, terminals = $5 WHERE id = $6 RETURNING *',
        [code, name, city, country, terminals || 1, id]
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