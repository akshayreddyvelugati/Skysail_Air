const express = require('express');
const router = express.Router();
const airportsController = require('../controllers/airportsController');

router.get('/', airportsController.getAllAirports);
router.post('/', airportsController.addAirport);
router.put('/:id', airportsController.updateAirport);
router.delete('/:id', airportsController.deleteAirport);

module.exports = router;
