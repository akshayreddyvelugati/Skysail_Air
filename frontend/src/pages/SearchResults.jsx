import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Clock, Plane } from 'lucide-react';
import StepFlow from './StepFlow'; // Import the StepFlow component

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const SearchSummary = styled.div`
  color: ${props => props.theme.colors.gray[600]};
  font-size: 1.125rem;
`;

const FilterSort = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterLabel = styled.label`
  color: ${props => props.theme.colors.gray[700]};
  font-weight: 500;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: 0.25rem;
`;

const FlightListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

const FlightListSection = styled.div`
  flex: 1;
`;

const FlightListTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const FlightList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlightCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: ${props => props.theme.shadows.md};
  padding: 1.5rem;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 3fr 1fr;
`;

const FlightInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Route = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.25rem;
  color: ${props => props.theme.colors.gray[800]};
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const Amount = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const SelectButton = styled.button`
  background: ${props => props.theme.gradients.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const BookNowButton = styled.button`
  background: ${props => props.theme.gradients.secondary || props.theme.gradients.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  margin-top: 2rem;
  width: 100%;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

// Dummy flight data
const initialFlights = [
  { id: 'SK001', from: 'JFK', to: 'LAX', departureTime: '08:00', arrivalTime: '11:30', duration: '3h 30m', price: 299, airline: 'SkySail Airlines' },
  { id: 'AA101', from: 'JFK', to: 'LAX', departureTime: '09:00', arrivalTime: '12:45', duration: '3h 45m', price: 329, airline: 'American Airlines' },
  { id: 'UA201', from: 'JFK', to: 'LAX', departureTime: '13:00', arrivalTime: '16:30', duration: '3h 30m', price: 359, airline: 'United Airlines' },
];

const initialReturnFlights = [
  { id: 'SK004', from: 'LAX', to: 'JFK', departureTime: '14:00', arrivalTime: '21:00', duration: '4h 0m', price: 349, airline: 'SkySail Airlines' },
  { id: 'AA104', from: 'LAX', to: 'JFK', departureTime: '15:00', arrivalTime: '22:30', duration: '4h 30m', price: 379, airline: 'American Airlines' },
  { id: 'UA204', from: 'LAX', to: 'JFK', departureTime: '18:00', arrivalTime: '01:00', duration: '4h 0m', price: 399, airline: 'United Airlines' },
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state || {};
  const isRoundTrip = searchParams.tripType === 'round-trip';
  const passengerCount = searchParams.passengers || 1;

  const [flights, setFlights] = useState(initialFlights);
  const [returnFlights, setReturnFlights] = useState(initialReturnFlights);
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [filterAirline, setFilterAirline] = useState('all');
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    let filteredDeparture = [...initialFlights];
    let filteredReturn = [...initialReturnFlights];

    if (filterAirline !== 'all') {
      filteredDeparture = filteredDeparture.filter(flight => flight.airline === filterAirline);
      filteredReturn = filteredReturn.filter(flight => flight.airline === filterAirline);
    }

    if (sortBy === 'price') {
      filteredDeparture.sort((a, b) => a.price - b.price);
      filteredReturn.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'departure') {
      filteredDeparture.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
      filteredReturn.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }

    setFlights(filteredDeparture);
    setReturnFlights(filteredReturn);
  }, [filterAirline, sortBy]);

  const handleSelectDepartureFlight = (flight) => {
    setSelectedDepartureFlight(flight.id);
    
    // For one-way trips, navigate immediately
    if (!isRoundTrip) {
      navigate(`/select-flight/${flight.id}`, { 
        state: { passengers: passengerCount } 
      });
    }
  };

  const handleSelectReturnFlight = (flight) => {
    setSelectedReturnFlight(flight.id);
  };

  const handleContinue = () => {
    if (isRoundTrip && selectedDepartureFlight && selectedReturnFlight) {
      // Both flights are selected for round trip
      navigate(`/select-flight/${selectedDepartureFlight}/${selectedReturnFlight}`, { 
        state: { passengers: passengerCount } 
      });
    } else if (!isRoundTrip && selectedDepartureFlight) {
      // One way trip with departure flight selected
      navigate(`/select-flight/${selectedDepartureFlight}`, { 
        state: { passengers: passengerCount } 
      });
    }
  };

  const airlines = ['all', ...Array.from(new Set([...initialFlights.map(f => f.airline), ...initialReturnFlights.map(f => f.airline)]))];
  const sortOptions = [
    { value: 'price', label: 'Price' },
    { value: 'departure', label: 'Departure Time' },
  ];

  const canContinue = !isRoundTrip ? selectedDepartureFlight : 
                     (selectedDepartureFlight && selectedReturnFlight);

  return (
    <Container>
      <StepFlow currentStep={2} /> {/* Add StepFlow here */}
      <Header>
        <div>
          <Title>Available Flights</Title>
          <SearchSummary>
            <Plane size={20} />
            {searchParams.from} → {searchParams.to}
            <span>•</span>
            {searchParams.departureDate}
            {isRoundTrip && (
              <>
                <span>•</span>
                {searchParams.returnDate}
              </>
            )}
            <span>•</span>
            {passengerCount} Passenger(s)
            <span>•</span>
            {searchParams.class}
          </SearchSummary>
        </div>
        <FilterSort>
          <FilterLabel htmlFor="sort">Sort by:</FilterLabel>
          <FilterSelect id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </FilterSelect>
        </FilterSort>
      </Header>

      <FlightListsContainer>
        <FlightListSection>
          <FlightListTitle>{isRoundTrip ? 'Departure Flights' : 'Select Your Flight'}</FlightListTitle>
          <FlightList>
            {flights.map(flight => (
              <FlightCard key={flight.id}>
                <FlightInfo>
                  <Route>
                    <span>{flight.from}</span>
                    <Plane size={20} />
                    <span>{flight.to}</span>
                  </Route>
                  <Time>
                    <Clock size={18} />
                    {flight.departureTime} - {flight.arrivalTime} ({flight.duration})
                  </Time>
                  <div>{flight.airline}</div>
                </FlightInfo>
                <Price>
                  <Amount>${flight.price}</Amount>
                  <SelectButton
                    onClick={() => handleSelectDepartureFlight(flight)}
                  >
                    {selectedDepartureFlight === flight.id ? 'Selected' : 'Select'}
                  </SelectButton>
                </Price>
              </FlightCard>
            ))}
          </FlightList>
        </FlightListSection>

        {isRoundTrip && (
          <FlightListSection>
            <FlightListTitle>Return Flights</FlightListTitle>
            <FlightList>
              {returnFlights.map(flight => (
                <FlightCard key={flight.id}>
                  <FlightInfo>
                    <Route>
                      <span>{flight.from}</span>
                      <Plane size={20} />
                      <span>{flight.to}</span>
                    </Route>
                    <Time>
                      <Clock size={18} />
                      {flight.departureTime} - {flight.arrivalTime} ({flight.duration})
                    </Time>
                    <div>{flight.airline}</div>
                  </FlightInfo>
                  <Price>
                    <Amount>${flight.price}</Amount>
                    <SelectButton
                      onClick={() => handleSelectReturnFlight(flight)}
                    >
                      {selectedReturnFlight === flight.id ? 'Selected' : 'Select'}
                    </SelectButton>
                  </Price>
                </FlightCard>
              ))}
            </FlightList>
          </FlightListSection>
        )}
      </FlightListsContainer>

      {isRoundTrip && (
        <BookNowButton 
          onClick={handleContinue}
          disabled={!canContinue}
        >
          {canContinue ? 'Continue to Booking' : 'Select Both Flights to Continue'}
        </BookNowButton>
      )}
    </Container>
  );
};

export default SearchResults;