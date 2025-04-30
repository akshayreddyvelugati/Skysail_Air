import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Check, Search, Plane, Calendar, Clock } from 'lucide-react';

const Container = styled.div`
 background: white;
 border-radius: 0.75rem;
 box-shadow: ${props => props.theme.shadows.sm};
 overflow: hidden;
`;

const Header = styled.div`
 padding: 1.5rem;
 display: flex;
 justify-content: space-between;
 align-items: center;
 border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
`;

const SearchBar = styled.div`
 display: flex;
 align-items: center;
 gap: 0.5rem;
 background: ${props => props.theme.colors.gray[100]};
 padding: 0.5rem 1rem;
 border-radius: 0.5rem;
 width: 300px;
`;

const SearchInput = styled.input`
 border: none;
 background: none;
 outline: none;
 width: 100%;
 font-size: 0.875rem;
 color: ${props => props.theme.colors.gray[900]};
 &::placeholder {
   color: ${props => props.theme.colors.gray[400]};
 }
`;

const Button = styled.button`
 display: flex;
 align-items: center;
 gap: 0.5rem;
 padding: 0.5rem 1rem;
 border-radius: 0.375rem;
 font-weight: 500;
 font-size: 0.875rem;
 transition: all 0.2s;
 
 ${props => props.variant === 'primary' && `
   background: ${props.theme.gradients.primary};
   color: white;
   &:hover {
     transform: translateY(-1px);
   }
 `}
 
 ${props => props.variant === 'danger' && `
   background: ${props.theme.colors.error}10;
   color: ${props.theme.colors.error};
   &:hover {
     background: ${props.theme.colors.error}20;
   }
 `}
`;

const Table = styled.table`
 width: 100%;
 border-collapse: collapse;
`;

const Th = styled.th`
 text-align: left;
 padding: 1rem;
 color: ${props => props.theme.colors.gray[500]};
 font-weight: 500;
 border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
`;

const Td = styled.td`
 padding: 1rem;
 border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
`;

const Actions = styled.div`
 display: flex;
 gap: 0.5rem;
`;

const Modal = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background: rgba(0, 0, 0, 0.5);
 display: flex;
 align-items: center;
 justify-content: center;
 z-index: 50;
`;

const ModalContent = styled.div`
 background: white;
 border-radius: 0.75rem;
 padding: 2rem;
 width: 100%;
 max-width: 500px;
`;

const Form = styled.form`
 display: flex;
 flex-direction: column;
 gap: 1rem;
`;

const FormGroup = styled.div`
 display: flex;
 flex-direction: column;
 gap: 0.5rem;
`;

const Label = styled.label`
 font-weight: 500;
 color: ${props => props.theme.colors.gray[700]};
`;

const Input = styled.input`
 padding: 0.5rem;
 border: 1px solid ${props => props.theme.colors.gray[300]};
 border-radius: 0.375rem;
 font-size: 0.875rem;
 &:focus {
   outline: none;
   border-color: ${props => props.theme.colors.secondary};
   box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary}20;
 }
`;

const Select = styled.select`
 padding: 0.5rem;
 border: 1px solid ${props => props.theme.colors.gray[300]};
 border-radius: 0.375rem;
 font-size: 0.875rem;
 background-color: white;
 &:focus {
   outline: none;
   border-color: ${props => props.theme.colors.secondary};
   box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary}20;
 }
`;

const ModalButtons = styled.div`
 display: flex;
 justify-content: flex-end;
 gap: 1rem;
 margin-top: 2rem;
