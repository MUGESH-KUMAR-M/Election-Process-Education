import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCcw, Trophy } from 'lucide-react';
import { quizQuestions as questions } from '../data/quizData';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionClick = (index) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    const correct = index === questions[currentQuestion].correct;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  if (showResults) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card text-center max-w-xl mx-auto py-12"
      >
        <div className="flex justify-center mb-6">
          <Trophy size={80} className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]" />
        </div>
        <h2 className="text-4xl mb-4">Quiz Complete!</h2>
        <p className="text-2xl mb-8">
          You scored <span className="text-primary font-bold">{score}</span> out of {questions.length}
        </p>
        <button 
          className="btn btn-primary w-full max-w-xs mx-auto" 
          onClick={resetQuiz}
          aria-label="Restart Quiz"
        >
          <RefreshCcw size={20} /> Try Again
        </button>
      </motion.div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <span className="text-primary font-bold text-sm tracking-widest uppercase">Question {currentQuestion + 1} of {questions.length}</span>
          <h2 className="text-2xl md:text-3xl mt-2">{questions[currentQuestion].question}</h2>
        </div>
        <div className="text-slate-500 font-medium">Score: {score}</div>
      </div>

      <div className="space-y-4" role="radiogroup" aria-label="Quiz Options">
        {questions[currentQuestion].options.map((option, index) => {
          let stateClass = 'border-white/10 hover:border-primary/50';
          if (selectedOption === index) {
            stateClass = isCorrect ? 'border-emerald-500 bg-emerald-500/10' : 'border-rose-500 bg-rose-500/10';
          } else if (selectedOption !== null && index === questions[currentQuestion].correct) {
            stateClass = 'border-emerald-500 bg-emerald-500/10';
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={selectedOption !== null}
              aria-label={`Option ${index + 1}: ${option}`}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 flex justify-between items-center outline-none focus:border-primary ${stateClass}`}
            >
              <span className="text-lg">{option}</span>
              {selectedOption === index && (
                isCorrect ? <CheckCircle2 className="text-emerald-500" /> : <XCircle className="text-rose-500" />
              )}
              {selectedOption !== null && index === questions[currentQuestion].correct && selectedOption !== index && (
                <CheckCircle2 className="text-emerald-500" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <div 
          className="h-2 bg-slate-800 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Quiz Progress"
        >
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
