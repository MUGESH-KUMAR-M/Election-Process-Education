import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Timeline from '../components/Timeline';

describe('Timeline Component', () => {
  it('renders all timeline steps', () => {
    render(<Timeline />);
    expect(screen.getByRole('tablist', { name: /Election Process Steps/i })).toBeInTheDocument();
    
    // Check for all 6 steps
    for (let i = 1; i <= 6; i++) {
      expect(screen.getByRole('tab', { name: new RegExp(`View step ${i}`) })).toBeInTheDocument();
    }
  });

  it('selects first step by default', () => {
    render(<Timeline />);
    const firstStep = screen.getByRole('tab', { name: /View step 1: Voter Registration/i });
    expect(firstStep).toHaveAttribute('aria-selected', 'true');
  });

  it('updates selected step when clicked', () => {
    render(<Timeline />);
    const secondStep = screen.getByRole('tab', { name: /View step 2: Candidate Filing/i });
    
    fireEvent.click(secondStep);
    expect(secondStep).toHaveAttribute('aria-selected', 'true');
    
    const firstStep = screen.getByRole('tab', { name: /View step 1: Voter Registration/i });
    expect(firstStep).toHaveAttribute('aria-selected', 'false');
  });

  it('displays correct content for selected step', () => {
    render(<Timeline />);
    const stepPanel = screen.getByRole('tabpanel');
    expect(stepPanel).toHaveTextContent('Voter Registration');
    expect(stepPanel).toHaveTextContent('The foundation of democracy');
  });

  it('has proper accessibility attributes', () => {
    render(<Timeline />);
    
    // Check tablist role
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    
    // Check tab roles
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(6);
    
    // Check tabpanel role
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('shows progress indicator correctly', () => {
    render(<Timeline />);
    // The progress should be at 0% for step 1
    const progressIndicator = screen.getByRole('tablist').querySelector('.bg-primary');
    expect(progressIndicator).toBeInTheDocument();
  });
});
