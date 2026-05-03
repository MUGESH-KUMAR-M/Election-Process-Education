import { describe, it, expect } from 'vitest';
import { calculatePercentage, getGrade } from './quizUtils';

describe('quizUtils', () => {
  it('should calculate correct percentage', () => {
    expect(calculatePercentage(2, 4)).toBe(50);
    expect(calculatePercentage(3, 4)).toBe(75);
    expect(calculatePercentage(0, 4)).toBe(0);
  });

  it('should return correct grade based on percentage', () => {
    expect(getGrade(95)).toBe('Expert');
    expect(getGrade(75)).toBe('Knowledgeable');
    expect(getGrade(55)).toBe('Learner');
    expect(getGrade(30)).toBe('Beginner');
  });
});
