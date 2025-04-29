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

const SubsectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.primary || "'Poppins', sans-serif"};
  color: ${({ theme }) => theme.colors.navyBlue || '#1A365D'};
  font-size: 1.25rem;
  margin: 1.5rem 0 0.75rem;
  @media (max-width: 768px) {
    font-size: 1.1rem;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-family: ${({ theme }) => theme.fonts.secondary || "'Open Sans', sans-serif"};
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.lightBlue || '#EBF4FF'};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.lightGrey || '#F3F4F6'};
  }
`;

const TableHeader = styled.th`
  padding: 0.75rem;
  font-weight: 600;
  text-align: left;
  color: ${({ theme }) => theme.colors.navyBlue || '#1A365D'};
  border: 1px solid ${({ theme }) => theme.colors.borderGrey || '#D1D5DB'};
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey || '#D1D5DB'};
`;

const IconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 1.5rem 0;
  gap: 1rem;
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const ProhibitedItemCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px;
  padding: 1rem;
  margin: 0.5rem;
  background-color: ${({ theme }) => theme.colors.lightGrey || '#F3F4F6'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  @media (max-width: 768px) {
    width: 120px;
    padding: 0.75rem;
  }
`;

const ProhibitedImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 0.75rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightRed || '#FEE2E2'};
  object-fit: contain;
  padding: 10px;
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    padding: 8px;
  }
`;

const ProhibitedText = styled.span`
  font-family: ${({ theme }) => theme.fonts.secondary || "'Open Sans', sans-serif"};
  font-size: 0.9rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkGrey || '#4B5563'};
