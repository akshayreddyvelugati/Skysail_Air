const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController');

module.exports = (pool) => {
  const controller = flightsController(pool);
  router.get('/', controller.getAllFlights);
  router.get('/:id', controller.getFlightById);
  router.post('/', controller.addFlight);
  router.put('/:id', controller.updateFlight);
  router.delete('/:id', controller.deleteFlight);

  return router;
};