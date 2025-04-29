const express = require('express');
const router = express.Router();
const passengersController = require('../controllers/passengersController');

module.exports = (pool) => {
  const controller = passengersController(pool);
  router.get('/', controller.getAllPassengers);
  router.post('/', controller.addPassenger);
  router.put('/:id', controller.updatePassenger);
  router.delete('/:id', controller.deletePassenger);

  return router;
};