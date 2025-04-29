const airportsModel = require('../models/airportsModel');

exports.getAllAirports = async (req, res) => {
  try {
    const airports = await airportsModel.getAllAirports();
    res.json(airports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching airports' });
  }
};

exports.addAirport = async (req, res) => {
  try {
    const newAirport = await airportsModel.addAirport(req.body);
    res.status(201).json(newAirport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding airport' });
  }
};

exports.updateAirport = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAirport = await airportsModel.updateAirport(id, req.body);
    res.json(updatedAirport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating airport' });
  }
};

exports.deleteAirport = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAirport = await airportsModel.deleteAirport(id);
    res.json(deletedAirport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting airport' });
  }
};
