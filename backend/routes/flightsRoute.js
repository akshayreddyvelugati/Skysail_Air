// router.js
const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController');

// Placeholder for pool (will be passed from index.js)
let controller;

module.exports = (pool) => {
  if (!controller) {
    controller = flightsController(pool);
  }
  router.post('/', controller.createFlight);
  router.get('/', controller.getAllFlights);
  router.put('/:id', controller.updateFlight);
  router.delete('/:id', controller.deleteFlight);

  return router;
};