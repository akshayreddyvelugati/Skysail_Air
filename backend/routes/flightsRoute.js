const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController');

router.get('/:id', flightsController.getFlightById); 
router.post('/', flightsController.addFlight);
router.put('/:id', flightsController.updateFlight);
router.delete('/:id', flightsController.deleteFlight);

module.exports = router;
