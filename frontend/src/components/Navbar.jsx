import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Plane, Menu, X } from 'lucide-react';

const Nav = styled.nav`
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%; /* Ensure the nav takes full width */
`;

const Container = styled.div`
  width: 100%; /* Full width of the parent */
  padding: 1rem 2rem; /* Adjusted padding for better spacing on all screens */
  display: flex;
  justify-content: space-between; /* Push logo and links to edges */
  align-items: center;
  box-sizing: border-box; /* Prevent padding from affecting width */

  /* Media query for smaller screens (like HP laptop) */
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1rem 1rem; /* Reduced padding for smaller screens */
  }

  /* Media query for larger screens (like MacBook) */
  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    padding: 1rem 3rem; /* More padding on larger screens */
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const NavLinks = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 4rem;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.white};
    backdrop-filter: blur(10px);
    background: ${props =>
      props.isOpen
        ? 'rgba(255, 255, 255, 0.9)'
        : props.theme.colors.white};
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateX(${props => (props.isOpen ? '0' : '-100%')});
    transition: transform 0.3s ease-in-out;
    z-index: 49;
  }
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    gap: 1rem; /* Reduced gap to accommodate the button better */
    align-items: center;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray[600]};
  font-weight: ${props => props.active ? '600' : '500'};
  transition: color 0.2s, transform 0.2s;
  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const AdminButton = styled(Link)`
  background-color: ${props => props.theme.colors.secondary}; /* Example button color */
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s, transform 0.2s;
  &:hover {
    background-color: ${props => props.theme.colors.secondary[700] || props.theme.colors.secondary}; /* Darker shade on hover */
    transform: translateY(-1px);
  }
`;

const MenuButton = styled.button`
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Nav>
      <Container>
        <Logo to="/">
          <Plane size={24} />
          SkySail
        </Logo>
        <MenuButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </MenuButton>
        <NavLinks isOpen={isOpen}>
          <NavLink to="/" active={isActive('/')}>Home</NavLink>
          <NavLink to="/search" active={isActive('/search')}>Flights</NavLink>
          <NavLink to="/contact" active={isActive('/contact')}>Contact</NavLink>
          <AdminButton to="/admin" active={isActive('/admin')}>Admin</AdminButton>
        </NavLinks>
      </Container>
    </Nav>
  );
};

export default Navbar;