import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Clock, Plane } from 'lucide-react';
import StepFlow from './StepFlow';
import axios from 'axios';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-bottom: 100px; /* Ensure space for footer */
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

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error || 'red'};
  text-align: center;
  padding: 1rem;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const BackButton = styled.button`
  background: #1A365D;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  margin-top: 1rem;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: ${props => props.theme.colors.gray[500]};
`;

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [passengerCount, setPassengerCount] = useState(1);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [showReturnFlights, setShowReturnFlights] = useState(false);
  const [loadingAirports, setLoadingAirports] = useState(false);
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('price');

  const searchParams = location.state || {
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    class: 'economy',
    passengers: '1',
    tripType: 'one-way'
  };

  useEffect(() => {
    setIsRoundTrip(searchParams.tripType === 'round-trip');
    setPassengerCount(parseInt(searchParams.passengers) || 1);
  }, [searchParams]);

  useEffect(() => {
    setLoadingAirports(true);
    axios
      .get('http://localhost:5000/api/airports')
      .then(response => {
        setAirports(response.data);
        setLoadingAirports(false);
      })
      .catch(err => {
        setError('Failed to load airports');
        setLoadingAirports(false);
      });
  }, []);

  useEffect(() => {
    if (loadingAirports) return;

    if (!searchParams.from || !searchParams.to || !searchParams.departureDate) {
      setError('Missing search parameters');
      return;
    }

    const originAirport = airports.find(a => a.code === searchParams.from);
    const destAirport = airports.find(a => a.code === searchParams.to);

    if (!originAirport || !destAirport) {
      setError('Invalid airport codes');
      return;
    }

    setLoadingFlights(true);
    setError(null);

    // Fetch departure flights
    axios
      .get('http://localhost:5000/api/flights', {
        params: {
          origin_airport_id: originAirport.id,
          destination_airport_id: destAirport.id,
          departure_date: searchParams.departureDate,
        },
      })
      .then(response => {
        const fetchedFlights = response.data.map(flight => ({
          id: flight.id.toString(),
          from: originAirport.code,
          to: destAirport.code,
          departureTime: flight.departure_time,
          arrivalTime: flight.arrival_time,
          duration: calculateDuration(flight.departure_time, flight.arrival_time),
          price: parseFloat(flight.price),
          airline: 'SkySail Airlines',
          flightNumber: flight.flight_number,
        }));
        setFlights(fetchedFlights);
        if (fetchedFlights.length === 0) {
          setError('No flights found for the selected route and date');
        }
        setLoadingFlights(false);
      })
      .catch(err => {
        setError('Failed to fetch departure flights');
        setLoadingFlights(false);
      });

    // Fetch return flights if round-trip
    if (isRoundTrip && searchParams.returnDate) {
      axios
        .get('http://localhost:5000/api/flights', {
          params: {
            origin_airport_id: destAirport.id,
            destination_airport_id: originAirport.id,
            departure_date: searchParams.returnDate,
          },
        })
        .then(response => {
          const fetchedReturnFlights = response.data.map(flight => ({
            id: flight.id.toString(),
            from: destAirport.code,
            to: originAirport.code,
            departureTime: flight.departure_time,
            arrivalTime: flight.arrival_time,
            duration: calculateDuration(flight.departure_time, flight.arrival_time),
            price: parseFloat(flight.price),
            airline: 'SkySail Airlines',
            flightNumber: flight.flight_number,
          }));
          setReturnFlights(fetchedReturnFlights);
          if (fetchedReturnFlights.length === 0 && !error) {
            setError('No return flights found for the selected route and date');
          }
        })
        .catch(err => {
          setError('Failed to fetch return flights');
        });
    }
  }, [searchParams.from, searchParams.to, searchParams.departureDate, searchParams.returnDate, isRoundTrip, loadingAirports, airports]);

  useEffect(() => {
    let sortedDeparture = [...flights];
    let sortedReturn = [...returnFlights];

    if (sortBy === 'price') {
      sortedDeparture.sort((a, b) => a.price - b.price);
      sortedReturn.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'departure') {
      sortedDeparture.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
      sortedReturn.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }

    setFlights(sortedDeparture);
    setReturnFlights(sortedReturn);
  }, [sortBy]);

  const calculateDuration = (departureTime, arrivalTime) => {
    const [depHours, depMinutes] = departureTime.split(':').map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);
    const dep = new Date();
    const arr = new Date();
    dep.setHours(depHours, depMinutes);
    arr.setHours(arrHours, arrMinutes);
    if (arr < dep) arr.setDate(arr.getDate() + 1);
    const diffMs = arr - dep;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleSelectDepartureFlight = (flight) => {
    setSelectedDepartureFlight(flight.id);
    if (isRoundTrip) {
      setShowReturnFlights(true);
    } else {
      navigate(`/select-flight/${flight.id}`, { 
        state: { passengers: passengerCount, flight, tripType: searchParams.tripType }
      });
    }
  };

  const handleSelectReturnFlight = (flight) => {
    setSelectedReturnFlight(flight.id);
  };

  const handleContinue = () => {
    if (isRoundTrip && selectedDepartureFlight && selectedReturnFlight) {
      navigate(`/select-flight/${selectedDepartureFlight}/${selectedReturnFlight}`, { 
        state: { passengers: passengerCount, tripType: searchParams.tripType }
      });
    } else if (!isRoundTrip && selectedDepartureFlight) {
      navigate(`/select-flight/${selectedDepartureFlight}`, { 
        state: { passengers: passengerCount, tripType: searchParams.tripType }
      });
    }
  };

  const handleBackToSearch = () => {
    navigate('/');
  };

  const sortOptions = [
    { value: 'price', label: 'Price' },
    { value: 'departure', label: 'Departure Time' },
  ];

  const canContinue = !isRoundTrip ? selectedDepartureFlight : 
                     (selectedDepartureFlight && selectedReturnFlight);

  return (
    <Container>
      <StepFlow currentStep={2} />
      <Header>
        <div>
          <Title>Available Flights</Title>
          <SearchSummary>
            <Plane size={20} />
            {searchParams.from} → {searchParams.to}
            <span> • </span>
            {searchParams.departureDate}
            {isRoundTrip && (
              <>
                <span> • </span>
                {searchParams.returnDate}
              </>
            )}
            <span> • </span>
            {passengerCount} Passenger(s)
            <span> • </span>
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

      {loadingAirports ? (
        <LoadingMessage>Loading airports...</LoadingMessage>
      ) : error ? (
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
          <BackButton onClick={handleBackToSearch}>Back to Search Form</BackButton>
        </ErrorContainer>
      ) : loadingFlights ? (
        <LoadingMessage>Loading flights...</LoadingMessage>
      ) : (
        <>
          <FlightListsContainer>
            <FlightListSection>
              <FlightListTitle>{isRoundTrip ? 'Departure Flights' : 'Select Your Flight'}</FlightListTitle>
              {flights.length === 0 ? (
                <ErrorContainer>
                  <ErrorMessage>No flights available</ErrorMessage>
                  <BackButton onClick={handleBackToSearch}>Back to Search Form</BackButton>
                </ErrorContainer>
              ) : (
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
                        <Amount>₹{flight.price}</Amount>
                        <SelectButton
                          onClick={() => handleSelectDepartureFlight(flight)}
                        >
                          {selectedDepartureFlight === flight.id ? 'Selected' : 'Select'}
                        </SelectButton>
                      </Price>
                    </FlightCard>
                  ))}
                </FlightList>
              )}
            </FlightListSection>

            {showReturnFlights && isRoundTrip && (
              <FlightListSection>
                <FlightListTitle>Return Flights</FlightListTitle>
                {returnFlights.length === 0 ? (
                  <ErrorContainer>
                    <ErrorMessage>No return flights available</ErrorMessage>
                    <BackButton onClick={handleBackToSearch}>Back to Search Form</BackButton>
                  </ErrorContainer>
                ) : (
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
                          <Amount>₹{flight.price}</Amount>
                          <SelectButton
                            onClick={() => handleSelectReturnFlight(flight)}
                          >
                            {selectedReturnFlight === flight.id ? 'Selected' : 'Select'}
                          </SelectButton>
                        </Price>
                      </FlightCard>
                    ))}
                  </FlightList>
                )}
              </FlightListSection>
            )}
          </FlightListsContainer>

          {showReturnFlights && isRoundTrip && (
            <BookNowButton 
              onClick={handleContinue}
              disabled={!canContinue}
            >
              {canContinue ? 'Continue to Booking' : 'Select Both Flights to Continue'}
            </BookNowButton>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchResults;