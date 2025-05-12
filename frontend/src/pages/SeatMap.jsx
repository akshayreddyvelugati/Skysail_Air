import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import StepFlow from './StepFlow';
import axios from 'axios';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(180deg, ${props => props.theme.colors?.white || '#ffffff'} 0%, ${props => props.theme.colors?.gray?.[100] || '#f5f5f5'} 100%);
  padding-bottom: 100px; /* Ensure space for footer */
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  color: ${props => props.theme.colors?.primary || '#2563eb'};
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: ${props => props.theme.fonts?.heading || 'sans-serif'};
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors?.gray?.[700] || '#4b5563'};
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
  font-family: ${props => props.theme.fonts?.body || 'sans-serif'};
`;

const FlightSection = styled.div`
  margin-bottom: 3rem;
  background: ${props => props.theme.colors?.white || '#ffffff'};
  border-radius: 1rem;
  box-shadow: ${props => props.theme.shadows?.md || '0 4px 6px rgba(0, 0, 0, 0.1)'};
  overflow: hidden;
`;

const FlightTitle = styled.h2`
  color: ${props => props.theme.colors?.white || '#ffffff'};
  font-size: 1.75rem;
  font-weight: 600;
  padding: 1.5rem;
  background: ${props => props.theme.gradients?.primary || 'linear-gradient(to right, #2563eb, #7c3aed)'};
  font-family: ${props => props.theme.fonts?.heading || 'sans-serif'};
`;

const SeatMapContainer = styled.div`
  padding: 2rem;
`;

const Legend = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors?.gray?.[700] || '#4b5563'};
  font-weight: 500;
  font-family: ${props => props.theme.fonts?.body || 'sans-serif'};
`;

const SeatIndicator = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: ${props => {
    switch (props.type) {
      case 'available':
        return props.theme.colors?.white || '#ffffff';
      case 'occupied':
        return props.theme.colors?.gray?.[300] || '#d1d5db';
      case 'selected':
        return props.theme.colors?.secondary || '#7c3aed';
      case 'window':
        return props.theme.colors?.blue?.[200] || '#93c5fd';
      case 'aisle':
        return props.theme.colors?.green?.[200] || '#86efac';
      case 'middle':
        return props.theme.colors?.yellow?.[200] || '#fde68a';
      default:
        return '#ffffff';
    }
  }};
  border: 2px solid ${props => props.theme.colors?.gray?.[300] || '#d1d5db'};
`;

const Cabin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Seat = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.colors?.gray?.[300] || '#d1d5db'};
  background: ${props => {
    if (props.status === 'selected') return props.theme.colors?.secondary || '#7c3aed';
    if (props.status === 'occupied') return props.theme.colors?.gray?.[300] || '#d1d5db';
    switch (props.seatType) {
      case 'Window':
        return props.theme.colors?.blue?.[200] || '#93c5fd';
      case 'Aisle':
        return props.theme.colors?.green?.[200] || '#86efac';
      case 'Middle':
        return props.theme.colors?.yellow?.[200] || '#fde68a';
      default:
        return props.theme.colors?.white || '#ffffff';
    }
  }};
  color: ${props => props.status === 'selected' ? (props.theme.colors?.white || '#ffffff') : (props.theme.colors?.gray?.[700] || '#4b5563')};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: ${props => props.status === 'occupied' ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  position: relative;

  &:hover:not(:disabled) {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover::after {
    content: '${props => props.seatType || 'Unknown'}';
    position: absolute;
    top: -2.5rem;
    left: 50%;
    transform: translateX(-50%);
    background: ${props => props.theme.colors?.gray?.[800] || '#1f2937'};
    color: ${props => props.theme.colors?.white || '#ffffff'};
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 10;
  }
`;

const Aisle = styled.div`
  width: 60px;
`;

const Button = styled.button`
  background: ${props => props.theme.gradients?.primary || 'linear-gradient(to right, #2563eb, #7c3aed)'};
  color: ${props => props.theme.colors?.white || '#ffffff'};
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.25rem;
  width: 100%;
  max-width: 300px;
  margin: 2rem auto 0;
  display: block;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors?.red || '#dc2626'};
  font-size: 1.25rem;
  text-align: center;
  margin: 2rem 0;
  font-weight: 500;
  font-family: ${props => props.theme.fonts?.body || 'sans-serif'};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: ${props => props.theme.colors.gray?.[500] || '#6b7280'};
`;

