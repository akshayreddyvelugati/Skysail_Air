const express = require('express');
const router = express.Router();
const seatsController = require('../controllers/seatsController');

module.exports = (pool) => {
  const controller = seatsController(pool);
  router.get('/flight/:flight_id', controller.getSeatsByFlightId);
  router.post('/', controller.addSeat);
  router.put('/:id', controller.updateSeatStatus);
  router.delete('/:id', controller.deleteSeat);

  return router;
};