import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Check, Search, Plane } from 'lucide-react';

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

const AirplaneManager = () => {
  const [airplanes, setAirplanes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAirplane, setEditingAirplane] = useState(null);
  const [formData, setFormData] = useState({
    model: '',
    manufacturer: '',
    registration_number: '',
    capacity: 0,
    status: 'active',
    manufacture_year: new Date().getFullYear()
  });

  const fetchAirplanes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/airplanes');
      setAirplanes(response.data);
    } catch (error) {
      console.error('Error fetching airplanes:', error);
    }
  };

  // Fetch airplanes on component mount
  useEffect(() => {
    fetchAirplanes();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAirplanes = airplanes.filter(airplane =>
    airplane.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airplane.registration_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airplane.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingAirplane(null);
    setFormData({
      model: '',
      manufacturer: '',
      registration_number: '',
      capacity: 0,
      status: 'active',
      manufacture_year: new Date().getFullYear()
    });
    setIsModalOpen(true);
  };

  const handleEdit = (airplane) => {
    setEditingAirplane(airplane);
    setFormData({
      model: airplane.model,
      manufacturer: airplane.manufacturer,
      registration_number: airplane.registration_number,
      capacity: airplane.capacity,
      status: airplane.status,
      manufacture_year: airplane.manufacture_year
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this airplane?')) {
      try {
        await axios.delete(`http://localhost:5000/api/airplanes/${id}`);
        await fetchAirplanes();
      } catch (error) {
        console.error('Error deleting airplane:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAirplane) {
        // Update existing airplane
        await axios.put(`http://localhost:5000/api/airplanes/${editingAirplane.id}`, formData);
      } else {
        // Add new airplane
        await axios.post('http://localhost:5000/api/airplanes', formData);
      }
      await fetchAirplanes();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving airplane:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'manufacture_year' ? parseInt(value) : value
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
              placeholder="Search airplanes..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBar>
          <Button variant="primary" onClick={handleAdd}>
            <Plus size={18} />
            Add Airplane
          </Button>
        </Header>
        <Table>
          <thead>
            <tr>
              <Th>Registration</Th>
              <Th>Model</Th>
              <Th>Manufacturer</Th>
              <Th>Capacity</Th>
              <Th>Status</Th>
              <Th>Year</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredAirplanes.map(airplane => (
              <tr key={airplane.id}>
                <Td>{airplane.registration_number}</Td>
                <Td>{airplane.model}</Td>
                <Td>{airplane.manufacturer}</Td>
                <Td>{airplane.capacity}</Td>
                <Td>
                  <span style={{
                    color: airplane.status === 'active' ? '#10B981' :
                      airplane.status === 'maintenance' ? '#F59E0B' : '#EF4444'
                  }}>
                    {airplane.status.charAt(0).toUpperCase() + airplane.status.slice(1)}
                  </span>
                </Td>
                <Td>{airplane.manufacture_year}</Td>
                <Td>
                  <Actions>
                    <Button onClick={() => handleEdit(airplane)}>
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(airplane.id)}>
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
              {editingAirplane ? 'Edit Airplane' : 'Add New Airplane'}
            </h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Registration Number</Label>
                <Input
                  type="text"
                  name="registration_number"
                  value={formData.registration_number}
                  onChange={handleChange}
                  placeholder="e.g., N12345"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Model</Label>
                <Input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g., Boeing 737-800"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Manufacturer</Label>
                <Input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  placeholder="e.g., Boeing"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Capacity</Label>
                <Input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="retired">Retired</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Manufacture Year</Label>
                <Input
                  type="number"
                  name="manufacture_year"
                  value={formData.manufacture_year}
                  onChange={handleChange}
                  min="1970"
                  max={new Date().getFullYear()}
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
                  {editingAirplane ? 'Update' : 'Add'} Airplane
                </Button>
              </ModalButtons>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AirplaneManager;