const bookingsModel = require('../models/bookingsModel');

module.exports = (pool) => {
  return {
    getAllBookings: async (req, res) => {
      try {
        const bookings = await bookingsModel(pool).getAllBookings();
        res.json(bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Server error fetching bookings' });
      }
    },

    getBookingById: async (req, res) => {
      try {
        const { id } = req.params;
        const booking = await bookingsModel(pool).getBookingById(id);
        if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
      } catch (error) {
        console.error('Error fetching booking by ID:', error);
        res.status(500).json({ error: 'Server error fetching booking' });
      }
    },

    addBooking: async (req, res) => {
      try {
        const newBooking = await bookingsModel(pool).addBooking(req.body);
        res.status(201).json(newBooking);
      } catch (error) {
        console.error('Error adding booking:', error);
        res.status(500).json({ error: 'Server error adding booking' });
      }
    },

    updateBooking: async (req, res) => {
      try {
        const { id } = req.params;
        const updatedBooking = await bookingsModel(pool).updateBooking(id, req.body);
        if (!updatedBooking) {
          return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(updatedBooking);
      } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Server error updating booking' });
      }
    },

    deleteBooking: async (req, res) => {
      try {
        const { id } = req.params;
        const deletedBooking = await bookingsModel(pool).deleteBooking(id);
        if (!deletedBooking) {
          return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(deletedBooking);
      } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Server error deleting booking' });
      }
    }
  };
};