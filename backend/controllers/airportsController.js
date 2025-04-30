const airportsModel = require('../models/airportsModel');

module.exports = (pool) => {
  return {
    getAllAirports: async (req, res) => {
      try {
        const airports = await airportsModel(pool).getAllAirports();
        res.json(airports);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching airports' });
      }
    },

    addAirport: async (req, res) => {
      try {
        const newAirport = await airportsModel(pool).addAirport(req.body);
        res.status(201).json(newAirport);
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message || 'Server error adding airport' });
      }
    },

    updateAirport: async (req, res) => {
      const { id } = req.params;
      try {
        const updatedAirport = await airportsModel(pool).updateAirport(id, req.body);
        res.json(updatedAirport);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error updating airport' });
      }
    },

    deleteAirport: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedAirport = await airportsModel(pool).deleteAirport(id);
        res.json(deletedAirport);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error deleting airport' });
      }
    }
  };
};