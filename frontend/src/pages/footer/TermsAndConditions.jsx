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
  text-align: justify; /* Added to make text "sentence fit" */
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

function TermsAndConditions() {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | Skysail Airlines</title>
        <meta
          name="description"
          content="Terms and Conditions of Carriage for Skysail Airlines. Review our booking policies, cancellation procedures, and passenger responsibilities."
        />
      </Helmet>
      <PageWrapper>
        <ContentWrapper role="main">
          <PageTitle>Terms and Conditions of Carriage</PageTitle>
          <PageText>
            By purchasing a ticket or utilizing the services of Skysail Airlines, you acknowledge and agree to be bound by the following Terms and Conditions. Please read them carefully.
          </PageText>

          <SectionTitle>1. Booking and Ticket Purchase:</SectionTitle>
          <StyledList>
            <ListItem>All flight bookings are subject to seat availability at the time of reservation.</ListItem>
            <ListItem>Fares are governed by specific fare rules, which may include restrictions and conditions. Please review these rules before completing your purchase.</ListItem>
            <ListItem>All travel is subject to applicable government regulations and airport authority rules.</ListItem>
            <ListItem>Tickets issued by Skysail Airlines are non-transferable and can only be used by the passenger named on the ticket. Identification matching the name on the ticket may be required at various stages of your journey.</ListItem>
          </StyledList>

          <SectionTitle>2. Changes, Cancellations, and Refunds:</SectionTitle>
          <StyledList>
            <ListItem>Modifications to your booking, including date or time changes, and cancellations may be subject to fees depending on the fare type purchased. Please consult the specific fare rules associated with your ticket for details on applicable charges.</ListItem>
            <ListItem><strong>24-Hour Grace Period:</strong> For new bookings made directly with Skysail Airlines, a full refund may be available if the booking is cancelled within 24 hours of the original purchase, provided the departure date is at least 7 days away.</ListItem>
            <ListItem>Skysail Airlines reserves the right to alter flight schedules or cancel flights due to operational requirements, safety considerations, or unforeseen circumstances. These may include, but are not limited to, adverse weather conditions, technical issues, or security threats.</ListItem>
            <ListItem>In the event of a flight alteration or cancellation initiated by Skysail Airlines, we will strive to provide affected passengers with options such as rebooking on the next available flight or offering compensation in accordance with applicable laws and our company policy. Specific details regarding compensation will be communicated at the time of the disruption.</ListItem>
          </StyledList>

          <SectionTitle>3. Passenger Responsibilities:</SectionTitle>
          <StyledList>
            <ListItem><strong>Travel Documents:</strong> It is the sole responsibility of each passenger to ensure they possess valid and acceptable travel documents, including passports, visas, health certificates, and any other required documentation for their destination and any transit points. Skysail Airlines is not liable for any consequences arising from a passenger's failure to comply with these requirements.</ListItem>
            <ListItem><strong>Check-in Procedures:</strong> Passengers must adhere to the stipulated check-in deadlines:
              <StyledList>
                <ListItem><strong>Domestic Flights:</strong> Check-in must be completed at least 60 minutes prior to the scheduled departure time.</ListItem>
                <ListItem><strong>International Flights:</strong> Check-in must be completed at least 90 minutes prior to the scheduled departure time.</ListItem>
                <ListItem>Failure to meet these deadlines may result in denied boarding. Please refer to your booking confirmation for any specific check-in instructions or changes.</ListItem>
              </StyledList>
            </ListItem>
          </StyledList>

          <SectionTitle>4. Further Information:</SectionTitle>
          <PageText>
            For comprehensive details regarding your specific booking, including fare rules and baggage allowances, please refer to your booking confirmation email .
          </PageText>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}

export default TermsAndConditions;