const generateSeats = () => {
  const rows = 10;
  const seatsPerHalf = 3;
  const layout = [];
  
  for (let row = 1; row <= rows; row++) {
    const rowSeats = [];
    for (let seat = 0; seat < seatsPerHalf * 2; seat++) {
      const seatLetter = String.fromCharCode(65 + seat);
      const seatNumber = `${row}${seatLetter}`;
      const isOccupied = Math.random() < 0.3;
      let seatType;
      if (seatLetter === 'A' || seatLetter === 'F') seatType = 'Window';
      else if (seatLetter === 'C' || seatLetter === 'D') seatType = 'Aisle';
      else seatType = 'Middle';
      rowSeats.push({
        id: seatNumber,
        status: isOccupied ? 'occupied' : 'available',
        seatType
      });
    }
    layout.push(rowSeats);
  }
  
  return layout;
};

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <StepFlow currentStep={4} />
          <ErrorMessage>
            Something went wrong: {this.state.error?.message || 'Unknown error'}
          </ErrorMessage>
        </Container>
      );
    }
    return this.props.children;
  }
}

const SeatMap = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { departureFlight, returnFlight, passengerCount, bookingId, tripType } = state || {};
  const isRoundTrip = tripType === 'round-trip' && returnFlight;

  const [departureSeatLayout, setDepartureSeatLayout] = useState(generateSeats());
  const [returnSeatLayout, setReturnSeatLayout] = useState(isRoundTrip ? generateSeats() : null);
  const [selectedDepartureSeats, setSelectedDepartureSeats] = useState([]);
  const [selectedReturnSeats, setSelectedReturnSeats] = useState(isRoundTrip ? [] : []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!departureFlight || (isRoundTrip && !returnFlight)) {
      setError('Missing flight details');
      return;
    }
    if (isRoundTrip && !returnSeatLayout) {
      setReturnSeatLayout(generateSeats());
    }
    if (isRoundTrip && selectedReturnSeats === null) {
      setSelectedReturnSeats([]);
    }
  }, [departureFlight, returnFlight, isRoundTrip]);

  const handleSeatSelect = (flightType, rowIndex, seatIndex) => {
    const layout = flightType === 'departure' ? [...departureSeatLayout] : [...returnSeatLayout];
    const setLayout = flightType === 'departure' ? setDepartureSeatLayout : setReturnSeatLayout;
    const selectedSeats = flightType === 'departure' ? [...selectedDepartureSeats] : [...selectedReturnSeats];
    const setSelectedSeats = flightType === 'departure' ? setSelectedDepartureSeats : setSelectedReturnSeats;

    const seat = layout[rowIndex][seatIndex];
    if (seat.status === 'occupied') return;

    if (seat.status === 'selected') {
      layout[rowIndex][seatIndex] = { ...seat, status: 'available' };
      const index = selectedSeats.indexOf(seat.id);
      if (index !== -1) selectedSeats.splice(index, 1);
    } else if (seat.status === 'available' && selectedSeats.length < passengerCount) {
      layout[rowIndex][seatIndex] = { ...seat, status: 'selected' };
      selectedSeats.push(seat.id);
    }

    setLayout(layout);
    setSelectedSeats(selectedSeats);
  };

  const handleConfirm = async () => {
    if (
      selectedDepartureSeats.length === passengerCount &&
      (!isRoundTrip || selectedReturnSeats.length === passengerCount)
    ) {
      try {
        setLoading(true);
        // Save seat assignments to the database
        const seatAssignments = [];
        const passengersResponse = await axios.get(`http://localhost:5000/api/passenger-bookings?booking_id=${bookingId}`);
        const passengerBookings = passengersResponse.data;

        passengerBookings.forEach((pb, index) => {
          seatAssignments.push({
            passenger_id: pb.passenger_id,
            booking_id: bookingId,
            flight_id: parseInt(departureFlight.id),
            seat_number: selectedDepartureSeats[index],
          });
          if (isRoundTrip && returnFlight) {
            seatAssignments.push({
              passenger_id: pb.passenger_id,
              booking_id: bookingId,
              flight_id: parseInt(returnFlight.id),
              seat_number: selectedReturnSeats[index],
            });
          }
        });

        await Promise.all(seatAssignments.map(assignment =>
          axios.post('http://localhost:5000/api/seat-assignments', assignment)
        ));

        const bookingDetails = {
          departureFlightId: departureFlight.id,
          departureSeats: selectedDepartureSeats,
          returnFlightId: isRoundTrip ? returnFlight.id : null,
          returnSeats: isRoundTrip ? selectedReturnSeats : [],
          passengerCount,
          tripType
        };
        sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
        navigate(`/confirmation/${bookingId}`, { state: bookingDetails });
      } catch (err) {
        setError('Failed to save seat assignments');
        setLoading(false);
      }
    }
  };

  const canConfirm = selectedDepartureSeats.length === passengerCount &&
    (!isRoundTrip || selectedReturnSeats.length === passengerCount);

  if (error) {
    return (
      <Container>
        <StepFlow currentStep={4} />
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <ErrorBoundary>
      <Container>
        <StepFlow currentStep={4} />
        <Header>
          <Heading>Selecting a Seat</Heading>
          <Subtitle>
            Whether you want to secure a window seat or just make sure you're sat together, you can choose your seat in advance.
          </Subtitle>
        </Header>

        <FlightSection>
          <FlightTitle>
            Departure: {departureFlight?.from} → {departureFlight?.to} ({departureFlight?.departureDate})
          </FlightTitle>
          <SeatMapContainer>
            <Legend>
              <LegendItem><SeatIndicator type="available" />Available</LegendItem>
              <LegendItem><SeatIndicator type="occupied" />Occupied</LegendItem>
              <LegendItem><SeatIndicator type="selected" />Selected</LegendItem>
              <LegendItem><SeatIndicator type="window" />Window</LegendItem>
              <LegendItem><SeatIndicator type="aisle" />Aisle</LegendItem>
              <LegendItem><SeatIndicator type="middle" />Middle</LegendItem>
            </Legend>
            <Cabin>
              {departureSeatLayout.map((row, rowIndex) => (
                <Row key={rowIndex}>
                  {row.slice(0, 3).map((seat, seatIndex) => (
                    <Seat
                      key={seat.id}
                      status={seat.status}
                      seatType={seat.seatType}
                      onClick={() => handleSeatSelect('departure', rowIndex, seatIndex)}
                      disabled={seat.status === 'occupied'}
                    >
                      {seat.id}
                    </Seat>
                  ))}
                  <Aisle />
                  {row.slice(3).map((seat, seatIndex) => (
                    <Seat
                      key={seat.id}
                      status={seat.status}
                      seatType={seat.seatType}
                      onClick={() => handleSeatSelect('departure', rowIndex, seatIndex + 3)}
                      disabled={seat.status === 'occupied'}
                    >
                      {seat.id}
                    </Seat>
                  ))}
                </Row>
              ))}
            </Cabin>
          </SeatMapContainer>
        </FlightSection>

        {isRoundTrip && returnFlight && returnSeatLayout && (
          <FlightSection>
            <FlightTitle>
              Return: {returnFlight?.from} → {returnFlight?.to} ({returnFlight?.departureDate})
            </FlightTitle>
            <SeatMapContainer>
              <Legend>
                <LegendItem><SeatIndicator type="available" />Available</LegendItem>
                <LegendItem><SeatIndicator type="occupied" />Occupied</LegendItem>
                <LegendItem><SeatIndicator type="selected" />Selected</LegendItem>
                <LegendItem><SeatIndicator type="window" />Window</LegendItem>
                <LegendItem><SeatIndicator type="aisle" />Aisle</LegendItem>
                <LegendItem><SeatIndicator type="middle" />Middle</LegendItem>
              </Legend>
              <Cabin>
                {returnSeatLayout.map((row, rowIndex) => (
                  <Row key={rowIndex}>
                    {row.slice(0, 3).map((seat, seatIndex) => (
                      <Seat
                        key={seat.id}
                        status={seat.status}
                        seatType={seat.seatType}
                        onClick={() => handleSeatSelect('return', rowIndex, seatIndex)}
                        disabled={seat.status === 'occupied'}
                      >
                        {seat.id}
                      </Seat>
                    ))}
                    <Aisle />
                    {row.slice(3).map((seat, seatIndex) => (
                      <Seat
                        key={seat.id}
                        status={seat.status}
                        seatType={seat.seatType}
                        onClick={() => handleSeatSelect('return', rowIndex, seatIndex + 3)}
                        disabled={seat.status === 'occupied'}
                      >
                        {seat.id}
                      </Seat>
                    ))}
                  </Row>
                ))}
              </Cabin>
            </SeatMapContainer>
          </FlightSection>
        )}

        <Button
          onClick={handleConfirm}
          disabled={!canConfirm || loading}
        >
          {loading ? 'Confirming...' : 'Confirm Seat Selection'}
        </Button>
      </Container>
    </ErrorBoundary>
  );
};

export default SeatMap;