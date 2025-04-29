const pool = require('../config/dbConfig');

exports.getAllCrewMembers = async () => {
  const result = await pool.query('SELECT * FROM crew_members ORDER BY id ASC');
  return result.rows;
};

exports.addCrewMember = async ({ employee_id, first_name, last_name, position, email, phone, experience_years, status }) => {
  const result = await pool.query(
    `INSERT INTO crew_members (employee_id, first_name, last_name, position, email, phone, experience_years, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [employee_id, first_name, last_name, position, email, phone, experience_years, status]
  );
  return result.rows[0];
};

exports.updateCrewMember = async (id, { employee_id, first_name, last_name, position, email, phone, experience_years, status }) => {
  const result = await pool.query(
    `UPDATE crew_members
     SET employee_id = $1, first_name = $2, last_name = $3, position = $4,
         email = $5, phone = $6, experience_years = $7, status = $8
     WHERE id = $9
     RETURNING *`,
    [employee_id, first_name, last_name, position, email, phone, experience_years, status, id]
  );
  return result.rows[0];
};

exports.deleteCrewMember = async (id) => {
  const result = await pool.query(
    `DELETE FROM crew_members
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};
