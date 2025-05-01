// flightsController.js
const flightModel = require('../models/flightsModel');

// Input validation
const validateFlightData = (data) => {
  const requiredFields = [
    'flight_number',
    'origin_airport_id',
    'destination_airport_id',
    'aircraft_id',
    'departure_date',
    'departure_time',
    'arrival_time',
    'status',
    'price',
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (data.price < 0) {
    throw new Error('Price must be a positive number');
  }

  const validStatuses = ['Scheduled', 'Boarding', 'Departed', 'Arrived', 'Cancelled'];
  if (!validStatuses.includes(data.status)) {
    throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }

  if (data.origin_airport_id === data.destination_airport_id) {
    throw new Error('Origin and destination airports cannot be the same');
  }
};

const flightsController = (pool) => {
  return {
    createFlight: async (req, res) => {
      try {
        const flightData = req.body;
        validateFlightData(flightData);
        const newFlight = await flightModel.createFlight(pool, flightData);
        res.status(201).json(newFlight);
      } catch (error) {
        if (error.message.includes('duplicate key value violates unique constraint')) {
          res.status(400).json({ error: 'Flight number already exists' });
        } else if (error.message.includes('foreign key constraint')) {
          res.status(400).json({ error: 'Invalid airport or aircraft ID' });
        } else {
          res.status(500).json({ error: error.message });
        }
      }
    },

    getAllFlights: async (req, res) => {
      try {
        const filters = {
          origin_airport_id: req.query.origin_airport_id,
          destination_airport_id: req.query.destination_airport_id,
          departure_date: req.query.departure_date,
        };
        const flights = await flightModel.getAllFlights(pool, filters);
        res.status(200).json(flights);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    updateFlight: async (req, res) => {
      try {
        const { id } = req.params;
        const flightData = req.body;
        validateFlightData(flightData);
        const updatedFlight = await flightModel.updateFlight(pool, id, flightData);
        res.status(200).json(updatedFlight);
      } catch (error) {
        if (error.message === 'Flight not found') {
          res.status(404).json({ error: error.message });
        } else if (error.message.includes('duplicate key value violates unique constraint')) {
          res.status(400).json({ error: 'Flight number already exists' });
        } else if (error.message.includes('foreign key constraint')) {
          res.status(400).json({ error: 'Invalid airport or aircraft ID' });
        } else {
          res.status(500).json({ error: error.message });
        }
      }
    },

    deleteFlight: async (req, res) => {
      try {
        const { id } = req.params;
        const deletedFlight = await flightModel.deleteFlight(pool, id);
        res.status(200).json(deletedFlight);
      } catch (error) {
        if (error.message === 'Flight not found') {
          res.status(404).json({ error: error.message });
        } else {
          res.status(500).json({ error: error.message });
        }
      }
    },
  };
};

module.exports = flightsController;