// passengerBookingsController.js
const passengerBookingsModel = require('../models/passengerBookingsModel');

module.exports = (pool) => {
  return {
    createPassengerBooking: async (req, res) => {
      try {
        const newPassengerBooking = await passengerBookingsModel(pool).createPassengerBooking(req.body);
        res.status(201).json(newPassengerBooking);
      } catch (error) {
        console.error('Error linking passenger to booking:', error);
        res.status(500).json({ error: 'Server error linking passenger to booking' });
      }
    },

    getBookingsByPassengerId: async (req, res) => {
      const { passengerId } = req.params;
      try {
        const bookings = await passengerBookingsModel(pool).getBookingsByPassengerId(passengerId);
        res.status(200).json(bookings);
      } catch (error) {
        console.error('Error fetching bookings for passenger:', error);
        res.status(500).json({ error: 'Server error fetching bookings for passenger' });
      }
    },

    deletePassengerBooking: async (req, res) => {
      const { passengerId, bookingId } = req.params;
      try {
        const deletedPassengerBooking = await passengerBookingsModel(pool).deletePassengerBooking(passengerId, bookingId);
        if (!deletedPassengerBooking) {
          return res.status(404).json({ message: 'Passenger-Booking link not found' });
        }
        res.json(deletedPassengerBooking);
      } catch (error) {
        console.error('Error deleting passenger-booking link:', error);
        res.status(500).json({ error: 'Server error deleting passenger-booking link' });
      }
    }
  };
};