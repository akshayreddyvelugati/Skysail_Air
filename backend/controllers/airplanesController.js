const airplanesModel = require('../models/airplanesModel');

exports.getAllAirplanes = async (req, res) => {
  try {
    const airplanes = await airplanesModel.getAllAirplanes();
    res.json(airplanes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching airplanes' });
  }
};

exports.addAirplane = async (req, res) => {
  try {
    const newAirplane = await airplanesModel.addAirplane(req.body);
    res.status(201).json(newAirplane);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding airplane' });
  }
};

exports.updateAirplane = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAirplane = await airplanesModel.updateAirplane(id, req.body);
    res.json(updatedAirplane);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating airplane' });
  }
};

exports.deleteAirplane = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAirplane = await airplanesModel.deleteAirplane(id);
    res.json(deletedAirplane);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting airplane' });
  }
};
