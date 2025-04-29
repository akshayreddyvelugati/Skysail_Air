const airplanesModel = require('../models/airplanesModel');

module.exports = (pool) => {
  return {
    getAllAirplanes: async (req, res) => {
      try {
        const airplanes = await airplanesModel(pool).getAllAirplanes();
        res.json(airplanes);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching airplanes' });
      }
    },

    addAirplane: async (req, res) => {
      try {
        const newAirplane = await airplanesModel(pool).addAirplane(req.body);
        res.status(201).json(newAirplane);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error adding airplane' });
      }
    },

    updateAirplane: async (req, res) => {
      const { id } = req.params;
      try {
        const updatedAirplane = await airplanesModel(pool).updateAirplane(id, req.body);
        res.json(updatedAirplane);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error updating airplane' });
      }
    },

    deleteAirplane: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedAirplane = await airplanesModel(pool).deleteAirplane(id);
        res.json(deletedAirplane);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error deleting airplane' });
      }
    }
  };
};