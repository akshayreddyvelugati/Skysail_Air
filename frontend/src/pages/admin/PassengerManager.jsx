import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, User, Plane, Calendar } from 'lucide-react';

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

const Badge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;

  ${props => {
    switch (props.type) {
      case 'success':
        return `
          background: ${props.theme.colors.success}10;
          color: ${props.theme.colors.success};
        `;
      case 'warning':
        return `
          background: ${props.theme.colors.warning}10;
          color: ${props.theme.colors.warning};
        `;
      case 'error':
        return `
          background: ${props.theme.colors.error}10;
          color: ${props.theme.colors.error};
        `;
      default:
        return '';
    }
  }}
`;

// Dummy data
const initialPassengers = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1-555-0101',
    passportNumber: 'P123456789',
    nationality: 'USA',
    bookings: [
      {
        id: 'B1',
        flightNumber: 'SK001',
        route: 'JFK → LAX',
        date: '2024-03-25',
        status: 'confirmed'
      },
      {
        id: 'B2',
        flightNumber: 'SK002',
        route: 'LAX → JFK',
        date: '2024-03-30',
        status: 'confirmed'
      }
    ]
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@email.com',
    phone: '+1-555-0102',
    passportNumber: 'P987654321',
    nationality: 'UK',
    bookings: [
      {
        id: 'B3',
        flightNumber: 'SK003',
        route: 'LHR → JFK',
        date: '2024-03-26',
        status: 'checked-in'
      }
    ]
  }
];

const PassengerManager = () => {
  const [passengers, setPassengers] = useState(initialPassengers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPassengers = passengers.filter(passenger =>
    passenger.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    passenger.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    passenger.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    passenger.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge type="success">Confirmed</Badge>;
      case 'checked-in':
        return <Badge type="warning">Checked In</Badge>;
      case 'completed':
        return <Badge type="success">Completed</Badge>;
      case 'cancelled':
        return <Badge type="error">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Header>
        <SearchBar>
          <Search size={18} color="#6B7280" />
          <SearchInput
            type="text"
            placeholder="Search passengers..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </SearchBar>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>Passenger</Th>
            <Th>Contact</Th>
            <Th>Passport</Th>
            <Th>Bookings</Th>
          </tr>
        </thead>
        <tbody>
          {filteredPassengers.map(passenger => (
            <tr key={passenger.id}>
              <Td>
                <div className="flex items-center gap-3">
                  <User size={20} className="text-gray-400" />
                  <div>
                    <div className="font-medium">{passenger.firstName} {passenger.lastName}</div>
                    <div className="text-sm text-gray-500">{passenger.nationality}</div>
                  </div>
                </div>
              </Td>
              <Td>
                <div>{passenger.email}</div>
                <div className="text-sm text-gray-500">{passenger.phone}</div>
              </Td>
              <Td>{passenger.passportNumber}</Td>
              <Td>
                <div className="space-y-2">
                  {passenger.bookings.map(booking => (
                    <div key={booking.id} className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Plane size={16} />
                        <span>{booking.flightNumber}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar size={16} />
                        <span>{booking.date}</span>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  ))}
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PassengerManager;