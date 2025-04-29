import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.navyBlue || '#1A365D'};
  color: ${({ theme }) => theme.colors.white || '#ffffff'};
  padding: 2rem 0;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 1;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    text-align: left;
  }
`;

const FooterSection = styled.div`
  flex: 1;
`;

const FooterTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.primary || "'Poppins', sans-serif"};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.white || '#ffffff'};
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
`;

const FooterLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled.a`
  color: #bfdbfe;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.secondary || "'Open Sans', sans-serif"};
  font-size: 1.1rem;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white || '#ffffff'};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.colors.white || '#ffffff'};
  font-size: 2rem;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: #bfdbfe;
    transform: translateY(-5px);
  }
`;

const CopyrightText = styled.p`
  font-family: ${({ theme }) => theme.fonts.secondary || "'Open Sans', sans-serif"};
  font-size: 0.8rem;
  color: #d1d5db;
  margin-top: 1.5rem;
`;

const socialLinks = [
  { platform: 'Facebook', url: 'https://facebook.com/skysailairlines', icon: <FaFacebook /> },
  { platform: 'Twitter', url: 'https://twitter.com/skysailairlines', icon: <FaTwitter /> },
  { platform: 'Instagram', url: 'https://instagram.com/skysailairlines', icon: <FaInstagram /> },
];

function Footer() {
  const navigate = useNavigate();
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const handleNavigate = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Skysail</FooterTitle>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
            Elevating your journey with premium travel experiences.
          </p>
          <SocialLinks>
            {socialLinks.map(({ platform, url, icon }) => (
              <SocialIcon
                key={platform}
                href={url}
                aria-label={platform}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </SocialIcon>
            ))}
          </SocialLinks>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLinks>
            <FooterLink
              href="/"
              onClick={handleNavigate('/')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate('/')(e)}
            >
              Home
            </FooterLink>
            <FooterLink
              href="/search"
              onClick={handleNavigate('/search')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate('/search')(e)}
            >
              Flights
            </FooterLink>
            <FooterLink
              href="/contact"
              onClick={handleNavigate('/contact')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate('/contact')(e)}
            >
              Contact
            </FooterLink>
          </FooterLinks>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Support</FooterTitle>
          <FooterLinks>
            <FooterLink
              href="/about-us"
              onClick={handleNavigate('/about-us')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate('/about-us')(e)}
            >
              About Us
            </FooterLink>
            <FooterLink
              href="/baggage-allowance"
              onClick={handleNavigate('/baggage-allowance')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate('/baggage-allowance')(e)}
            >
              Baggage Allowance
            </FooterLink>
            <FooterLink
              href="/terms-and-conditions"
              onClick={handleNavigate('/terms-and-conditions')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate('/terms-and-conditions')(e)}
            >
              Terms and Conditions
            </FooterLink>
            <FooterLink
              href="/privacy-policy"
              onClick={handleNavigate('/privacy-policy')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate('/privacy-policy')(e)}
            >
              Privacy Policy
            </FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>
      <CopyrightText>© {currentYear} Skysail Airways. All rights reserved.</CopyrightText>
    </FooterWrapper>
  );
}

export default Footer;