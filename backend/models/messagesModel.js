module.exports = (pool) => {
  return {
    getAllMessages: async () => {
      const result = await pool.query('SELECT * FROM messages');
      return result.rows;
    },

    addMessage: async (data) => {
      const { name, email, subject, message, consent } = data;
      const result = await pool.query(
        'INSERT INTO messages (name, email, subject, message, consent) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, subject, message, consent || false]
      );
      return result.rows[0];
    },

    deleteMessage: async (id) => {
      const result = await pool.query('DELETE FROM messages WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        throw new Error('Message not found');
      }
      return result.rows[0];
    }
  };
};