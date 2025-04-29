const express = require('express');
const router = express.Router();
const airportsController = require('../controllers/airportsController');

module.exports = (pool) => {
  const controller = airportsController(pool);
  router.get('/', controller.getAllAirports);
  router.post('/', controller.addAirport);
  router.put('/:id', controller.updateAirport);
  router.delete('/:id', controller.deleteAirport);

  return router;
};