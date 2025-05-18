import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Footer Wrapper with increased padding and min-height
const FooterWrapper = styled.footer`
  position: relative;
  padding: 4rem ; /* More padding for a larger footer */
  min-height: 220px;         /* Ensures footer is tall */
  text-align: relative ;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Ensures copyright is at the bottom */

  backdrop-filter: blur(18px);
  background-color: rgba(28, 28, 28, 0.5);
  border-radius: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2qIOmxQbOlESwIHbSDdd5psadd3G7Gu857A&s');
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    opacity: 0.6;
    z-index: 0;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  position: relative;
  z-index: 1;
  align-items: stretch;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    text-align: left;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  padding: 0 1.5rem;
  border-right: 5px solid rgba(255, 255, 255, 0.5); /* Thicker vertical line */
  &:last-child {
    border-right: none;
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const FooterTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.primary || "'Poppins', sans-serif"};
  font-size: 1.7rem;
  color: #ffffff;
  margin-bottom: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.05em;
`;

const FooterLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
`;

const FooterLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.secondary || "'Open Sans', sans-serif"};
  font-size: 1.2rem;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #bfdbfe;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.7rem;
  margin-top: 1.2rem;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const SocialIcon = styled.a`
  color: #ffffff;
  font-size: 2.2rem;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: #bfdbfe;
    transform: translateY(-5px);
  }
`;

const CopyrightText = styled.p`
  font-family: ${({ theme }) => theme.fonts.secondary || "'Open Sans', sans-serif"};
  font-size: 1rem;
  color: #ffffff;
  margin-top: 2.5rem;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
  text-align: center;
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
          <p style={{ fontSize: '1rem', marginBottom: '1.2rem', color: '#ffffff' }}>
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
      <CopyrightText>
        © {currentYear} Skysail Airways. All rights reserved.
      </CopyrightText>
    </FooterWrapper>
  );
}

export default Footer;