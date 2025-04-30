module.exports = (pool) => {
  return {
    getAllCrewMembers: async () => {
      const result = await pool.query('SELECT * FROM crew_members');
      return result.rows;
    },

    addCrewMember: async (data) => {
      const { employee_id, first_name, last_name, position, email, phone, experience_years, status, license_number } = data;
      try {
        // Check if employee_id already exists
        const checkResult = await pool.query(
          'SELECT 1 FROM crew_members WHERE employee_id = $1',
          [employee_id]
        );
        if (checkResult.rowCount > 0) {
          throw new Error('Employee ID already exists');
        }
        // Check if email already exists (since email has a UNIQUE constraint)
        const emailCheck = await pool.query(
          'SELECT 1 FROM crew_members WHERE email = $1',
          [email]
        );
        if (emailCheck.rowCount > 0) {
          throw new Error('Email already exists');
        }
        // Normalize status
        const normalizedStatus = status ? status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ') : 'Active';
        // Set license_number based on position
        const finalLicenseNumber = position === 'Captain' || position === 'First Officer' ? license_number : null;
        const result = await pool.query(
          'INSERT INTO crew_members (employee_id, first_name, last_name, position, email, phone, experience_years, status, license_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
          [employee_id, first_name, last_name, position, email, phone, experience_years || 0, normalizedStatus, finalLicenseNumber]
        );
        return result.rows[0];
      } catch (error) {
        throw error;
      }
    },

    updateCrewMember: async (id, data) => {
      const { employee_id, first_name, last_name, position, email, phone, experience_years, status, license_number } = data;
      const normalizedStatus = status ? status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ') : 'Active';
      const finalLicenseNumber = position === 'Captain' || position === 'First Officer' ? license_number : null;
      const result = await pool.query(
        'UPDATE crew_members SET employee_id = $1, first_name = $2, last_name = $3, position = $4, email = $5, phone = $6, experience_years = $7, status = $8, license_number = $9 WHERE id = $10 RETURNING *',
        [employee_id, first_name, last_name, position, email, phone, experience_years || 0, normalizedStatus, finalLicenseNumber, id]
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