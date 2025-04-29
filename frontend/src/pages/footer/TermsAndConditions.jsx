import React, { useRef } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background || '#f9fafb'};
`;

const ContentWrapper = styled.main`
  max-width: 1000px;
  width: 100%;
  margin: 2rem auto;
  padding: 0 1.5rem;
  flex: 1;

  @media (max-width: 768px) {
    margin: 1rem auto;
    padding: 0 1rem;
  }
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary || "'Poppins', sans-serif"};
  color: ${({ theme }) => theme.colors.navyBlue || '#1A365D'};
  font-size: 2.25rem;
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
  margin: 1.5rem 0 1rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const SubsectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.primary || "'Poppins', sans-serif"};
  color: ${({ theme }) => theme.colors.navyBlue || '#1A365D'};
  font-size: 1.25rem;
  margin: 1.25rem 0 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const PageText = styled.p`
  font-family: ${({ theme }) => theme.fonts.secondary || "'Open Sans', sans-serif"};
  color: ${({ theme }) => theme.colors.darkGrey || '#4B5563'};
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const ListItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.secondary || "'Open Sans', sans-serif"};
  color: ${({ theme }) => theme.colors.darkGrey || '#4B5563'};
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const StyledList = styled.ul`
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
`;

const HeaderSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionNumber = styled.span`
  display: inline-block;
  margin-right: 0.75rem;
  min-width: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary || '#3182CE'};
`;

const ImportantNote = styled.div`
  background-color: ${({ theme }) => theme.colors.highlightBg || '#EBF8FF'};
  border-left: 4px solid ${({ theme }) => theme.colors.primary || '#3182CE'};
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 8px 8px 0;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const ImportantTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.primary || "'Poppins', sans-serif"};
  color: ${({ theme }) => theme.colors.primary || '#3182CE'};
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

