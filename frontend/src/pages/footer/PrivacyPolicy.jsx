import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background || '#f9fafb'};
`;

const ContentWrapper = styled.main`
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
  flex: 1;
  @media (max-width: 768px) {
    margin: 1.5rem auto;
    padding: 0 0.75rem;
  }
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary || "'Poppins', sans-serif"};
  color: ${({ theme }) => theme.colors.navyBlue || '#1A365D'};
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.primary || "'Poppins', sans-serif"};
  color: ${({ theme }) => theme.colors.navyBlue || '#1A365D'};
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const PageText = styled.p`
  font-family: ${({ theme }) => theme.fonts.secondary || "'Open Sans', sans-serif"};
  color: ${({ theme }) => theme.colors.darkGrey || '#4B5563'};
  line-height: 1.6;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: justify;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ListItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.secondary || "'Open Sans', sans-serif"};
  color: ${({ theme }) => theme.colors.darkGrey || '#4B5563'};
  line-height: 1.6;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledList = styled.ul`
  margin-bottom: 1rem;
  padding-left: 1.5rem;
`;

const EmailLink = styled.a`
  color: ${({ theme }) => theme.colors.navyBlue || '#1A365D'};
  text-decoration: underline;
  &:hover {
    color: ${({ theme }) => theme.colors.primary || '#2563EB'};
    text-decoration: none;
  }
`;

function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Skysail Airlines</title>
        <meta
          name="description"
          content="Skysail Privacy Policy. Learn how we collect, use, and protect your personal information when you use our services."
        />
      </Helmet>
      <PageWrapper>
        <ContentWrapper role="main">
          <PageTitle>Privacy Policy</PageTitle>
          <PageText>
            Your privacy is paramount at Skysail. We are committed to safeguarding your personal information and comply with data protection regulations. This Privacy Policy outlines how we collect, use, store, and protect your personal information when you use our services. By using our website, you agree to the terms outlined in this policy.
          </PageText>

          <SectionTitle>1. Information We Collect</SectionTitle>
          <PageText>
            We collect information to provide better services to our customers and improve your travel experience. This information may include:
          </PageText>
          <StyledList>
            <ListItem><strong>Personal Identification Information:</strong> Name, date of birth, gender, passport details, nationality, and contact information including email address, postal address, and phone number.</ListItem>
            <ListItem><strong>Booking Information:</strong> Flight details, seating preferences, meal requirements, and special assistance needs.</ListItem>
            <ListItem><strong>Account Information:</strong> Login credentials, account settings, and loyalty program details for Skysail frequent flyers.</ListItem>
          </StyledList>

          <SectionTitle>2. How We Use Your Information</SectionTitle>
          <PageText>
            Your information is used for the following purposes:
          </PageText>
          <StyledList>
            <ListItem>Processing and managing your bookings, including check-in services and flight updates.</ListItem>
            <ListItem>Communicating with you about your travel arrangements, service changes, or disruptions.</ListItem>
            <ListItem>Personalizing your experience with tailored offerings and recommendations.</ListItem>
            <ListItem>Administering our loyalty program and providing associated benefits.</ListItem>
            <ListItem>Complying with legal requirements, such as immigration and security regulations.</ListItem>
            <ListItem>Analyzing and improving our services, website functionality, and overall customer experience.</ListItem>
            <ListItem>Detecting and preventing fraud or unauthorized access to our systems.</ListItem>
          </StyledList>

          <SectionTitle>3. Information Sharing and Disclosure</SectionTitle>
          <PageText>
            We may share your information with:
          </PageText>
          <StyledList>
            <ListItem><strong>Service Providers:</strong> Third parties that perform functions on our behalf, such as payment processing, data analysis, and customer service.</ListItem>
            <ListItem><strong>Partner Airlines:</strong> When your itinerary involves travel on multiple airlines, we share necessary information to provide seamless service.</ListItem>
            <ListItem><strong>Government Authorities:</strong> To comply with legal requirements, court orders, or applicable laws and regulations.</ListItem>
            <ListItem><strong>Airport Operators:</strong> To facilitate your journey through airports and provide appropriate services.</ListItem>
          </StyledList>
          <PageText>
            We do not sell your personal information to third parties for marketing purposes.
          </PageText>

          <SectionTitle>4. Data Security</SectionTitle>
          <PageText>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security assessments. While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </PageText>

          <SectionTitle>5. Your Rights and Choices</SectionTitle>
          <PageText>
            Depending on your location, you may have various rights regarding your personal information, including:
          </PageText>
          <StyledList>
            <ListItem>Accessing and reviewing the personal information we hold about you.</ListItem>
            <ListItem>Correcting inaccurate or incomplete information.</ListItem>
            <ListItem>Requesting deletion of your personal information under certain circumstances.</ListItem>
            <ListItem>Opting out of marketing communications.</ListItem>
            <ListItem>Withdrawing consent for certain data processing activities.</ListItem>
          </StyledList>
          <PageText>
            To exercise these rights, please contact our Privacy Team using the contact information provided below.
          </PageText>

          <SectionTitle>6. Contact Information</SectionTitle>
          <PageText>
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Privacy Team at <EmailLink href="mailto:privacy@skysail.com">privacy@skysail.com</EmailLink>.
          </PageText>

          <SectionTitle>7. Policy Updates</SectionTitle>
          <PageText>
            We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes through our website or other communication channels. We encourage you to review this policy regularly to stay informed about how we protect your information.
          </PageText>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}

export default PrivacyPolicy;