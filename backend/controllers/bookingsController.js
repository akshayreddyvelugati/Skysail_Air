const bookingsModel = require('../models/bookingsModel');

module.exports = (pool) => {
  return {
    createBooking: async (req, res) => {
      try {
        const newBooking = await bookingsModel(pool).createBooking(req.body);
        res.status(201).json(newBooking);
      } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Server error creating booking' });
      }
    },

    getBookingById: async (req, res) => {
      const { id } = req.params;
      try {
        const booking = await bookingsModel(pool).getBookingById(id);
        if (!booking) {
          return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(booking);
      } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ error: 'Server error fetching booking' });
      }
    },

    updateBooking: async (req, res) => {
      const { id } = req.params;
      try {
        const updatedBooking = await bookingsModel(pool).updateBooking(id, req.body);
        res.status(200).json(updatedBooking);
      } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Server error updating booking' });
      }
    },

    deleteBooking: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedBooking = await bookingsModel(pool).deleteBooking(id);
        res.status(200).json(deletedBooking);
      } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Server error deleting booking' });
      }
    }
  };
};