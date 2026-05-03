import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileText, Megaphone, CheckSquare, BarChart3, Trophy } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Voter Registration',
    desc: 'The foundation of democracy. Citizens register to ensure they are eligible to participate in upcoming elections.',
    icon: <UserPlus />,
    color: '#6366f1'
  },
  {
    id: 2,
    title: 'Candidate Filing',
    desc: 'Aspiring representatives submit their documentation and eligibility proofs to enter the race.',
    icon: <FileText />,
    color: '#8b5cf6'
  },
  {
    id: 3,
    title: 'Campaigning',
    desc: 'Candidates present their platforms, debate issues, and connect with voters to earn their support.',
    icon: <Megaphone />,
    color: '#ec4899'
  },
  {
    id: 4,
    title: 'Election Day',
    desc: 'Voters cast their secret ballots at designated polling stations or via approved mail-in systems.',
    icon: <CheckSquare />,
    color: '#f43f5e'
  },
  {
    id: 5,
    title: 'Counting & Verification',
    desc: 'Ballots are meticulously counted, verified for authenticity, and tabulated across all regions.',
    icon: <BarChart3 />,
    color: '#f59e0b'
  },
  {
    id: 6,
    title: 'Declaration of Results',
    desc: 'Official winners are announced after all audits and potential challenges are resolved.',
    icon: <Trophy />,
    color: '#10b981'
  }
];

const Timeline = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  return (
    <div className="py-8">
      <div className="relative flex justify-between items-center mb-8 md:mb-12 px-2 md:px-4" role="tablist" aria-label="Election Process Steps">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0 rounded-full" />
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          initial={{ width: '0%' }}
          animate={{ width: `${(selectedStep - 1) / (steps.length - 1) * 100}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />

        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setSelectedStep(step.id)}
            role="tab"
            aria-selected={selectedStep === step.id}
            aria-controls={`panel-${step.id}`}
            aria-label={`View step ${step.id}: ${step.title}`}
            className={`relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background ${
              selectedStep >= step.id 
                ? 'bg-slate-900 border-2 border-primary text-primary shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
                : 'bg-slate-800 border-2 border-slate-700 text-slate-500 grayscale'
            } hover:scale-110 active:scale-95`}
          >
            {React.cloneElement(step.icon, { size: 18, className: 'md:w-5 md:h-5' })}
            <span className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 hidden sm:block">
              Step {step.id}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        key={selectedStep}
        id={`panel-${selectedStep}`}
        role="tabpanel"
        tabIndex="0"
        aria-labelledby={`step-${selectedStep}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card flex flex-col md:flex-row gap-8 items-center focus:outline-none focus:border-primary/50"
      >
        <div 
          className="w-24 h-24 rounded-3xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${steps[selectedStep-1].color}20`, border: `2px solid ${steps[selectedStep-1].color}` }}
        >
          {React.cloneElement(steps[selectedStep-1].icon, { size: 40, color: steps[selectedStep-1].color })}
        </div>
        <div>
          <h3 id={`step-${selectedStep}`} className="text-3xl font-outfit mb-3">{steps[selectedStep-1].title}</h3>
          <p className="text-lg text-slate-400 leading-relaxed">
            {steps[selectedStep-1].desc}
          </p>
          <div className="mt-6 flex gap-4">
            <button className="btn btn-primary btn-sm">Learn More</button>
            <button className="btn btn-ghost btn-sm">View Timeline Details</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(Timeline);
