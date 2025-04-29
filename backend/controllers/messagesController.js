const messagesModel = require('../models/messagesModel');

module.exports = (pool) => {
  return {
    getAllMessages: async (req, res) => {
      try {
        const messages = await messagesModel(pool).getAllMessages();
        res.json(messages);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching messages' });
      }
    },

    addMessage: async (req, res) => {
      try {
        const newMessage = await messagesModel(pool).addMessage(req.body);
        res.status(201).json(newMessage);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error adding message' });
      }
    },

    deleteMessage: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedMessage = await messagesModel(pool).deleteMessage(id);
        res.json(deletedMessage);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error deleting message' });
      }
    }
  };
};