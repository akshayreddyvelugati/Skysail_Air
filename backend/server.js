const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to SkySail Airlines API!');
});

const airportsRoutes = require('./routes/airportsRoutes');
const airplanesRoutes = require('./routes/airplanesRoutes'); 
const flightsRoutes = require('./routes/flightsRoutes');
const crewMembersRoutes = require('./routes/crewMembersRoutes');
const seatsRoutes = require('./routes/seatsRoutes');
const passengersRoutes = require('./routes/passengersRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

app.use('/api/airports', airportsRoutes);
app.use('/api/airplanes', airplanesRoutes); 
app.use('/api/flights', flightsRoutes);
app.use('/api/crew-members', crewMembersRoutes);
app.use('/api/seats', seatsRoutes);
app.use('/api/passengers', passengersRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/messages', messagesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});
