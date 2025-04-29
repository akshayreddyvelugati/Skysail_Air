const seatsModel = require('../models/seatsModel');

module.exports = (pool) => {
  return {
    getSeatsByFlightId: async (req, res) => {
      const { flight_id } = req.params;
      try {
        const seats = await seatsModel(pool).getSeatsByFlightId(flight_id);
        res.json(seats);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching seats' });
      }
    },

    addSeat: async (req, res) => {
      try {
        const newSeat = await seatsModel(pool).addSeat(req.body);
        res.status(201).json(newSeat);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error adding seat' });
      }
    },

    updateSeatStatus: async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      try {
        const updatedSeat = await seatsModel(pool).updateSeatStatus(id, status);
        res.json(updatedSeat);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error updating seat status' });
      }
    },

    deleteSeat: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedSeat = await seatsModel(pool).deleteSeat(id);
        res.json(deletedSeat);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error deleting seat' });
      }
    }
  };
};