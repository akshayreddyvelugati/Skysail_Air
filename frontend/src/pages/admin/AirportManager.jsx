import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, Edit2, Trash2, X, Check, Search } from 'lucide-react';

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
const initialAirports = [
  { id: '1', code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA', terminals: 6 },
  { id: '2', code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA', terminals: 9 },
  { id: '3', code: 'LHR', name: 'London Heathrow', city: 'London', country: 'UK', terminals: 5 },
  { id: '4', code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE', terminals: 3 },
  { id: '5', code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore', terminals: 4 },
];

const AirportManager = () => {
  const [airports, setAirports] = useState(initialAirports);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAirport, setEditingAirport] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    city: '',
    country: '',
    terminals: 1
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAirports = airports.filter(airport =>
    airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingAirport(null);
    setFormData({ code: '', name: '', city: '', country: '', terminals: 1 });
    setIsModalOpen(true);
  };

  const handleEdit = (airport) => {
    setEditingAirport(airport);
    setFormData(airport);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this airport?')) {
      setAirports(airports.filter(airport => airport.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAirport) {
      // Update existing airport
      setAirports(airports.map(airport =>
        airport.id === editingAirport.id ? { ...formData, id: airport.id } : airport
      ));
    } else {
      // Add new airport
      const newAirport = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      setAirports([...airports, newAirport]);
    }
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'terminals' ? parseInt(value) : value
    }));
  };

  return (
    <>
      <Container>
        <Header>
          <SearchBar>
            <Search size={18} color="#6B7280" />
            <SearchInput
              type="text"
              placeholder="Search airports..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBar>
          <Button variant="primary" onClick={handleAdd}>
            <Plus size={18} />
            Add Airport
          </Button>
        </Header>
        <Table>
          <thead>
            <tr>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>City</Th>
              <Th>Country</Th>
              <Th>Terminals</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredAirports.map(airport => (
              <tr key={airport.id}>
                <Td>{airport.code}</Td>
                <Td>{airport.name}</Td>
                <Td>{airport.city}</Td>
                <Td>{airport.country}</Td>
                <Td>{airport.terminals}</Td>
                <Td>
                  <Actions>
                    <Button onClick={() => handleEdit(airport)}>
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(airport.id)}>
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
              {editingAirport ? 'Edit Airport' : 'Add New Airport'}
            </h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Airport Code</Label>
                <Input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., JFK"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Airport Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., John F. Kennedy International"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., New York"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g., USA"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Number of Terminals</Label>
                <Input
                  type="number"
                  name="terminals"
                  value={formData.terminals}
                  onChange={handleChange}
                  min="1"
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
                  {editingAirport ? 'Update' : 'Add'} Airport
                </Button>
              </ModalButtons>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AirportManager;