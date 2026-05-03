import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock the lazy loaded components
vi.mock('../components/Timeline', () => ({
  default: () => <div data-testid="timeline">Timeline Component</div>
}));

vi.mock('../components/Footer', () => ({
  default: () => <div data-testid="footer">Footer Component</div>
}));

describe('App Component', () => {
  it('renders header with correct navigation', () => {
    render(<App />);
    
    // Check for main title
    expect(screen.getByText('VoteWise AI')).toBeInTheDocument();
    expect(screen.getByText('Your comprehensive guide to understanding elections')).toBeInTheDocument();
    
    // Check for navigation items
    expect(screen.getByRole('button', { name: /Go to Timeline/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go to Learn/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go to AI Help/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Go to Test/i })).toBeInTheDocument();
  });

  it('shows timeline section by default', () => {
    render(<App />);
    
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
    expect(screen.getByText('Why it Matters')).toBeInTheDocument();
    expect(screen.getByText('How to Use')).toBeInTheDocument();
  });

  it('navigates to different sections when nav items are clicked', () => {
    render(<App />);
    
    // Click on Learn section
    const learnButton = screen.getByRole('button', { name: /Go to Learn/i });
    fireEvent.click(learnButton);
    
    // Should show loading state
    expect(screen.getByText('Loading Modules...')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<App />);
    
    // Check for main heading
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('VoteWise AI');
    
    // Check for navigation elements
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  });
