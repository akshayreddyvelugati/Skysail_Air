const pool = require('../config/dbConfig');

exports.getAllMessages = async () => {
  const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
  return result.rows;
};

exports.addMessage = async ({ name, email, subject, message, consent }) => {
  const result = await pool.query(
    `INSERT INTO messages (name, email, subject, message, consent)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email, subject, message, consent]
  );
  return result.rows[0];
};

exports.deleteMessage = async (id) => {
  const result = await pool.query(
    `DELETE FROM messages
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};
