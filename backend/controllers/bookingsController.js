const bookingsModel = require('../models/bookingsModel');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingsModel.getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Server error fetching bookings' });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingsModel.getBookingById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    res.status(500).json({ error: 'Server error fetching booking' });
  }
};

exports.addBooking = async (req, res) => {
  try {
    const newBooking = await bookingsModel.addBooking(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error adding booking:', error);
    res.status(500).json({ error: 'Server error adding booking' });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await bookingsModel.updateBooking(id, req.body);
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Server error updating booking' });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await bookingsModel.deleteBooking(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(deletedBooking);
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Server error deleting booking' });
  }
};

module.exports = {
  getAllBookings: exports.getAllBookings,
  getBookingById: exports.getBookingById,
  addBooking: exports.addBooking,
  updateBooking: exports.updateBooking,
  deleteBooking: exports.deleteBooking,
};