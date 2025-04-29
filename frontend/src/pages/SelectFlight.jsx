import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Plane, User, Calendar, Clock } from 'lucide-react';
import StepFlow from './StepFlow'; // Import the StepFlow component

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const FlightDetails = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: ${props => props.theme.shadows.md};
  padding: 2rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const FlightInfo = styled.div`
  display: grid;
  gap: 2rem;
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${props => props.theme.colors.gray[700]};
  font-size: 1.125rem;
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

const Button = styled.button`
  background: ${props => props.theme.gradients.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  width: 100%;
  margin-top: 2rem;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const Price = styled.div`
  text-align: right;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  margin-top: 1rem;
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

const DebugInfo = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  font-family: monospace;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.red || 'red'};
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const initialFlights = [
  { id: 'SK001', from: 'JFK', to: 'LAX', departureTime: '08:00', arrivalTime: '11:30', duration: '3h 30m', price: 299, airline: 'SkySail Airlines', date: '2024-03-25' },
  { id: 'AA101', from: 'JFK', to: 'LAX', departureTime: '09:00', arrivalTime: '12:45', duration: '3h 45m', price: 329, airline: 'American Airlines', date: '2024-03-25' },
  { id: 'UA201', from: 'JFK', to: 'LAX', departureTime: '13:00', arrivalTime: '16:30', duration: '3h 30m', price: 359, airline: 'United Airlines', date: '2024-03-25' },
];

const initialReturnFlights = [
  { id: 'SK004', from: 'LAX', to: 'JFK', departureTime: '14:00', arrivalTime: '21:00', duration: '4h 0m', price: 349, airline: 'SkySail Airlines', date: '2024-03-27' },
  { id: 'AA104', from: 'LAX', to: 'JFK', departureTime: '15:00', arrivalTime: '22:30', duration: '4h 30m', price: 379, airline: 'American Airlines', date: '2024-03-27' },
  { id: 'UA204', from: 'LAX', to: 'JFK', departureTime: '18:00', arrivalTime: '01:00', duration: '4h 0m', price: 399, airline: 'United Airlines', date: '2024-03-27' },
];

const flightsData = [...initialFlights, ...initialReturnFlights];

const SelectFlight = () => {
  const { flightId, departureId, returnId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const passengerCount = location.state?.passengers ? parseInt(location.state.passengers) : 2;
  const isRoundTrip = !!returnId; 

  console.log('SelectFlight params:', { flightId, departureId, returnId, passengerCount, isRoundTrip });

  const departureFlightId = departureId || flightId; 
  const departureFlight = flightsData.find(flight => flight.id === departureFlightId);
  const returnFlight = returnId ? flightsData.find(flight => flight.id === returnId) : null;

  console.log('Found flights:', { departureFlight, returnFlight });

  const [passengerData, setPassengerData] = useState(() => {
    return Array(passengerCount).fill().map(() => ({
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
    }));
  });

  useEffect(() => {
    const newCount = parseInt(passengerCount);
    if (passengerData.length !== newCount) {
      const newData = Array(newCount).fill().map((_, index) => {
        return index < passengerData.length 
          ? passengerData[index] 
          : {
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
            };
      });
      setPassengerData(newData);
    }
  }, [passengerCount, passengerData.length]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPassengerData = [...passengerData];
    updatedPassengerData[index] = {
      ...updatedPassengerData[index],
      [name]: value,
      [`${name}Error`]: '' 
    };
    if (name === 'dateOfBirth') {
      const dobRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      if (value && !dobRegex.test(value)) {
        updatedPassengerData[index] = {
          ...updatedPassengerData[index],
          dateOfBirthError: 'Please enter date in DD/MM/YYYY format.'
        };
      }
    }
    setPassengerData(updatedPassengerData);
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email) ? '' : 'Please enter a valid email address.';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone) ? '' : 'Please enter a valid phone number.';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const updatedPassengerDataWithErrors = passengerData.map((passenger) => {
      const emailError = passenger.email ? validateEmail(passenger.email) : '';
      const phoneError = passenger.phone ? validatePhone(passenger.phone) : '';
      const dobRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      let dateOfBirthError = '';
      if (passenger.dateOfBirth && !dobRegex.test(passenger.dateOfBirth)) {
        dateOfBirthError = 'Please enter date in dd/mm/yyyy format.';
        isValid = false;
      }
      if (emailError || phoneError || dateOfBirthError) {
        isValid = false;
      }
      return { ...passenger, emailError, phoneError, dateOfBirthError };
    });

    setPassengerData(updatedPassengerDataWithErrors);

    if (isValid) {
      const formattedPassengerData = passengerData.map(passenger => ({
        ...passenger,
        dateOfBirth: passenger.dateOfBirth || '',
      }));
      sessionStorage.setItem('passengerData', JSON.stringify(formattedPassengerData));
      const seatSelectionUrl = isRoundTrip 
        ? `/seat-selection/${departureFlightId}/${returnId}`
        : `/seat-selection/${departureFlightId}`;
      console.log('Navigating to seat selection:', seatSelectionUrl); 
      navigate(seatSelectionUrl, { state: { passengers: passengerCount, isRoundTrip } });
    }
  };

  if (!departureFlight) {
    return (
      <Container>
        <StepFlow currentStep={3} /> {/* Add StepFlow here */}
        <ErrorMessage>
          Departure flight not found for ID: {departureFlightId || 'none'}
        </ErrorMessage>
      </Container>
    );
  }

  if (isRoundTrip && !returnFlight) {
    return (
      <Container>
        <StepFlow currentStep={3} /> {/* Add StepFlow here */}
        <ErrorMessage>
          Return flight not found for ID: {returnId}
        </ErrorMessage>
      </Container>
    );
  }

  const totalPrice = (departureFlight.price + (returnFlight?.price || 0)) * passengerCount;

  return (
    <Container>
      <StepFlow currentStep={3} /> {/* Add StepFlow here */}
      <Title>Flight Details</Title>
      
      <DebugInfo>
        Passenger Count: {passengerCount}<br />
        Passengers in State: {passengerData.length}<br />
        Trip Type: {isRoundTrip ? 'Round-trip' : 'One-way'}<br />
        Flight IDs: {departureFlightId}{isRoundTrip ? `, ${returnId}` : ''}
      </DebugInfo>
      
      <FlightDetails>
        <h2>Departure Flight</h2>
        <FlightInfo>
          <InfoItem>
            <Plane size={20} />
            {departureFlight.from} → {departureFlight.to}
          </InfoItem>
          <InfoItem>
            <Calendar size={20} />
            {departureFlight.date}
          </InfoItem>
          <InfoItem>
            <Clock size={20} />
            {departureFlight.departureTime} - {departureFlight.arrivalTime} ({departureFlight.duration})
          </InfoItem>
          <InfoItem>
            <User size={20} />
            {departureFlight.airline}
          </InfoItem>
        </FlightInfo>
        <Price>${departureFlight.price}</Price>
      </FlightDetails>

      {isRoundTrip && returnFlight && (
        <FlightDetails>
          <h2>Return Flight</h2>
          <FlightInfo>
            <InfoItem>
              <Plane size={20} />
              {returnFlight.from} → {returnFlight.to}
            </InfoItem>
            <InfoItem>
              <Calendar size={20} />
              {returnFlight.date}
            </InfoItem>
            <InfoItem>
              <Clock size={20} />
              {returnFlight.departureTime} - {returnFlight.arrivalTime} ({returnFlight.duration})
            </InfoItem>
            <InfoItem>
              <User size={20} />
              {returnFlight.airline}
            </InfoItem>
          </FlightInfo>
          <Price>${returnFlight.price}</Price>
        </FlightDetails>
      )}
      
      <Price>Total: ${totalPrice} for {passengerCount} Passenger(s)</Price>

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
                  onChange={(event) => handleInputChange(index, event)}
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
                  onChange={(event) => handleInputChange(index, event)}
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
                  onChange={(event) => handleInputChange(index, event)}
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
                  onChange={(event) => handleInputChange(index, event)}
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
                  onChange={(event) => handleInputChange(index, event)}
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
                  onChange={(event) => handleInputChange(index, event)}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor={`nationality-${index}`}>Nationality</Label>
                <Input
                  type="text"
                  name="nationality"
                  id={`nationality-${index}`}
                  value={passenger.nationality}
                  onChange={(event) => handleInputChange(index, event)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor={`mealPreference-${index}`}>Meal Preference</Label>
                <Select
                  name="mealPreference"
                  id={`mealPreference-${index}`}
                  value={passenger.mealPreference}
                  onChange={(event) => handleInputChange(index, event)}
                  required
                >
                  <option value="">Select meal preference</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </Select>
              </FormGroup>
            </FormGrid>
          </PassengerSection>
        ))}
        
        <Button type="submit">Continue to Seat Selection</Button>
      </PassengerForm>
    </Container>
  );
};

export default SelectFlight;