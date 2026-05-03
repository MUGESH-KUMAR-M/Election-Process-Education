import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Quiz from '../components/Quiz';

vi.mock('../data/quizData', () => ({
  quizQuestions: [
    {
      id: 1,
      question: "Test Question 1",
      options: ["Correct", "Wrong"],
      correct: 0
    }
  ]
}));

describe('Quiz Component', () => {
  it('renders the first question', () => {
    render(<Quiz />);
    expect(screen.getByText(/Test Question 1/i)).toBeInTheDocument();
  });

  it('shows correct state when an option is clicked', async () => {
    render(<Quiz />);
    const correctOption = screen.getByText('Correct');
    fireEvent.click(correctOption);
    expect(screen.getByText(/Score: 1/i)).toBeInTheDocument();
  });

  it('renders progress bar with accessibility attributes', () => {
    render(<Quiz />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-label', 'Quiz Progress');
    expect(progressBar).toHaveAttribute('aria-valuenow');
  });
});
