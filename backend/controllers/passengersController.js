const passengersModel = require('../models/passengersModel');

module.exports = (pool) => {
  return {
    getAllPassengers: async (req, res) => {
      try {
        const passengers = await passengersModel(pool).getAllPassengers();
        res.json(passengers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching passengers' });
      }
    },

    addPassenger: async (req, res) => {
      try {
        const newPassenger = await passengersModel(pool).addPassenger(req.body);
        res.status(201).json(newPassenger);
      } catch (error) {
        console.error(error);
        if (error.message.includes('duplicate key value violates unique constraint')) {
          res.status(400).json({ error: 'Email already exists' });
        } else {
          res.status(500).json({ error: 'Server error adding passenger' });
        }
      }
    },

    updatePassenger: async (req, res) => {
      const { id } = req.params;
      try {
        const updatedPassenger = await passengersModel(pool).updatePassenger(id, req.body);
        res.json(updatedPassenger);
      } catch (error) {
        console.error(error);
        if (error.message.includes('duplicate key value violates unique constraint')) {
          res.status(400).json({ error: 'Email already exists' });
        } else {
          res.status(500).json({ error: 'Server error updating passenger' });
        }
      }
    },

    deletePassenger: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedPassenger = await passengersModel(pool).deletePassenger(id);
        res.json(deletedPassenger);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error deleting passenger' });
      }
    }
  };
};