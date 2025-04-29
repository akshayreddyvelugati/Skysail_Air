const messagesModel = require('../models/messagesModel');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await messagesModel.getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching messages' });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const newMessage = await messagesModel.addMessage(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding message' });
  }
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await messagesModel.deleteMessage(id);
    res.json(deletedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting message' });
  }
};