function TermsAndConditions() {
  const topRef = useRef(null);

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
          <div ref={topRef} id="top"></div>
          <PageTitle>Terms and Conditions of Carriage</PageTitle>

          <HeaderSection>
            <PageText>
              By purchasing a ticket or utilizing the services of Skysail Airlines, you acknowledge and agree to be bound by the following Terms and Conditions. These terms constitute a legally binding contract between you and Skysail Airlines. Please read them carefully before completing your booking.
            </PageText>
          </HeaderSection>

          <section id="introduction" aria-labelledby="introduction-title">
            <SectionTitle id="introduction-title">Introduction</SectionTitle>
            <PageText>
              These Terms and Conditions of Carriage form the basis upon which Skysail Airlines carries passengers and their baggage, or provides other services. By making a reservation or accepting transportation on Skysail Airlines, you enter into a contract of carriage with us, and you accept these Terms and Conditions.
            </PageText>
            <PageText>
              All Skysail Airlines flights are operated in compliance with applicable national and international laws and regulations. These Terms and Conditions may be modified or updated from time to time, and the version in effect at the time of your booking will apply to your journey.
            </PageText>
          </section>

          <section id="booking" aria-labelledby="booking-title">
            <SectionTitle id="booking-title"><SectionNumber>1.</SectionNumber>Booking and Ticket Purchase</SectionTitle>
            <StyledList>
              <ListItem>All flight bookings are subject to seat availability at the time of reservation and confirmation of payment.</ListItem>
              <ListItem>Fares are governed by specific fare rules, which may include restrictions and conditions. Please review these rules before completing your purchase.</ListItem>
              <ListItem>All travel is subject to applicable government regulations, security directives, and airport authority rules.</ListItem>
              <ListItem>Tickets issued by Skysail Airlines are non-transferable and can only be used by the passenger named on the ticket. Valid identification matching the name on the ticket will be required at check-in, security screening, and boarding.</ListItem>
              <ListItem>Promotional fares may have additional restrictions, blackout dates, or limited availability. These will be clearly outlined at the time of booking.</ListItem>
            </StyledList>

            <ImportantNote>
              <ImportantTitle>Important:</ImportantTitle>
              <PageText style={{ margin: 0 }}>
                Please verify all details of your booking before confirming payment. While we strive to correct errors promptly, Skysail Airlines reserves the right to cancel bookings made with obvious errors in fares (such as those resulting from technical glitches or human error).
              </PageText>
            </ImportantNote>
          </section>

          <section id="changes" aria-labelledby="changes-title">
            <SectionTitle id="changes-title"><SectionNumber>2.</SectionNumber>Changes and Refunds</SectionTitle>
            <StyledList>
              <ListItem>Modifications to your booking, including date or time changes, and cancellations may be subject to fees depending on the fare type purchased. Please consult the specific fare rules associated with your ticket for details on applicable charges.</ListItem>
              <ListItem>Skysail Airlines reserves the right to alter flight schedules or cancel flights due to operational requirements, safety considerations, or unforeseen circumstances. These may include, but are not limited to, adverse weather conditions, technical issues, security threats, or air traffic constraints.</ListItem>
              <ListItem>In the event of a flight alteration or cancellation initiated by Skysail Airlines, we will strive to:
                <StyledList>
                  <ListItem>Notify affected passengers as soon as possible via their provided contact information</ListItem>
                  <ListItem>Offer rebooking on the next available flight at no additional cost</ListItem>
                  <ListItem>Provide vouchers for meals, accommodation, or ground transportation when appropriate</ListItem>
                  <ListItem>Offer a full refund if no suitable alternative transportation can be arranged</ListItem>
                  <ListItem>Provide compensation in accordance with applicable laws and our company policy</ListItem>
                </StyledList>
              </ListItem>
            </StyledList>

            <SubsectionTitle>Compensation Policy</SubsectionTitle>
            <PageText>
              Compensation for flight disruptions is determined based on the nature of the disruption, the length of the delay, and the applicable aviation regulations in your jurisdiction. Specific details regarding compensation will be communicated at the time of the disruption.
            </PageText>
            <PageText>
              Skysail Airlines is not liable for delays or cancellations caused by factors beyond our control, including but not limited to: weather conditions, air traffic control restrictions, security alerts, strikes, etc. In such cases, we will make every effort to assist passengers in rebooking or providing alternative transportation, but we cannot guarantee specific outcomes.
            </PageText>
          </section>

          <section id="passenger" aria-labelledby="passenger-title">
            <SectionTitle id="passenger-title"><SectionNumber>3.</SectionNumber>Passenger Responsibilities</SectionTitle>
            <SubsectionTitle>Travel Documents</SubsectionTitle>
            <PageText>
              It is the sole responsibility of each passenger to ensure they possess valid and acceptable travel documents, including passports, visas, health certificates, and any other required documentation for their destination and any transit points. Skysail Airlines is not liable for any consequences arising from a passenger's failure to comply with these requirements.
            </PageText>

            <SubsectionTitle>Check-in Procedures</SubsectionTitle>
            <PageText>
              Passengers must adhere to the stipulated check-in deadlines:
            </PageText>
            <StyledList>
              <ListItem><strong>Domestic Flights:</strong> Check-in must be completed at least 60 minutes prior to the scheduled departure time.</ListItem>
              <ListItem><strong>International Flights:</strong> Check-in must be completed at least 90 minutes prior to the scheduled departure time.</ListItem>
              <ListItem>Boarding gates close 30 minutes before departure for all flights.</ListItem>
              <ListItem>Failure to meet these deadlines may result in denied boarding with no refund entitlement.</ListItem>
            </StyledList>

            <SubsectionTitle>Conduct During Travel</SubsectionTitle>
            <PageText>
              Passengers are expected to conduct themselves in a manner that does not compromise the safety, comfort, or enjoyment of other passengers or the operation of the flight. Skysail Airlines reserves the right to refuse carriage or discontinue carriage of any passenger whose behavior is disruptive, threatening, or otherwise inappropriate, without liability for refund or compensation.
            </PageText>

            <ImportantNote>
              <ImportantTitle>Special Assistance:</ImportantTitle>
              <PageText style={{ margin: 0 }}>
                Passengers requiring special assistance, including those with reduced mobility, medical conditions, or traveling with infants, should notify Skysail Airlines at least 48 hours prior to their scheduled departure to ensure appropriate arrangements can be made.
              </PageText>
            </ImportantNote>
          </section>

          <section id="further" aria-labelledby="further-title">
            <SectionTitle id="further-title"><SectionNumber>4.</SectionNumber>Further Information</SectionTitle>
            <PageText>
              For comprehensive details regarding your specific booking, including fare rules and baggage allowances, please refer to your booking confirmation email.
            </PageText>
            <PageText>
              These Terms and Conditions may be updated periodically. The version in effect at the time of your booking will apply to your journey. We encourage you to review them prior to each booking.
            </PageText>
            <PageText>
              If you have any questions or require clarification on any aspect of these Terms and Conditions, please contact our customer service team via <a href="mailto:support@skysailairlines.com">mail to: support@skysailairlines.com</a> or call our 24/7 customer service line at +1-800-SKY-SAIL.
            </PageText>
          </section>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}

export default TermsAndConditions;