import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BookOpen, Fingerprint, Calendar, MapPin, Scale } from 'lucide-react';

const modules = [
  {
    title: 'Eligibility & Rights',
    icon: <ShieldCheck className="text-blue-400" />,
    content: 'Learn who can vote, universal suffrage principles, and your legal rights as a citizen in the electoral process.',
    tags: ['Legal', 'Citizenship']
  },
  {
    title: 'Voter Identification',
    icon: <Fingerprint className="text-purple-400" />,
    content: 'Required documentation, digital IDs, and alternative verification methods to ensure "one person, one vote".',
    tags: ['Security', 'Identity']
  },
  {
    title: 'Election Timelines',
    icon: <Calendar className="text-pink-400" />,
    content: 'Understanding key dates: registration deadlines, campaign periods, polling dates, and counting schedules.',
    tags: ['Planning', 'Dates']
  },
  {
    title: 'Polling Locations',
    icon: <MapPin className="text-emerald-400" />,
    content: 'How to find your designated booth, accessible voting options, and mobile polling stations for remote areas.',
    tags: ['Logistics', 'Access']
  },
  {
    title: 'Ballot Procedures',
    icon: <BookOpen className="text-amber-400" />,
    content: 'A step-by-step guide to marking your ballot, using voting machines, and ensuring your vote is correctly cast.',
    tags: ['Procedure', 'Voting']
  },
  {
    title: 'Code of Conduct',
    icon: <Scale className="text-red-400" />,
    content: 'Ethical guidelines for candidates and parties, anti-corruption measures, and fair play standards.',
    tags: ['Ethics', 'Rules']
  }
];

const EducationalContent = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-12">
        <h2 className="text-4xl font-outfit mb-4">Electoral Knowledge Base</h2>
        <p className="text-slate-400 max-w-2xl">
          Deep dive into the specific components of the democratic process. Our curated modules provide clarity on complex procedures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card flex flex-col h-full"
          >
            <div className="p-3 bg-white/5 rounded-2xl w-fit mb-6">
              {React.cloneElement(module.icon, { size: 32 })}
            </div>
            <h3 className="text-xl mb-3">{module.title}</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
              {module.content}
            </p>
            <div className="flex flex-wrap gap-2">
              {module.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationalContent;
