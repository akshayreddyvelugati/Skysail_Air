// passengerBookingsRoute.js
const express = require('express');
const router = express.Router();
const passengerBookingsController = require('../controllers/passengerBookingsController');

module.exports = (pool) => {
  const controller = passengerBookingsController(pool);
  router.post('/', controller.createPassengerBooking);
  router.get('/passenger/:passengerId', controller.getBookingsByPassengerId);
  router.delete('/:passengerId/:bookingId', controller.deletePassengerBooking);
  return router;
};