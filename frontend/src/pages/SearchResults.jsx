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
  padding-top: 6rem; /* Adjust for fixed Navbar height */
  padding-bottom: 100px;
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
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state || {};
  const { from, to, departureDate, returnDate, passengers, class: flightClass, tripType } = searchParams;

  const [flights, setFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [loadingAirports, setLoadingAirports] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('price');
  const [departureFlight, setDepartureFlight] = useState(null); // Track selected departure flight
  const isRoundTrip = tripType === 'round-trip';

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/airports');
        setAirports(response.data);
        setLoadingAirports(false);
      } catch (err) {
        setError('Failed to fetch airports');
        setLoadingAirports(false);
      }
    };
    fetchAirports();
  }, []);

  useEffect(() => {
    if (loadingAirports) return;

    if (!from || !to || !departureDate) {
      setError('Missing search parameters');
      return;
    }

    const originAirport = airports.find(a => a.code === from);
    const destAirport = airports.find(a => a.code === to);

    if (!originAirport || !destAirport) {
      setError('Invalid airport codes');
      return;
    }

    setLoadingFlights(true);
    setError(null);

    const formattedDepartureDate = departureDate; // Use as-is: '06/02/2025'
    const formattedReturnDate = returnDate || null;

    // Fetch departure flights
    axios
      .get('http://localhost:5000/api/flights', {
        params: {
          origin_airport_id: originAirport.id,
          destination_airport_id: destAirport.id,
          departure_date: formattedDepartureDate,
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
        console.error('Error fetching departure flights:', err.response?.data || err.message);
        setError('Failed to fetch departure flights: ' + (err.response?.data?.error || err.message));
        setLoadingFlights(false);
      });

    // Fetch return flights if round-trip
    if (isRoundTrip && formattedReturnDate) {
      axios
        .get('http://localhost:5000/api/flights', {
          params: {
            origin_airport_id: destAirport.id,
            destination_airport_id: originAirport.id,
            departure_date: formattedReturnDate,
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
          console.error('Error fetching return flights:', err.response?.data || err.message);
          setError('Failed to fetch return flights: ' + (err.response?.data?.error || err.message));
        });
    }
  }, [from, to, departureDate, returnDate, isRoundTrip, loadingAirports, airports]);

  const calculateDuration = (departureTime, arrivalTime) => {
    const [depHours, depMinutes] = departureTime.split(':').map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);
    const depTotalMinutes = depHours * 60 + depMinutes;
    let arrTotalMinutes = arrHours * 60 + arrMinutes;
    if (arrTotalMinutes < depTotalMinutes) {
      arrTotalMinutes += 24 * 60;
    }
    const durationMinutes = arrTotalMinutes - depTotalMinutes;
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const handleFlightSelect = (flight, type) => {
    if (type === 'departure') {
      if (isRoundTrip) {
        setDepartureFlight(flight); // Store departure flight for round-trip
      } else {
        // One-way: Navigate directly to SelectFlight
        navigate(`/select-flight/${flight.id}`, {
          state: {
            ...searchParams,
            departureFlight: flight,
            passengers,
            tripType,
          },
        });
      }
    } else if (type === 'return' && departureFlight) {
      // Round-trip: Navigate after both flights are selected
      navigate(`/select-flight/${departureFlight.id}/${flight.id}`, {
        state: {
          ...searchParams,
          departureFlight,
          returnFlight: flight,
          passengers,
          tripType,
        },
      });
    }
  };

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    return 0;
  });

  const sortedReturnFlights = [...returnFlights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    return 0;
  });

  if (loadingFlights || loadingAirports) {
    return (
      <Container>
        <StepFlow currentStep={2} />
        <LoadingMessage>Loading...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <StepFlow currentStep={2} />
        <Header>
          <div>
            <Title>Available Flights</Title>
            <SearchSummary>
              {from} → {to} • {departureDate} • {passengers} Passenger(s) • {flightClass}
            </SearchSummary>
          </div>
        </Header>
        <FilterSort>
          <FilterLabel htmlFor="sort">Sort by:</FilterLabel>
          <FilterSelect
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Price</option>
          </FilterSelect>
        </FilterSort>
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
          <BackButton onClick={() => navigate('/')}>
            Back to Search Form
          </BackButton>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <StepFlow currentStep={2} />
      <Header>
        <div>
          <Title>Available Flights</Title>
          <SearchSummary>
            {from} → {to} • {departureDate} • {passengers} Passenger(s) • {flightClass}
          </SearchSummary>
        </div>
      </Header>
      <FilterSort>
        <FilterLabel htmlFor="sort">Sort by:</FilterLabel>
        <FilterSelect
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="price">Price</option>
        </FilterSelect>
      </FilterSort>

      <FlightListsContainer>
        <FlightListSection>
          <FlightListTitle>Departure Flights</FlightListTitle>
          <FlightList>
            {sortedFlights.length === 0 ? (
              <ErrorMessage>No departure flights found</ErrorMessage>
            ) : (
              sortedFlights.map(flight => (
                <FlightCard key={flight.id}>
                  <FlightInfo>
                    <Route>
                      <span>{flight.from}</span>
                      <Plane size={20} />
                      <span>{flight.to}</span>
                    </Route>
                    <Time>
                      <Clock size={16} />
                      <span>
                        {flight.departureTime} - {flight.arrivalTime} • {flight.duration}
                      </span>
                    </Time>
                    <div>{flight.airline} • {flight.flightNumber}</div>
                  </FlightInfo>
                  <Price>
                    <Amount>₹{flight.price.toFixed(2)}</Amount>
                    <SelectButton onClick={() => handleFlightSelect(flight, 'departure')}>
                      Select
                    </SelectButton>
                  </Price>
                </FlightCard>
              ))
            )}
          </FlightList>
        </FlightListSection>

        {isRoundTrip && (
          <FlightListSection>
            <FlightListTitle>Return Flights</FlightListTitle>
            <FlightList>
              {sortedReturnFlights.length === 0 ? (
                <ErrorMessage>No return flights found</ErrorMessage>
              ) : (
                sortedReturnFlights.map(flight => (
                  <FlightCard key={flight.id}>
                    <FlightInfo>
                      <Route>
                        <span>{flight.from}</span>
                        <Plane size={20} />
                        <span>{flight.to}</span>
                      </Route>
                      <Time>
                        <Clock size={16} />
                        <span>
                          {flight.departureTime} - {flight.arrivalTime} • {flight.duration}
                        </span>
                      </Time>
                      <div>{flight.airline} • {flight.flightNumber}</div>
                    </FlightInfo>
                    <Price>
                      <Amount>₹{flight.price.toFixed(2)}</Amount>
                      <SelectButton
                        onClick={() => handleFlightSelect(flight, 'return')}
                        disabled={!departureFlight} // Disable until departure flight is selected
                      >
                        Select
                      </SelectButton>
                    </Price>
                  </FlightCard>
                ))
              )}
            </FlightList>
          </FlightListSection>
        )}
      </FlightListsContainer>

      <BackButton onClick={() => navigate('/')}>
        Back to Search Form
      </BackButton>
    </Container>
  );
};

export default SearchResults;