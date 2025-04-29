import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Wifi, Armchair, Utensils, Globe, Star, Phone } from 'lucide-react';

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 85vh;
  background: 
    url('src/images/fight.jpeg') right center / cover no-repeat;
  padding: 0 5%;
  color: #ffffff;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
  }
`;

const HeroContent = styled.div`
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #e0e0e0;
`;

const CTAButton = styled(Link)`
  background-color: #ffffff;
  color: #000;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background-color: #ddd;
  }
`;

const Section = styled.section`
  padding: 4rem 2rem;
  background: ${props => props.bgColor || props.theme.colors.white};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.5rem; /* Reduced margin for subtitle */
  color: ${props => props.theme.colors.primary};
`;

const DestinationsSubtitle = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const DestinationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px; 
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  }
`;

const DestinationCard = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px); /* Re-added hover effect */
  }
`;

const CardImage = styled.div`
  height: 200px;
  background: url(${props => props.image}) center/cover;
`;

const CardContent = styled.div`
  padding: 1rem;
  background: ${props => props.theme.colors.white};
  text-align: center;
  flex-grow: 1; /* Allows content to take up available space */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Space out content vertically */
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const CardTagline = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.gray};
  font-style: italic;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 1rem;
  flex-grow: 1; 
`;

const CardButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem; 
`;

const PriceText = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.secondary || props.theme.colors.primary};
  font-weight: 600;
`;

const CardButton = styled(Link)`
  display: inline-block;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: ${props => props.theme.colors.lightGray};
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
  display: flex; /* Add this */
  justify-content: center; /* Add this */
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.gray};
`;

const Home = () => {
  const destinationsWithPrices = [
    {
      name: 'Delhi, India',
      tagline: 'Where History Meets Modernity',
      description: 'The vibrant capital awaits with ancient forts and bustling markets.',
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/india-gate-delhi-1-attr-hero?qlt=82&ts=1727351922349',
      startingPrice: 179,
    },
    {
      name: 'Mumbai, India',
      tagline: 'The City of Dreams',
      description: 'Discover a city that blends dreams, ambition, and the beauty of the Arabian Sea.',
      image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/74/c8/3a.jpg',
      startingPrice: 189,
    },
    {
      name: 'Hyderabad, India',
      tagline: 'Pearl of the Deccan',
      description: 'Where historic charm meets a thriving modern tech scene. Discover grand architecture and rich culinary delights.',
      image: 'https://media.istockphoto.com/id/1804234753/video/this-hyperlapse-shows-indian-city-which-connects-the-historic-city-with-the-modern-tech-city.jpg?s=640x640&k=20&c=FclvwhbtvHQEOR9eciAy-96jj-KdP89ClqZlSHaUPQQ=',
      startingPrice: 159,
    },
    {
      name: 'Paris, France',
      tagline: 'The City of Light',
      description: 'The City of Light awaits with iconic landmarks and romantic ambiance.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80',
      startingPrice: 750,
    },
    {
      name: 'Dubai, UAE',
      tagline: 'Oasis of Luxury',
      description: 'A futuristic desert jewel offering world-class shopping and innovation.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
      startingPrice: 699,
    },
    {
      name: 'Sydney, Australia',
      tagline: 'Harbor of Wonders',
      description: 'Stunning beaches, iconic landmarks, and a modern, cosmopolitan culture.',
      image: 'https://delivery-cqucontenthub.stylelabs.cloud/api/public/content/Sydney-Opera-House-and-Harbour-Bridge-open-graph.jpg?v=c5bbd0f5',
      startingPrice: 900,
    },
  ];

  const features = [
    {
      title: 'Wi-Fi',
      description: 'Stay connected with complimentary high speed internet access on all flights.',
      icon: <Wifi size={40} />,
    },
    {
      title: 'Lounge Access',
      description: 'Relax before your flight in our luxury lounges with complimentary refreshments and amenities.',
      icon: <Armchair size={40} />,
    },
    {
      title: 'Food',
      description: 'Experience fine dining at 30,000 feet with our chef-curated menus.',
      icon: <Utensils size={40} />,
    },
    {
      title: 'Global Network',
      description: 'Fly to over 100 destinations worldwide with convenient connections.',
      icon: <Globe size={40} />,
    },
    {
      title: 'Loyalty Rewards',
      description: 'Earn points with every flight and redeem for tickets, upgrades, and more.',
      icon: <Star size={40} />,
    },
    {
      title: '24/7 Support',
      description: 'Get round-the-clock support from our dedicated team, ensuring a smooth and stress-free travel experience.',
      icon: <Phone size={40} />,
    },
  ];

  return (
    <div>
      <HeroSection>
        <HeroContent>
          <Title>Luxury Woven into Every Mile</Title>
          <Subtitle>
            Canvas of Clouds, Crafted in Comfort.<br></br>
            Experience seamless travel with SkySail! 
          </Subtitle>
          <CTAButton to="/search">
            Book Your Flight now
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>Popular Destinations</SectionTitle>
        <DestinationsSubtitle>
         Explore our most sought-after destinations with exclusive deals and premium flight options.
        </DestinationsSubtitle>
        <DestinationsGrid>
          {destinationsWithPrices.map((dest, index) => (
            <DestinationCard key={index}>
              <CardImage image={dest.image} />
              <CardContent>
                <CardTitle>{dest.name}</CardTitle>
                <CardTagline>{dest.tagline}</CardTagline>
                <CardDescription>{dest.description}</CardDescription>
                <CardButtonContainer>
                  <PriceText>Starting from ${dest.startingPrice}</PriceText>
                  <CardButton to="/search">Explore Flights</CardButton>
                </CardButtonContainer>
              </CardContent>
            </DestinationCard>
          ))}
        </DestinationsGrid>
      </Section>

      <Section bgColor="#f8f9fa">
        <SectionTitle>Why Choose SkySail?</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Section>
    </div>
  );
};

export default Home;