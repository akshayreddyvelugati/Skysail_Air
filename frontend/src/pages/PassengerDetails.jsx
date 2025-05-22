import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import StepFlow from './StepFlow';
import { Calendar, Clock, Plane } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 6rem; /* Adjust for fixed Navbar height */
  padding-bottom: 100px;
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
  box-shadow: ${props => props.theme.shadows.md};
  padding: 2rem;
`;

const FormTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const PassengerSection = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray[300]};
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.gray[700]};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: 0.5rem;
  font-size: 1rem;
  height: 2.5rem;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary}20;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: white;
  height: 2.5rem;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary}20;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
`;

const BackButton = styled.button`
  background: #d1d5db;
  color: #1f2937;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const ContinueButton = styled.button`
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 1rem;
  color: #ef4444;
`;

const PassengerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { departureFlight, returnFlight, passengers: preFilledPassengers, passengerCount = 1, tripType = 'one-way' } = location.state || {};

  const [passengerData, setPassengerData] = useState(
    preFilledPassengers || Array.from({ length: parseInt(passengerCount) }, () => ({
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
  const [error, setError] = useState(null);

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
          date_of_birth: passenger.dateOfBirth.split('/').reverse().join('-'), // Convert DD/MM/YYYY to YYYY-MM-DD
          gender: passenger.gender,
          nationality: passenger.nationality,
          meal_preference: passenger.mealPreference || 'Vegetarian', // Default to Vegetarian if not provided
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
        tripType,
      };
      sessionStorage.setItem('passengerData', JSON.stringify(savedPassengers));
      navigate(`/seat-selection/${departureFlight.id}${returnFlight ? `/${returnFlight.id}` : ''}`, { state: bookingData });
    } catch (err) {
      console.error('Error saving passenger details:', err);
      setError('Failed to save passenger details and create booking: ' + err.message);
    }
  };

  const handleBack = () => {
    navigate('/search-results', { state: location.state });
  };

  if (!departureFlight) {
    return (
      <Container>
        <StepFlow currentStep={3} />
        <ErrorContainer>Missing flight data. Please go back and select a flight.</ErrorContainer>
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
        <FormTitle>Passenger Information</FormTitle>
        {passengerData.map((passenger, index) => (
          <PassengerSection key={index}>
            <FormTitle>Passenger {index + 1}</FormTitle>
            <FormGrid>
              <FormGroup>
                <Label htmlFor={`firstName-${index}`}>First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id={`firstName-${index}`}
                  value={passenger.firstName}
                  onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                  placeholder="First Name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor={`lastName-${index}`}>Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  id={`lastName-${index}`}
                  value={passenger.lastName}
                  onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor={`email-${index}`}>Email</Label>
                <Input
                  type="email"
                  name="email"
                  id={`email-${index}`}
                  value={passenger.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
                {passenger.emailError && <ErrorText>{passenger.emailError}</ErrorText>}
              </FormGroup>
              <FormGroup>
                <Label htmlFor={`phone-${index}`}>Phone</Label>
                <Input
                  type="tel"
                  name="phone"
                  id={`phone-${index}`}
                  value={passenger.phone}
                  onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
                {passenger.phoneError && <ErrorText>{passenger.phoneError}</ErrorText>}
              </FormGroup>
              <FormGroup>
                <Label htmlFor={`dateOfBirth-${index}`}>Date of Birth</Label>
                <Input
                  type="text"
                  name="dateOfBirth"
                  id={`dateOfBirth-${index}`}
                  value={passenger.dateOfBirth}
                  onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
                  placeholder="DD/MM/YYYY"
                  required
                />
                {passenger.dateOfBirthError && <ErrorText>{passenger.dateOfBirthError}</ErrorText>}
              </FormGroup>
              <FormGroup>
                <Label htmlFor={`gender-${index}`}>Gender</Label>
                <Select
                  name="gender"
                  id={`gender-${index}`}
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
                <Label htmlFor={`nationality-${index}`}>Nationality</Label>
                <Input
                  type="text"
                  name="nationality"
                  id={`nationality-${index}`}
                  value={passenger.nationality}
                  onChange={(e) => handleInputChange(index, 'nationality', e.target.value)}
                  placeholder="Nationality"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor={`mealPreference-${index}`}>Meal Preference</Label>
                <Select
                  name="mealPreference"
                  id={`mealPreference-${index}`}
                  value={passenger.mealPreference}
                  onChange={(e) => handleInputChange(index, 'mealPreference', e.target.value)}
                >
                  <option value="">Select meal preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </Select>
              </FormGroup>
            </FormGrid>
          </PassengerSection>
        ))}
        <ButtonContainer>
          <BackButton onClick={handleBack}>Back to Search Results</BackButton>
          <ContinueButton type="submit">Continue to Seat Selection</ContinueButton>
        </ButtonContainer>
      </PassengerForm>
    </Container>
  );
};

export default PassengerDetails;