const flightsModel = require('../models/flightsModel');

module.exports = (pool) => {
  return {
    getAllFlights: async (req, res) => {
      try {
        const flights = await flightsModel(pool).getAllFlights();
        res.json(flights);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching flights' });
      }
    },

    getFlightById: async (req, res) => {
      const { id } = req.params;
      try {
        const flight = await flightsModel(pool).getFlightById(id);
        if (!flight) {
          return res.status(404).json({ error: 'Flight not found' });
        }
        res.json(flight);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching flight' });
      }
    },

    addFlight: async (req, res) => {
      try {
        const newFlight = await flightsModel(pool).addFlight(req.body);
        res.status(201).json(newFlight);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error adding flight' });
      }
    },

    updateFlight: async (req, res) => {
      const { id } = req.params;
      try {
        const updatedFlight = await flightsModel(pool).updateFlight(id, req.body);
        if (!updatedFlight) {
          return res.status(404).json({ error: 'Flight not found' });
        }
        res.json(updatedFlight);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error updating flight' });
      }
    },

    deleteFlight: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedFlight = await flightsModel(pool).deleteFlight(id);
        if (!deletedFlight) {
          return res.status(404).json({ error: 'Flight not found' });
        }
        res.json(deletedFlight);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error deleting flight' });
      }
    }
  };
};