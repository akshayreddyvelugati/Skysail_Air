module.exports = (pool) => {
  return {
    getAllAirplanes: async () => {
      const result = await pool.query('SELECT * FROM airplanes');
      return result.rows;
    },

    addAirplane: async (data) => {
      const { registration_number, model, manufacturer, capacity, status, manufacture_year } = data;
      // Capitalize status to match database constraint
      const normalizedStatus = status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : 'Active';
      const result = await pool.query(
        'INSERT INTO airplanes (registration_number, model, manufacturer, capacity, status, manufacture_year) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [registration_number, model, manufacturer, capacity || 180, normalizedStatus, manufacture_year]
      );
      return result.rows[0];
    },

    updateAirplane: async (id, data) => {
      const { registration_number, model, manufacturer, capacity, status, manufacture_year } = data;
      const normalizedStatus = status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : 'Active';
      const result = await pool.query(
        'UPDATE airplanes SET registration_number = $1, model = $2, manufacturer = $3, capacity = $4, status = $5, manufacture_year = $6 WHERE id = $7 RETURNING *',
        [registration_number, model, manufacturer, capacity || 180, normalizedStatus, manufacture_year, id]
      );
      if (result.rowCount === 0) {
        throw new Error('Airplane not found');
      }
      return result.rows[0];
    },

    deleteAirplane: async (id) => {
      const result = await pool.query('DELETE FROM airplanes WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        throw new Error('Airplane not found');
      }
      return result.rows[0];
    }
  };
};