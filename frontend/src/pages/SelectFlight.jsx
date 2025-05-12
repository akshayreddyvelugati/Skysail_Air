import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import StepFlow from './StepFlow';
import { Calendar, Clock, Plane } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-bottom: 100px; /* Ensure space for footer */
`;

const FlightSummary = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const FlightInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Route = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.25rem;
  color: #1f2937;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #3b82f6;
`;

const FlightDetails = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #6b7280;
`;

const DetailItem = styled.div`
  font-size: 1rem;
  color: #374151;
`;

const TotalPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-top: 1rem;
`;

const PassengerForm = styled.form`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PassengerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PassengerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PassengerTitle = styled.h3`
  color: #3b82f6;
  font-size: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #4b5563;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
`;

const ContinueButton = styled.button`
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  margin-top: 2rem;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 1rem;
  color: #ef4444;
`;

const SelectFlight = () => {
  const { id, returnId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { passengers: passengerCount = 1, tripType = 'one-way' } = location.state || {};
  const [departureFlight, setDepartureFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passengerData, setPassengerData] = useState(
    Array.from({ length: passengerCount }, () => ({
      firstName: '',
      lastName: '',
      email: '',
      emailError: '',
      phone: '',
      phoneError: '',
      dateOfBirth: '',
      dateOfBirthError: '',
      gender: '',
      nationality: '',
      mealPreference: '',
    }))
  );

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        // Fetch departure flight
        const departureResponse = await axios.get(`http://localhost:5000/api/flights/${id}`);
        const flight = departureResponse.data;
        const airportsResponse = await axios.get('http://localhost:5000/api/airports');
        const airports = airportsResponse.data;
        setDepartureFlight({
          id: flight.id.toString(),
          from: airports.find(a => a.id === flight.origin_airport_id)?.code || 'Unknown',
          to: airports.find(a => a.id === flight.destination_airport_id)?.code || 'Unknown',
          departureTime: flight.departure_time,
          arrivalTime: flight.arrival_time,
          duration: calculateDuration(flight.departure_time, flight.arrival_time),
          price: parseFloat(flight.price),
          airline: 'SkySail Airlines',
          departureDate: flight.departure_date,
          flightNumber: flight.flight_number,
        });

        // Fetch return flight if round-trip
        if (tripType === 'round-trip' && returnId) {
          const returnResponse = await axios.get(`http://localhost:5000/api/flights/${returnId}`);
          const returnFlightData = returnResponse.data;
          setReturnFlight({
            id: returnFlightData.id.toString(),
            from: airports.find(a => a.id === returnFlightData.origin_airport_id)?.code || 'Unknown',
            to: airports.find(a => a.id === returnFlightData.destination_airport_id)?.code || 'Unknown',
            departureTime: returnFlightData.departure_time,
            arrivalTime: returnFlightData.arrival_time,
            duration: calculateDuration(returnFlightData.departure_time, returnFlightData.arrival_time),
            price: parseFloat(returnFlightData.price),
            airline: 'SkySail Airlines',
            departureDate: returnFlightData.departure_date,
            flightNumber: returnFlightData.flight_number,
          });
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load flight details');
        setLoading(false);
      }
    };
    fetchFlights();
  }, [id, returnId, tripType]);

  const calculateDuration = (departure, arrival) => {
    const [depHours, depMinutes] = departure.split(':').map(Number);
    const [arrHours, arrMinutes] = arrival.split(':').map(Number);
    const dep = new Date(0, 0, 0, depHours, depMinutes);
    const arr = new Date(0, 0, 0, arrHours, arrMinutes);
    if (arr < dep) arr.setDate(arr.getDate() + 1);
    const diff = (arr - dep) / 1000 / 60;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}h ${minutes}m`;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Invalid email address';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone) ? '' : 'Invalid phone number';
  };

  const validateDateOfBirth = (dob) => {
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (!dobRegex.test(dob)) return 'Invalid date format (DD/MM/YYYY)';
    const [day, month, year] = dob.split('/').map(Number);
    const dobDate = new Date(year, month - 1, day);
    const today = new Date();
    if (isNaN(dobDate.getTime())) return 'Invalid date';
    return dobDate <= today ? '' : 'Date of birth cannot be in the future';
  };

  const handleInputChange = (index, field, value) => {
    const newPassengerData = [...passengerData];
    newPassengerData[index][field] = value;

    if (field === 'email') {
      newPassengerData[index].emailError = validateEmail(value);
    }
    if (field === 'phone') {
      newPassengerData[index].phoneError = validatePhone(value);
    }
    if (field === 'dateOfBirth') {
      newPassengerData[index].dateOfBirthError = validateDateOfBirth(value);
    }

    setPassengerData(newPassengerData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = passengerData.some(p => 
      p.emailError || 
      p.phoneError || 
      p.dateOfBirthError || 
      !p.firstName || 
      !p.lastName || 
      !p.email || 
      !p.phone || 
      !p.dateOfBirth || 
      !p.gender || 
      !p.nationality
    );
    if (hasErrors) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    try {
      // Save passengers
      const passengerPromises = passengerData.map(async (passenger) => {
        const response = await axios.post('http://localhost:5000/api/passengers', {
          first_name: passenger.firstName,
          last_name: passenger.lastName,
          email: passenger.email,
          phone: passenger.phone,
          date_of_birth: passenger.dateOfBirth.split('/').reverse().join('-'),
          gender: passenger.gender,
          nationality: passenger.nationality,
          meal_preference: passenger.mealPreference || null,
          passport_number: null,
        });
        return response.data;
      });

      const savedPassengers = await Promise.all(passengerPromises);

      // Create booking
      const bookingId = `SKS-${Date.now()}-${Math.floor(Math.random() * 1000)}`.slice(0, 30);
      const totalPrice = departureFlight.price * passengerCount + (returnFlight ? returnFlight.price * passengerCount : 0);
      const bookingResponse = await axios.post('http://localhost:5000/api/bookings', {
        booking_id: bookingId,
        flight_id: parseInt(departureFlight.id),
        return_flight_id: returnFlight ? parseInt(returnFlight.id) : null,
        total_price: totalPrice,
        status: 'Confirmed',
      });

      const booking = bookingResponse.data;

      // Link passengers to booking
      const passengerBookingPromises = savedPassengers.map(async (passenger) => {
        await axios.post('http://localhost:5000/api/passenger-bookings', {
          passenger_id: passenger.id,
          booking_id: booking.id,
        });
      });

      await Promise.all(passengerBookingPromises);

      // Prepare data for seat selection
      const bookingData = {
        departureFlight,
        returnFlight,
        passengers: savedPassengers,
        bookingId: booking.id,
        totalPrice,
        passengerCount,
        tripType
      };
      sessionStorage.setItem('passengerData', JSON.stringify(savedPassengers));
      navigate('/seat-selection', { state: bookingData });
    } catch (err) {
      setError('Failed to save passenger details and create booking');
    }
  };

  if (loading) {
    return (
      <Container>
        <StepFlow currentStep={3} />
        <LoadingMessage>Loading flight details...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <StepFlow currentStep={3} />
        <ErrorContainer>{error}</ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <StepFlow currentStep={3} />
      <FlightSummary>
        <FlightDetails>
          <DetailItem><strong>Passenger Count:</strong> {passengerCount}</DetailItem>
          <DetailItem><strong>Trip Type:</strong> {tripType === 'round-trip' ? 'Round-trip' : 'One-way'}</DetailItem>
          <DetailItem><strong>Flight ID:</strong> {departureFlight.flightNumber}</DetailItem>
        </FlightDetails>
        <FlightInfo>
          <Route>
            <Plane size={20} />
            {departureFlight.from} → {departureFlight.to}
          </Route>
          <Time>
            <Clock size={18} />
            {departureFlight.departureTime} - {departureFlight.arrivalTime} ({departureFlight.duration})
          </Time>
          <div>{departureFlight.airline}</div>
        </FlightInfo>
        <FlightDetails>
          <Time>
            <Calendar size={18} />
            {departureFlight.departureDate}
          </Time>
          <Price>
            <span>₹{departureFlight.price}</span>
          </Price>
        </FlightDetails>
        {returnFlight && (
          <>
            <FlightInfo>
              <Route>
                <Plane size={20} />
                {returnFlight.from} → {returnFlight.to}
              </Route>
              <Time>
                <Clock size={18} />
                {returnFlight.departureTime} - {returnFlight.arrivalTime} ({returnFlight.duration})
              </Time>
              <div>{returnFlight.airline}</div>
            </FlightInfo>
            <FlightDetails>
              <Time>
                <Calendar size={18} />
                {returnFlight.departureDate}
              </Time>
              <Price>
                <span>₹{returnFlight.price}</span>
              </Price>
            </FlightDetails>
          </>
        )}
        <TotalPrice>
          <strong>TOTAL:</strong> ₹{(departureFlight.price * passengerCount + (returnFlight ? returnFlight.price * passengerCount : 0))} for {passengerCount} Passenger(s)
        </TotalPrice>
      </FlightSummary>

      <PassengerForm onSubmit={handleSubmit}>
        <PassengerSection>
          {passengerData.map((passenger, index) => (
            <div key={index}>
              <PassengerHeader>
                <PassengerTitle>Passenger {index + 1}</PassengerTitle>
              </PassengerHeader>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  type="text"
                  value={passenger.firstName}
                  onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                  placeholder="First Name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  value={passenger.lastName}
                  onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={passenger.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
                {passenger.emailError && <ErrorMessage>{passenger.emailError}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="text"
                  value={passenger.phone}
                  onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
                {passenger.phoneError && <ErrorMessage>{passenger.phoneError}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>Date of Birth</Label>
                <Input
                  type="text"
                  value={passenger.dateOfBirth}
                  onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
                  placeholder="DD/MM/YYYY"
                  required
                />
                {passenger.dateOfBirthError && <ErrorMessage>{passenger.dateOfBirthError}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>Gender</Label>
                <Select
                  value={passenger.gender}
                  onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Nationality</Label>
                <Input
                  type="text"
                  value={passenger.nationality}
                  onChange={(e) => handleInputChange(index, 'nationality', e.target.value)}
                  placeholder="Nationality"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Meal Preference</Label>
                <Select
                  value={passenger.mealPreference}
                  onChange={(e) => handleInputChange(index, 'mealPreference', e.target.value)}
                >
                  <option value="">Select meal preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </Select>
              </FormGroup>
            </div>
          ))}
        </PassengerSection>
        <ContinueButton type="submit">Continue to Seat Selection</ContinueButton>
      </PassengerForm>
    </Container>
  );
};

export default SelectFlight;