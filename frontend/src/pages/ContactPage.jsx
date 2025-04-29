import React, { useState } from 'react';
import styled from 'styled-components';
import { Phone, Mail, MapPin, Send, ChevronDown } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: ${props => props.theme.shadows.md};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.gray[700]};
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.gray[900]};
`;

const Value = styled.span`
  color: ${props => props.theme.colors.gray[600]};
`;

const MapContainer = styled.div`
  margin-top: 1.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 300px;
  border: none;
`;

const ContactForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: ${props => props.theme.shadows.md};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary}20;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  box-sizing: border-box;
  background: white;
  color: ${props => props.theme.colors.gray[600]};
  height: 48px;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary}20;
  }
`;

const Option = styled.option`
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  box-sizing: border-box;
  min-height: 250px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary}20;
  }
`;

const Button = styled.button`
  background: ${props => props.theme.gradients.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
  &:disabled {
    background: ${props => props.theme.colors.gray[400]};
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  color: ${props => props.theme.colors.success};
  background: ${props => props.theme.colors.success}10;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  text-align: center;
`;

const FAQSection = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  text-align: left;
`;

const FAQTitle = styled.h1`
  color: #1e3a8a;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const FAQSubtitle = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const FAQItem = styled.div`
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  background: white;
  overflow: hidden;
`;

const FAQQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.gray[900]};
  font-weight: 600;
  font-size: 1rem;
`;

const FAQAnswer = styled.div`
  color: ${props => props.theme.colors.gray[600]};
  padding: 1rem 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
  background: #f9fafb;
`;

const SupportLinkWrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const SupportLink = styled.a`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PrivacyPolicyAgreement = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.gray[700]};
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const PolicyLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    setAgreedToPolicy(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (agreedToPolicy) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      alert('Please agree to the Privacy Policy to send your message.');
    }
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is SkySail’s baggage policy?",
      answer: "Each passenger is allowed one carry-on bag (up to 7kg) and one checked bag (up to 23kg) on most fares. Additional fees may apply for extra or oversized baggage. Check our website for details."
    },
    {
      question: "Does SkySail offer refunds for canceled flights?",
      answer: "If SkySail cancels your flight, you’re eligible for a full refund or rebooking. For voluntary cancellations, refunds depend on your ticket type. Contact support for assistance."
    },
    {
      question: "How do I check-in for my SkySail flight?",
      answer: "You can check in online through our website or mobile app starting 24 hours before departure. Online check-in closes 90 minutes before departure. Airport counter check-in opens 3 hours before and closes 60 minutes before for international flights."
    },
    {
      question: "Do you offer special assistance for passengers with disabilities?",
      answer: "Yes, SkySail provides assistance for passengers with disabilities, including wheelchair services and priority boarding. Please request assistance at least 48 hours before your flight."
    },
    {
      question: "What should I do if I miss my flight?",
      answer: "If you miss your flight, contact our support team immediately at 1-800-SKY-SAIL. Depending on your fare type, we may be able to rebook you on the next available flight for a fee."
    }
  ];

  return (
    <Container>
      <h3>We are here to assist you with any inquiries. Please reach out to us using the information below or fill out the contact form.</h3>
      <br></br>
      <img src ="src/images/Contact.png" style={{ maxWidth: '100%', height: '550px', marginBottom: '1rem', display: 'block', margin: 'auto' }} ></img>
      <Grid>
        <ContactInfo>
          <Title>Contact Information</Title>
          <InfoItem>
            <Phone size={24} />
            <InfoText>
              <Label>Phone</Label>
              <p>Our team is available 24/7 to assist you.</p>
              <Value>+1-800-555-1234</Value>
            </InfoText>
          </InfoItem>
          <InfoItem>
            <Mail size={24} />
            <InfoText>
              <Label>Email</Label>
              <p>Send us an email and we'll respond within 24 hours.</p>
              <Value>support@skysail.com</Value>
            </InfoText>
          </InfoItem>
          <InfoItem>
            <MapPin size={24} />
            <InfoText>
              <Label>Address</Label>
              <Value>
                SkySail HQ<br />
                Financial District, Hitech City, Hyderabad, India.🇮🇳
              </Value>
            </InfoText>
          </InfoItem>
          <MapContainer>
            <MapIframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1234567890123!2d78.3746986148813!3d17.44118318805048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e4b3b9b2b7%3A0x7e7a4e4e4e4e4e4e!2sFinancial%20District%2C%20Hyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
              title="SkySail HQ Location"
            />
          </MapContainer>
        </ContactInfo>
        <ContactForm onSubmit={handleSubmit}>
          <Title>Contact Form</Title>
          <FormGroup>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <Option value="" disabled>
                Select a subject
              </Option>
              <Option value="Booking Inquiry">Booking Inquiry</Option>
              <Option value="Change Request">Change Request</Option>
              <Option value="Refund Request">Refund Request</Option>
              <Option value="Feedback">Feedback</Option>
              <Option value="Other">Other</Option>
            </Select>
          </FormGroup>
          <FormGroup>
            <TextArea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <PrivacyPolicyAgreement>
            <Checkbox
              type="checkbox"
              checked={agreedToPolicy}
              onChange={handleCheckboxChange}
              required
            />
            I agree to the Privacy Policy and consent to the processing of my personal data.
          </PrivacyPolicyAgreement>
          <Button type="submit" disabled={!agreedToPolicy}>
            <Send size={20} />
            Send Message
          </Button>
          {submitted && (
            <SuccessMessage>
              Thank you for your message! We'll get back to you soon.
            </SuccessMessage>
          )}
        </ContactForm>
      </Grid>
      <FAQSection>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQSubtitle>
          Find quick answers to common questions about our services, policies, and procedures.
        </FAQSubtitle>
        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <FAQQuestion onClick={() => toggleFAQ(index)}>
              {faq.question}
              <ChevronDown
                size={20}
                style={{
                  transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                  color: '#1e3a8a'
                }}
              />
            </FAQQuestion>
            {openFAQ === index && (
              <FAQAnswer>{faq.answer}</FAQAnswer>
            )}
          </FAQItem>
        ))}
        <SupportLinkWrapper>
          <p> Didn't find what you were looking for? </p>
          <SupportLink href="mailto:support@skysail.com">
            <Mail size={16} />
            Contact our support team
          </SupportLink>
        </SupportLinkWrapper>
      </FAQSection>
    </Container>
  );
};

export default ContactPage;