`;

const LoadingMessage = styled.p`
  padding: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.gray[500]};
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  margin-top: 0.5rem;
`;

const airports = [
  { id: 1, code: 'DEL', name: 'Indira Gandhi International Airport' },
  { id: 2, code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport' },
  { id: 3, code: 'BLR', name: 'Kempegowda International Airport' },
  { id: 4, code: 'CCU', name: 'Netaji Subhas Chandra Bose International Airport' },
  { id: 5, code: 'MAA', name: 'Chennai International Airport' },
  { id: 6, code: 'HYD', name: 'Rajiv Gandhi International Airport' },
  { id: 7, code: 'AMD', name: 'Sardar Vallabhbhai Patel International Airport' },
  { id: 8, code: 'GOI', name: 'Manohar International Airport' },
  { id: 9, code: 'DXB', name: 'Dubai International Airport' },
  { id: 10, code: 'LHR', name: 'London Heathrow Airport' },
  { id: 11, code: 'JFK', name: 'John F. Kennedy International Airport' },
  { id: 12, code: 'SIN', name: 'Singapore Changi Airport' },
  { id: 13, code: 'BKK', name: 'Suvarnabhumi Airport' },
  { id: 14, code: 'DOH', name: 'Hamad International Airport' },
  { id: 15, code: 'FRA', name: 'Frankfurt Airport' },
  { id: 16, code: 'CDG', name: 'Paris Charles de Gaulle Airport' },
  { id: 17, code: 'HKG', name: 'Hong Kong International Airport' },
  { id: 18, code: 'SYD', name: 'Sydney Kingsford Smith Airport' },
  { id: 19, code: 'ICN', name: 'Incheon International Airport' },
  { id: 20, code: 'KUL', name: 'Kuala Lumpur International Airport' },
  { id: 21, code: 'NRT', name: 'Narita International Airport' },
  { id: 22, code: 'CMB', name: 'Bandaranaike International Airport' },
  { id: 23, code: 'AUH', name: 'Abu Dhabi International Airport' },
];

const aircraft = [
  { id: 1, manufacturer: 'Boeing', model: 'B787-8' },
  { id: 2, manufacturer: 'Airbus', model: 'A320neo' },
  { id: 3, manufacturer: 'Airbus', model: 'A321neo' },
  { id: 4, manufacturer: 'Airbus', model: 'A350-900' },
  { id: 5, manufacturer: 'Boeing', model: 'B777-300ER' },
  { id: 8, manufacturer: 'Airbus', model: 'A320neo' },
];

const FlightScheduleManager = () => {
  const [flights, setFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [formData, setFormData] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    departureDate: '',
    departureTime: '',
    arrivalTime: '',
    aircraft: '',
    status: 'scheduled',
    price: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/flights');
      const mappedFlights = response.data.map(flight => {
        const originAirport = airports.find(a => a.id === flight.origin_airport_id);
        const destinationAirport = airports.find(a => a.id === flight.destination_airport_id);
        const aircraftData = aircraft.find(a => a.id === flight.aircraft_id);
        return {
          id: flight.id.toString(),
          flightNumber: flight.flight_number,
          origin: originAirport ? originAirport.code : flight.origin_airport_id.toString(),
          destination: destinationAirport ? destinationAirport.code : flight.destination_airport_id.toString(),
          departureDate: flight.departure_date,
          departureTime: flight.departure_time,
          arrivalTime: flight.arrival_time,
          aircraft: aircraftData ? `${aircraftData.manufacturer} ${aircraftData.model}` : flight.aircraft_id.toString(),
          status: flight.status.toLowerCase(),
          price: parseFloat(flight.price)
        };
      });
      setFlights(mappedFlights);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setError('Failed to fetch flights');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFlights = flights.filter(flight =>
    flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingFlight(null);
    setFormData({
      flightNumber: '',
      origin: '',
      destination: '',
      departureDate: '',
      departureTime: '',
      arrivalTime: '',
      aircraft: '',
      status: 'scheduled',
      price: 0
    });
    setIsModalOpen(true);
  };

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    setFormData(flight);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this flight?')) {
      try {
        await axios.delete(`http://localhost:5000/api/flights/${id}`);
        await fetchFlights();
      } catch (error) {
        console.error('Error deleting flight:', error);
        setError('Failed to delete flight');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSend = {
      flight_number: formData.flightNumber,
      origin_airport_id: parseInt(formData.origin),
      destination_airport_id: parseInt(formData.destination),
      aircraft_id: parseInt(formData.aircraft),
      departure_date: formData.departureDate,
      departure_time: formData.departureTime,
      arrival_time: formData.arrivalTime,
      status: formData.status.charAt(0).toUpperCase() + formData.status.slice(1), // Capitalize the status
      price: parseFloat(formData.price)
    };

    try {
      if (editingFlight) {
        await axios.put(`http://localhost:5000/api/flights/${editingFlight.id}`, dataToSend);
      } else {
        await axios.post('http://localhost:5000/api/flights', dataToSend);
      }
      await fetchFlights();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving flight:', error);
      const errorMessage = error.response?.data?.error || 'Failed to save flight';
      if (errorMessage.includes('flight_number')) {
        setError('Flight number already exists. Please choose a different flight number.');
      } else {
        setError(errorMessage);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return '#10B981';
      case 'boarding':
        return '#3B82F6';
      case 'departed':
        return '#6366F1';
      case 'arrived':
        return '#10B981';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <>
      <Container>
        <Header>
          <SearchBar>
            <Search size={18} color="#6B7280" />
            <SearchInput
              type="text"
              placeholder="Search flights..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBar>
          <Button variant="primary" onClick={handleAdd}>
            <Plus size={18} />
            Add Flight
          </Button>
        </Header>
        
        {loading ? (
          <LoadingMessage>Loading...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : filteredFlights.length === 0 ? (
          <LoadingMessage>No flights found</LoadingMessage>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Flight</Th>
                <Th>Origin</Th>
                <Th>Destination</Th>
                <Th>Date</Th>
                <Th>Departure Time</Th>
                <Th>Arrival Time</Th>
                <Th>Aircraft</Th>
                <Th>Status</Th>
                <Th>Price</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.map(flight => (
                <tr key={flight.id}>
                  <Td>{flight.flightNumber}</Td>
                  <Td>{flight.origin}</Td>
                  <Td>{flight.destination}</Td>
                  <Td>{flight.departureDate}</Td>
                  <Td>{flight.departureTime}</Td>
                  <Td>{flight.arrivalTime}</Td>
                  <Td>{flight.aircraft}</Td>
                  <Td>
                    <span style={{ color: getStatusColor(flight.status) }}>
                      {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                    </span>
                  </Td>
                  <Td>₹{flight.price}</Td>
                  <Td>
                    <Actions>
                      <Button onClick={() => handleEdit(flight)}>
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(flight.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </Actions>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2 className="text-xl font-semibold mb-4">
              {editingFlight ? 'Edit Flight' : 'Add New Flight'}
            </h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Flight Number</Label>
                <Input
                  type="text"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleChange}
                  placeholder="e.g., SK001"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Origin</Label>
                <Select
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select origin airport</option>
                  {airports.map(airport => (
                    <option key={airport.id} value={airport.id}>
                      {airport.name} ({airport.code})
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Destination</Label>
                <Select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select destination airport</option>
                  {airports.map(airport => (
                    <option key={airport.id} value={airport.id}>
                      {airport.name} ({airport.code})
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Departure Date</Label>
                <Input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Departure Time</Label>
                <Input
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Arrival Time</Label>
                <Input
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Aircraft</Label>
                <Select
                  name="aircraft"
                  value={formData.aircraft}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select aircraft</option>
                  {aircraft.map(plane => (
                    <option key={plane.id} value={plane.id}>
                      {plane.manufacturer} {plane.model}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="boarding">Boarding</option>
                  <option value="departed">Departed</option>
                  <option value="arrived">Arrived</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </FormGroup>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <ModalButtons>
                <Button onClick={() => setIsModalOpen(false)}>
                  <X size={18} />
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  <Check size={18} />
                  {editingFlight ? 'Update' : 'Add'} Flight
                </Button>
              </ModalButtons>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default FlightScheduleManager;