const express = require('express');
const router = express.Router();
const airplanesController = require('../controllers/airplanesController');

module.exports = (pool) => {
  const controller = airplanesController(pool);
  router.get('/', controller.getAllAirplanes);
  router.post('/', controller.addAirplane);
  router.put('/:id', controller.updateAirplane);
  router.delete('/:id', controller.deleteAirplane);

  return router;
};