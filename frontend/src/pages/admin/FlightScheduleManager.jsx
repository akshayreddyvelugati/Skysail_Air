import React, { useState } from 'react';
import styled from 'styled-components';
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

// Dummy data
const initialFlights = [
 {
   id: '1',
   flightNumber: 'SK001',
   origin: 'JFK',
   destination: 'LAX',
   departureDate: '2024-03-25',
   departureTime: '08:00',
   arrivalTime: '11:30',
   aircraft: 'Boeing 737-800',
   status: 'scheduled',
   price: 299
 },
 {
   id: '2',
   flightNumber: 'SK002',
   origin: 'LAX',
   destination: 'JFK',
   departureDate: '2024-03-25',
   departureTime: '14:00',
   arrivalTime: '22:30',
   aircraft: 'Airbus A320neo',
   status: 'scheduled',
   price: 349
 }
];

const airports = [
 { code: 'JFK', name: 'New York JFK' },
 { code: 'LAX', name: 'Los Angeles International' },
 { code: 'LHR', name: 'London Heathrow' },
 { code: 'DXB', name: 'Dubai International' },
 { code: 'SIN', name: 'Singapore Changi' }
];

const aircraft = [
  'Boeing 737-800',
  'Airbus A320neo',
  'Boeing 787-9',
  'Airbus A350-900'
];

const FlightScheduleManager = () => {
  const [flights, setFlights] = useState(initialFlights);
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

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this flight?')) {
      setFlights(flights.filter(flight => flight.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingFlight) {
      setFlights(flights.map(flight =>
        flight.id === editingFlight.id ? { ...formData, id: flight.id } : flight
      ));
    } else {
      const newFlight = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      setFlights([...flights, newFlight]);
    }
    
    setIsModalOpen(false);
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
        
        <Table>
          <thead>
            <tr>
              <Th>Flight</Th>
              <Th>Route</Th>
              <Th>Date</Th>
              <Th>Time</Th>
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
                <Td>{flight.origin} → {flight.destination}</Td>
                <Td>{flight.departureDate}</Td>
                <Td>{flight.departureTime} - {flight.arrivalTime}</Td>
                <Td>{flight.aircraft}</Td>
                <Td>
                  <span style={{ color: getStatusColor(flight.status) }}>
                    {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                  </span>
                </Td>
                <Td>${flight.price}</Td>
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
                    <option key={airport.code} value={airport.code}>
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
                    <option key={airport.code} value={airport.code}>
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
                    <option key={plane} value={plane}>
                      {plane}
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