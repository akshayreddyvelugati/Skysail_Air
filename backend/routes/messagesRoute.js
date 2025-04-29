const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

module.exports = (pool) => {
  const controller = messagesController(pool);
  router.get('/', controller.getAllMessages);
  router.post('/', controller.addMessage);
  router.delete('/:id', controller.deleteMessage);

  return router;
};