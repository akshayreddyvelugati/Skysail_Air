module.exports = (pool) => {
  return {
    getAllCrewMembers: async () => {
      const result = await pool.query('SELECT * FROM crew_members');
      return result.rows;
    },

    addCrewMember: async (data) => {
      const { employee_id, first_name, last_name, position, email, phone, experience_years, status } = data;
      const result = await pool.query(
        'INSERT INTO crew_members (employee_id, first_name, last_name, position, email, phone, experience_years, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [employee_id, first_name, last_name, position, email, phone, experience_years || 0, status || 'Active']
      );
      return result.rows[0];
    },

    updateCrewMember: async (id, data) => {
      const { employee_id, first_name, last_name, position, email, phone, experience_years, status } = data;
      const result = await pool.query(
        'UPDATE crew_members SET employee_id = $1, first_name = $2, last_name = $3, position = $4, email = $5, phone = $6, experience_years = $7, status = $8 WHERE id = $9 RETURNING *',
        [employee_id, first_name, last_name, position, email, phone, experience_years || 0, status || 'Active', id]
      );
      if (result.rowCount === 0) {
        throw new Error('Crew member not found');
      }
      return result.rows[0];
    },

    deleteCrewMember: async (id) => {
      const result = await pool.query('DELETE FROM crew_members WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        throw new Error('Crew member not found');
      }
      return result.rows[0];
    }
  };
};