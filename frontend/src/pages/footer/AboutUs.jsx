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
    font-size: 1.75rem; /* Adjusted from 2rem */
    margin-bottom: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.primary || "'Poppins', sans-serif"};
  color: ${({ theme }) => theme.colors.navyBlue || '#1A365D'};
  font-size: 1.5rem; /* Reduced from 1.8rem */
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

function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About Us | Skysail Airlines</title>
        <meta
          name="description"
          content="Discover Skysail Airlines, redefining luxury air travel with innovative technology and personalized care."
        />
      </Helmet>
      <PageWrapper>
        <ContentWrapper role="main">
          <PageTitle>Elevating Your Journey</PageTitle>
          <PageText>
            Welcome aboard Skysail, where our commitment to air travel excellence takes flight. We embarked on a journey driven by a singular vision: to redefine Luxury Air travel. We're not just connecting destinations; we're crafting exceptional travel experiences.
          </PageText>

          <SectionTitle>Our Story: Born from a Vision of Elevated Travel</SectionTitle>
          <PageText>
            Skysail was born from a desire to elevate the very essence of air travel. Our passion for unparalleled service is woven into the fabric of everything we do, from the meticulous design of our cabins to the thoughtful training of our dedicated team.
          </PageText>

          <SectionTitle>Our Mission: Your Seamless and Memorable Journey</SectionTitle>
          <PageText>
            At Skysail, our mission is clear: to ensure every passenger enjoys a seamless and truly memorable journey, from the initial excitement of booking to the satisfying moment of arrival. We understand that travel is more than just getting from point A to point B; it's about the experiences created along the way. That's why we're dedicated to providing a travel experience that is both efficient and enjoyable.
          </PageText>

          <SectionTitle>Connecting the World: Our Expanding Horizons</SectionTitle>
          <PageText>
            With a rapidly growing global network that already spans over 100 destinations, Skysail is bringing the world closer. We carefully select our routes to offer both popular hubs and unique locales, providing our passengers with a diverse range of travel possibilities. Our commitment to expansion is driven by a desire to connect people and cultures across the globe.
          </PageText>

          <SectionTitle>Innovation in the Skies: Comfort and Sustainability</SectionTitle>
          <PageText>
            We believe that modern air travel should be synonymous with comfort and responsibility. That's why we invest in innovative in-flight amenities designed to enhance your journey, from advanced entertainment systems to thoughtfully curated dining options. Furthermore, we are deeply committed to sustainable practices, continuously exploring and implementing eco-friendly solutions to minimize our environmental footprint.
          </PageText>

          <SectionTitle>The Skysail Family: Rewarding Your Loyalty</SectionTitle>
          <PageText>
            We deeply value our frequent flyers and believe in recognizing their continued trust in Skysail Airlines. Our loyalty program is designed to reward you with exclusive benefits, making your future journeys even more rewarding. Join the Skysail family and experience the perks of belonging to a community that appreciates your patronage.
          </PageText>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}

export default AboutUs;