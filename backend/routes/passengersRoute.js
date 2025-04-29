const express = require('express');
const router = express.Router();
const passengersController = require('../controllers/passengersController');

router.get('/', passengersController.getAllPassengers);
router.post('/', passengersController.addPassenger);
router.put('/:id', passengersController.updatePassenger);
router.delete('/:id', passengersController.deletePassenger);

module.exports = router;
