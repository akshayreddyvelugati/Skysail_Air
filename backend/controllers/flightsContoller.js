const flightsModel = require('../models/flightsModel');

exports.getAllFlights = async (req, res) => {
  try {
    const flights = await flightsModel.getAllFlights();
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching flights' });
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await flightsModel.getFlightById(id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.json(flight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching flight' });
  }
};

exports.addFlight = async (req, res) => {
  try {
    const newFlight = await flightsModel.addFlight(req.body);
    res.status(201).json(newFlight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding flight' });
  }
};

exports.updateFlight = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFlight = await flightsModel.updateFlight(id, req.body);
    res.json(updatedFlight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating flight' });
  }
};

exports.deleteFlight = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFlight = await flightsModel.deleteFlight(id);
    res.json(deletedFlight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting flight' });
  }
};

module.exports = {
  getAllFlights: exports.getAllFlights,
  getFlightById: exports.getFlightById,
  addFlight: exports.addFlight,
  updateFlight: exports.updateFlight,
  deleteFlight: exports.deleteFlight,
};