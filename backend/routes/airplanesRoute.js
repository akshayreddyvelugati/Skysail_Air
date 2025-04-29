const express = require('express');
const router = express.Router();
const airplanesController = require('../controllers/airplanesController');

router.get('/', airplanesController.getAllAirplanes);
router.post('/', airplanesController.addAirplane);
router.put('/:id', airplanesController.updateAirplane);
router.delete('/:id', airplanesController.deleteAirplane);

module.exports = router;
