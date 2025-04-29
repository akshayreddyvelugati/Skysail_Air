import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, Edit2, Trash2, X, Check, Search, Users } from 'lucide-react';

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
const initialCrewMembers = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    position: 'Captain',
    employeeId: 'EMP001',
    email: 'john.smith@skysail.com',
    phone: '+1-555-0123',
    status: 'active',
    licenseNumber: 'CPT123456',
    experience: 15
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    position: 'Flight Attendant',
    employeeId: 'EMP002',
    email: 'sarah.johnson@skysail.com',
    phone: '+1-555-0124',
    status: 'active',
    experience: 5
  }
];

const positions = [
  'Captain',
  'First Officer',
  'Flight Engineer',
  'Flight Attendant',
  'Purser',
  'Ground Staff'
];

const CrewManager = () => {
  const [crewMembers, setCrewMembers] = useState(initialCrewMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCrewMember, setEditingCrewMember] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    employeeId: '',
    email: '',
    phone: '',
    status: 'active',
    licenseNumber: '',
    experience: 0
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCrewMembers = crewMembers.filter(crew => 
    crew.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crew.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crew.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingCrewMember(null);
    setFormData({
      firstName: '',
      lastName: '',
      position: '',
      employeeId: '',
      email: '',
      phone: '',
      status: 'active',
      licenseNumber: '',
      experience: 0
    });
    setIsModalOpen(true);
  };

  const handleEdit = (crewMember) => {
    setEditingCrewMember(crewMember);
    setFormData(crewMember);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this crew member?')) {
      setCrewMembers(crewMembers.filter(crew => crew.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCrewMember) {
      setCrewMembers(crewMembers.map(crew => 
        crew.id === editingCrewMember.id ? { ...formData, id: crew.id } : crew
      ));
    } else {
      const newCrewMember = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      setCrewMembers([...crewMembers, newCrewMember]);
    }
    
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experience' ? parseInt(value) : value
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
              placeholder="Search crew members..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBar>
          <Button variant="primary" onClick={handleAdd}>
            <Plus size={18} />
            Add Crew Member
          </Button>
        </Header>

        <Table>
          <thead>
            <tr>
              <Th>Employee ID</Th>
              <Th>Name</Th>
              <Th>Position</Th>
              <Th>Contact</Th>
              <Th>Status</Th>
              <Th>Experience</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredCrewMembers.map(crew => (
              <tr key={crew.id}>
                <Td>{crew.employeeId}</Td>
                <Td>{crew.firstName} {crew.lastName}</Td>
                <Td>{crew.position}</Td>
                <Td>
                  <div>{crew.email}</div>
                  <div className="text-sm text-gray-500">{crew.phone}</div>
                </Td>
                <Td>
                  <span style={{ 
                    color: crew.status === 'active' ? '#10B981' : 
                           crew.status === 'on-leave' ? '#F59E0B' : '#6366F1'
                  }}>
                    {crew.status.charAt(0).toUpperCase() + crew.status.slice(1)}
                  </span>
                </Td>
                <Td>{crew.experience} years</Td>
                <Td>
                  <Actions>
                    <Button onClick={() => handleEdit(crew)}>
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(crew.id)}>
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
              {editingCrewMember ? 'Edit Crew Member' : 'Add New Crew Member'}
            </h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Position</Label>
                <Select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select position</option>
                  {positions.map(pos => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Employee ID</Label>
                <Input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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
                  <option value="on-leave">On Leave</option>
                  <option value="training">Training</option>
                </Select>
              </FormGroup>
              {formData.position === 'Captain' || formData.position === 'First Officer' ? (
                <FormGroup>
                  <Label>License Number</Label>
                  <Input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              ) : null}
              <FormGroup>
                <Label>Experience (years)</Label>
                <Input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
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
                  {editingCrewMember ? 'Update' : 'Add'} Crew Member
                </Button>
              </ModalButtons>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CrewManager;