const express = require('express');
const router = express.Router();
const seatsController = require('../controllers/seatsController');

router.get('/:flight_id', seatsController.getSeatsByFlightId);
router.post('/', seatsController.addSeat);
router.put('/:id', seatsController.updateSeatStatus);
router.delete('/:id', seatsController.deleteSeat);

module.exports = router;
