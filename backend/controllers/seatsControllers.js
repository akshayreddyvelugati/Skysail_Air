const seatsModel = require('../models/seatsModel');

exports.getSeatsByFlightId = async (req, res) => {
  const { flight_id } = req.params;
  try {
    const seats = await seatsModel.getSeatsByFlightId(flight_id);
    res.json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching seats' });
  }
};

exports.addSeat = async (req, res) => {
  try {
    const newSeat = await seatsModel.addSeat(req.body);
    res.status(201).json(newSeat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding seat' });
  }
};

exports.updateSeatStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedSeat = await seatsModel.updateSeatStatus(id, status);
    res.json(updatedSeat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating seat status' });
  }
};

exports.deleteSeat = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSeat = await seatsModel.deleteSeat(id);
    res.json(deletedSeat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting seat' });
  }
};
