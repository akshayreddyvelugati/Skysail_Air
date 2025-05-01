import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: ${props => props.theme.colors.gray[500]};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: ${props => props.theme.colors.error || 'red'};
`;

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalAirports: 0,
    totalAirplanes: 0,
    totalFlights: 0, // Changed from flightsToday to totalFlights
    crewMembers: 0,
    ticketsSold: 3678, // Static default value
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch Airports
        const airportsResponse = await axios.get('http://localhost:5000/api/airports');
        const totalAirports = airportsResponse.data.length;

        // Fetch Airplanes
        const airplanesResponse = await axios.get('http://localhost:5000/api/airplanes');
        const totalAirplanes = airplanesResponse.data.length;

        // Fetch Total Flights (no date filter)
        const flightsResponse = await axios.get('http://localhost:5000/api/flights');
        const totalFlights = flightsResponse.data.length;

        // Fetch Crew Members
        const crewResponse = await axios.get('http://localhost:5000/api/crew-members');
        const crewMembers = crewResponse.data.length;

        // Update state with fetched data
        setStats({
          totalAirports,
          totalAirplanes,
          totalFlights, // Updated to totalFlights
          crewMembers,
          ticketsSold: 3678, // Static value
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Loading statistics...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <StatsGrid>
        <StatCard>
          <StatIcon>
            <Building2 size={20} />
          </StatIcon>
          <StatLabel>Total Airports</StatLabel>
          <StatValue>{stats.totalAirports}</StatValue>
        </StatCard>

        <StatCard>
          <StatIcon>
            <Plane size={20} />
          </StatIcon>
          <StatLabel>Airplanes</StatLabel>
          <StatValue>{stats.totalAirplanes}</StatValue>
        </StatCard>

        <StatCard>
          <StatIcon>
            <Calendar size={20} />
          </StatIcon>
          <StatLabel>Total Flights</StatLabel>
          <StatValue>{stats.totalFlights}</StatValue>
        </StatCard>

        <StatCard>
          <StatIcon>
            <Users size={20} />
          </StatIcon>
          <StatLabel>Crew Members</StatLabel>
          <StatValue>{stats.crewMembers}</StatValue>
        </StatCard>

        <StatCard>
          <StatIcon>
            <Ticket size={20} />
          </StatIcon>
          <StatLabel>Tickets Sold</StatLabel>
          <StatValue>{stats.ticketsSold}</StatValue>
        </StatCard>
      </StatsGrid>
    </Container>
  );
};

export default DashboardHome;