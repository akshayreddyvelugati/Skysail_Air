import styled from 'styled-components';
import { CheckCircle } from 'lucide-react';

const StepFlowContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme.colors?.white || '#ffffff'};
  border-bottom: 1px solid ${props => props.theme.colors?.gray?.[200] || '#e5e7eb'};
  margin-bottom: 1rem;
  width: 100%; /* Ensure it spans the full width */
  max-width: 1200px; /* Match the max-width of other containers if needed */
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background: ${props => props.isActive 
    ? '#1A365D'
    : (props.theme.colors?.gray?.[100] || '#f5f5f5')};
  color: ${props => props.isActive 
    ? '#ffffff'
    : (props.theme.colors?.gray?.[700] || '#4b5563')};
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
`;

const StepNumber = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.isActive 
    ? '#ffffff'
    : 'transparent'};
  color: ${props => props.isActive 
    ? '#1A365D'
    : (props.theme.colors?.gray?.[700] || '#4b5563')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const StepFlow = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Search' },
    { number: 2, label: 'Select Flight' },
    { number: 3, label: 'Passenger Details' },
    { number: 4, label: 'Seat Selection' },
    { number: 5, label: 'Confirmation' },
  ];

  return (
    <StepFlowContainer>
      {steps.map(step => (
        <Step key={step.number} isActive={step.number === currentStep}>
          {step.number < currentStep ? (
            <CheckCircle size={24} color={props => props.theme.colors?.gray?.[700] || '#4b5563'} />
          ) : (
            <StepNumber isActive={step.number === currentStep}>
              {step.number}
            </StepNumber>
          )}
          {step.label}
        </Step>
      ))}
    </StepFlowContainer>
  );
};

export default StepFlow;