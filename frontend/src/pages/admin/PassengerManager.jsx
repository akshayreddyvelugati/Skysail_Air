import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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

const PassengerManager = () => {
  const [passengers, setPassengers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/passengers');
        setPassengers(response.data);
      } catch (err) {
        console.error('Error fetching passengers:', err);
        setError('Failed to fetch passengers: ' + err.message);
      }
    };
    fetchPassengers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPassengers = passengers.filter(passenger =>
    passenger.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    passenger.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (passenger.passport_number && passenger.passport_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
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

  if (error) {
    return <div style={{ padding: '1rem', color: '#ef4444' }}>{error}</div>;
  }

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
                    <div className="font-medium">{passenger.first_name} {passenger.last_name}</div>
                    <div className="text-sm text-gray-500">{passenger.nationality}</div>
                  </div>
                </div>
              </Td>
              <Td>
                <div>{passenger.email}</div>
                <div className="text-sm text-gray-500">{passenger.phone}</div>
              </Td>
              <Td>{passenger.passport_number || 'N/A'}</Td>
              <Td>
                <div className="space-y-2">
                  {passenger.booking_id ? (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Plane size={16} />
                        <span>SK{passenger.booking_id}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar size={16} />
                        <span>{new Date(passenger.created_at).toLocaleDateString()}</span>
                      </div>
                      {getStatusBadge('confirmed')} {/* Assuming status is 'confirmed' since booking was just created */}
                    </div>
                  ) : (
                    <div>No bookings</div>
                  )}
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