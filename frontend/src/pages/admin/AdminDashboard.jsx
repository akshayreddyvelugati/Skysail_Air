import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LayoutGrid, Plane, Building2, Users, Calendar, Ticket, LogOut } from 'lucide-react';
import DashboardHome from './DashboardHome';
import AirportManager from './AirportManager';
import AirplaneManager from './AirplaneManager';
import FlightScheduleManager from './FlightScheduleManager';
import CrewManager from './CrewManager';
import PassengerManager from './PassengerManager';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.gray[50]};
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: ${props => props.theme.colors.primary};
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 80px;
    padding: 2rem 0.5rem;
  }
`;

const Logo = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
    span {
      display: none;
    }
  }
`;

const NavItem = styled.button`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
    padding: 0.75rem;
    span {
      display: none;
    }
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Header = styled.header`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.gray[500]};
  font-size: 1.125rem;
`;

const LogoutButton = styled(NavItem)`
  margin-top: auto;
  color: rgba(255, 255, 255, 0.7);
`;

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth state/tokens here
    navigate('/admin');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'airports':
        return <AirportManager />;
      case 'airplanes':
        return <AirplaneManager />;
      case 'flights':
        return <FlightScheduleManager />;
      case 'crew':
        return <CrewManager />;
      case 'passengers':
        return <PassengerManager />;
      default:
        return <DashboardHome />;
    }
  };

  const getTitle = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Dashboard';
      case 'airports':
        return 'Airport Management';
      case 'airplanes':
        return 'Airplane Management';
      case 'flights':
        return 'Flight Schedule Management';
      case 'crew':
        return 'Crew Management';
      case 'passengers':
        return 'Passenger Management';
      default:
        return 'Dashboard';
    }
  };

  return (
    <Container>
      <Sidebar>
        <Logo>
          <Plane size={24} />
          <span>SkySail Admin</span>
        </Logo>

        <NavItem
          active={activeSection === 'dashboard'}
          onClick={() => setActiveSection('dashboard')}
        >
          <LayoutGrid size={20} />
          <span>Dashboard</span>
        </NavItem>

        <NavItem
          active={activeSection === 'airports'}
          onClick={() => setActiveSection('airports')}
        >
          <Building2 size={20} />
          <span>Airports</span>
        </NavItem>

        <NavItem
          active={activeSection === 'airplanes'}
          onClick={() => setActiveSection('airplanes')}
        >
          <Plane size={20} />
          <span>Airplanes</span>
        </NavItem>

        <NavItem
          active={activeSection === 'flights'}
          onClick={() => setActiveSection('flights')}
        >
          <Calendar size={20} />
          <span>Flights</span>
        </NavItem>

        <NavItem
          active={activeSection === 'crew'}
          onClick={() => setActiveSection('crew')}
        >
          <Users size={20} />
          <span>Crew</span>
        </NavItem>

        <NavItem
          active={activeSection === 'passengers'}
          onClick={() => setActiveSection('passengers')}
        >
          <Ticket size={20} />
          <span>Passengers</span>
        </NavItem>

        <LogoutButton onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </LogoutButton>
      </Sidebar>

      <Main>
        <Header>
          <Title>{getTitle()}</Title>
          <Subtitle>Welcome to the Air Travel Management System</Subtitle>
        </Header>

        {renderSection()}
      </Main>
    </Container>
  );
};

export default AdminDashboard;