`;

const EmailLink = styled.a`
  color: ${({ theme }) => theme.colors.primary || '#3B82F6'};
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`;

function BaggageAllowance() {
  return (
    <>
      <Helmet>
        <title>Baggage Allowance | Skysail Airlines</title>
        <meta
          name="description"
          content="Baggage policy and allowance information for Skysail Airlines passengers. Learn about carry-on limits, checked baggage allowances, and prohibited items."
        />
      </Helmet>
      <PageWrapper>
        <ContentWrapper role="main">
          <PageTitle>Baggage Allowance and Policies</PageTitle>
          <PageText>
            At Skysail, we strive to make your journey as smooth as possible. Understanding our baggage policies before you travel helps ensure a hassle-free experience. Below you'll find comprehensive information about our carry-on and checked baggage allowances, restrictions, and special handling procedures.
          </PageText>

          <SectionTitle>1. Carry-On Baggage</SectionTitle>
          <PageText>
            All passengers are entitled to bring carry-on baggage into the cabin, subject to size and weight restrictions. These items must fit in the overhead compartment or under the seat in front of you.
          </PageText>
          
          <SubsectionTitle>Standard Allowance</SubsectionTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Cabin Class</TableHeader>
                <TableHeader>Items Allowed</TableHeader>
                <TableHeader>Maximum Weight</TableHeader>
                <TableHeader>Maximum Dimensions</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              <TableRow>
                <TableCell>Economy</TableCell>
                <TableCell>1 bag + 1 personal item</TableCell>
                <TableCell>7 kg (15 lbs) per bag</TableCell>
                <TableCell>55 x 40 x 20 cm (22 x 16 x 8 in)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Premium Economy</TableCell>
                <TableCell>1 bag + 1 personal item</TableCell>
                <TableCell>10 kg (22 lbs) per bag</TableCell>
                <TableCell>55 x 40 x 20 cm (22 x 16 x 8 in)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Business</TableCell>
                <TableCell>2 bags + 1 personal item</TableCell>
                <TableCell>10 kg (22 lbs) per bag</TableCell>
                <TableCell>55 x 40 x 20 cm (22 x 16 x 8 in)</TableCell>
              </TableRow>
            </tbody>
          </Table>
          
          <PageText>
            Personal items include handbags, laptop bags, camera bags, or small backpacks that can fit under the seat in front of you, with dimensions not exceeding 40 x 30 x 15 cm (16 x 12 x 6 in).
          </PageText>

          <SectionTitle>2. Checked Baggage</SectionTitle>
          <PageText>
            Checked baggage allowances vary based on your fare type, cabin class, route, and loyalty program status. The following table outlines our standard allowances:
          </PageText>
          
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Cabin Class</TableHeader>
                <TableHeader>Route Type</TableHeader>
                <TableHeader> Allowance</TableHeader>
                <TableHeader>Maximum Weight Per Piece</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              <TableRow>
                <TableCell>Economy </TableCell>
                <TableCell>Domestic and International</TableCell>
                <TableCell>1 piece</TableCell>
                <TableCell>23 kg (50 lbs)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Premium Economy</TableCell>
                <TableCell>Domestic and International</TableCell>
                <TableCell>2 pieces</TableCell>
                <TableCell>23 kg (50 lbs)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Business</TableCell>
                <TableCell>Domestic and International</TableCell>
                <TableCell>2 pieces</TableCell>
                <TableCell>32 kg (70 lbs)</TableCell>
              </TableRow>
            </tbody>
          </Table>
          
          <PageText>
            Additional or overweight baggage may be accepted for an extra fee, subject to space availability.
          </PageText>

          <SectionTitle>3. Prohibited and Restricted Items</SectionTitle>
          <PageText>
            For safety and security reasons, certain items are prohibited or restricted in both carry-on and checked baggage. Please familiarize yourself with these regulations before packing to avoid inconvenience at security checkpoints.
          </PageText>

          <SubsectionTitle>Items Prohibited in Carry-On Baggage</SubsectionTitle>
          <PageText>
            The following items must be packed in checked baggage or left at home:
          </PageText>
          
          <IconsContainer>
            <ProhibitedItemCard>
              <ProhibitedImage src="https://www.shutterstock.com/image-vector/no-gun-knive-sharp-weapons-600nw-2487036303.jpg" alt="Weapons & Sharp Objects" />
              <ProhibitedText>Weapons & Sharp Objects</ProhibitedText>
            </ProhibitedItemCard>
            <ProhibitedItemCard>
              <ProhibitedImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTesUkUId31DIoQxVPZQgPdwb5WIlQN2_bPZw&s" alt="Flammable Items" />
              <ProhibitedText>Flammable Items</ProhibitedText>
            </ProhibitedItemCard>
            <ProhibitedItemCard>
              <ProhibitedImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJdVm-Wt_JGjL5bGg105YFEJIES-0gRIj1mg&s" alt="Toxic Substances" />
              <ProhibitedText>Toxic Substances</ProhibitedText>
            </ProhibitedItemCard>
          </IconsContainer>

          <SubsectionTitle>Items Prohibited in Both Carry-On and Checked Baggage</SubsectionTitle>
          <PageText>
            The following items are not permitted on aircraft under any circumstances:
          </PageText>
          
          <StyledList>
            <ListItem><strong>Explosives:</strong> Fireworks, flares, dynamite, blasting caps, replicas or imitations of explosive devices</ListItem>
            <ListItem><strong>Flammable Items:</strong> Gasoline, lighter fluid, matches, flammable paints, fire lighters, lighter refills</ListItem>
            <ListItem><strong>Toxic Substances:</strong> Poisons, infectious materials, radioactive materials, biological hazards</ListItem>
            <ListItem><strong>Corrosives:</strong> Acids, alkalis, wet-cell batteries, mercury, chlorine</ListItem>
            <ListItem><strong>Compressed Gases:</strong> Spray cans, butane, propane, scuba tanks, CO2 cartridges</ListItem>
            <ListItem><strong>Oxidizers and Organic Peroxides:</strong> Bleach, pool chemicals, fiberglass repair kits</ListItem>
          </StyledList>

          <SubsectionTitle>Special Instructions for Electronic Devices</SubsectionTitle>
          <PageText>
            Electronic devices with lithium batteries should be carried in your cabin baggage. If packed in checked baggage, they must be completely switched off (not in sleep mode), protected from accidental activation, and should not exceed the following limits:
          </PageText>
          <StyledList>
            <ListItem>For lithium metal batteries: 2 grams of lithium content</ListItem>
            <ListItem>For lithium ion batteries: 100 watt-hours (Wh) rating</ListItem>
          </StyledList>
          <PageText>
            Spare batteries, power banks, and e-cigarettes are strictly prohibited in checked baggage and must be carried in cabin baggage only.
          </PageText>

          <SectionTitle>4. Excess Baggage Fees</SectionTitle>
          <PageText>
            Baggage exceeding your free allowance in quantity, weight, or size will incur excess baggage fees. These fees vary by route and can be paid at the airport or pre-purchased at a discounted rate through our website or customer service center.
          </PageText>
          <PageText>
            We recommend pre-purchasing additional baggage allowance to secure the best rates and ensure space availability for your items.
          </PageText>

          <SectionTitle>5. Tips for a Smooth Baggage Experience</SectionTitle>
          <StyledList>
            <ListItem>Clearly label all baggage with your name, address, and contact information</ListItem>
            <ListItem>Remove old airline tags to prevent confusion</ListItem>
            <ListItem>Pack valuables, medications, and important documents in your carry-on</ListItem>
            <ListItem>Arrive at the airport early to allow sufficient time for baggage check-in</ListItem>
            <ListItem>Consider using our online check-in service to save time at the airport</ListItem>
          </StyledList>

          <PageText>
            For any specific questions regarding our baggage policy, please contact our customer service team at <EmailLink href="mailto:baggage@skysail.com">baggage@skysail.com</EmailLink> or call our 24/7 helpline at +1-800-555-1234.
          </PageText>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}

export default BaggageAllowance;