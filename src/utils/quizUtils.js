export const calculatePercentage = (score, total) => {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
};

export const getGrade = (percentage) => {
  if (percentage >= 90) return 'Expert';
  if (percentage >= 70) return 'Knowledgeable';
  if (percentage >= 50) return 'Learner';
  return 'Beginner';
};
