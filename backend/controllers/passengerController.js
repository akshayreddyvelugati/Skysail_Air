const passengersModel = require('../models/passengersModel');

exports.getAllPassengers = async (req, res) => {
  try {
    const passengers = await passengersModel.getAllPassengers();
    res.json(passengers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching passengers' });
  }
};

exports.addPassenger = async (req, res) => {
  try {
    const newPassenger = await passengersModel.addPassenger(req.body);
    res.status(201).json(newPassenger);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding passenger' });
  }
};

exports.updatePassenger = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPassenger = await passengersModel.updatePassenger(id, req.body);
    res.json(updatedPassenger);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating passenger' });
  }
};

exports.deletePassenger = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPassenger = await passengersModel.deletePassenger(id);
    res.json(deletedPassenger);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting passenger' });
  }
};
