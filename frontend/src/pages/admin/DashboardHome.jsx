import React from 'react';
import styled from 'styled-components';
import { Building2, Plane, Calendar, Users, Ticket } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.theme.colors.primary}10;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.gray[500]};
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.gray[900]};
`;

const DashboardHome = () => {
  return (
    <Container>
      <StatsGrid>
        <StatCard>
          <StatIcon>
            <Building2 size={20} />
          </StatIcon>
          <StatLabel>Total Airports</StatLabel>
          <StatValue>87</StatValue>
        </StatCard>

        <StatCard>
          <StatIcon>
            <Plane size={20} />
          </StatIcon>
          <StatLabel>Airplanes</StatLabel>
          <StatValue>245</StatValue>
        </StatCard>

        <StatCard>
          <StatIcon>
            <Calendar size={20} />
          </StatIcon>
          <StatLabel>Flights Today</StatLabel>
          <StatValue>126</StatValue>
        </StatCard>

        <StatCard>
          <StatIcon>
            <Users size={20} />
          </StatIcon>
          <StatLabel>Crew Members</StatLabel>
          <StatValue>842</StatValue>
        </StatCard>

        <StatCard>
          <StatIcon>
            <Ticket size={20} />
          </StatIcon>
          <StatLabel>Tickets Sold</StatLabel>
          <StatValue>3,678</StatValue>
        </StatCard>
      </StatsGrid>
    </Container>
  );
};

export default DashboardHome;