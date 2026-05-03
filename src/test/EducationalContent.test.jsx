import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EducationalContent from '../components/EducationalContent';

describe('EducationalContent Component', () => {
  it('renders all educational modules', () => {
    render(<EducationalContent />);
    
    // Check main heading
    expect(screen.getByRole('heading', { name: /Electoral Knowledge Base/i })).toBeInTheDocument();
    
    // Check for all 6 modules
    expect(screen.getByText('Eligibility & Rights')).toBeInTheDocument();
    expect(screen.getByText('Voter Identification')).toBeInTheDocument();
    expect(screen.getByText('Election Timelines')).toBeInTheDocument();
    expect(screen.getByText('Polling Locations')).toBeInTheDocument();
    expect(screen.getByText('Ballot Procedures')).toBeInTheDocument();
    expect(screen.getByText('Code of Conduct')).toBeInTheDocument();
  });

  it('displays module descriptions', () => {
    render(<EducationalContent />);
    
    expect(screen.getByText(/Learn who can vote, universal suffrage principles/)).toBeInTheDocument();
    expect(screen.getByText(/Required documentation, digital IDs/)).toBeInTheDocument();
    expect(screen.getByText(/Understanding key dates: registration deadlines/)).toBeInTheDocument();
  });

  it('shows module tags', () => {
    render(<EducationalContent />);
    
    // Check for tags
    expect(screen.getByText('Legal')).toBeInTheDocument();
    expect(screen.getByText('Citizenship')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('Identity')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<EducationalContent />);
    
    // Check for grid layout
    const grid = document.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    
    // Check for cards
    const cards = screen.getAllByText(/Learn|Required|Understanding|How to find|A step-by-step|Ethical guidelines/);
    expect(cards.length).toBeGreaterThan(0);
  });

  it('renders with proper animations', () => {
    render(<EducationalContent />);
    
    // Check for animation class
    const container = document.querySelector('.animate-fade-in');
    expect(container).toBeInTheDocument();
  });
});
