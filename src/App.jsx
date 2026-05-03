import { useState, Suspense, lazy } from 'react';
import { BookOpen, MessageSquare, GraduationCap, Sparkles, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { motion, AnimatePresence } from 'framer-motion';
import './config/firebase'; // Initialize Firebase/Google Cloud Services

// Lazy load heavy components
const AIAssistant = lazy(() => import('./components/AIAssistant'));
const EducationalContent = lazy(() => import('./components/EducationalContent'));
const Quiz = lazy(() => import('./components/Quiz'));
const FindCenter = lazy(() => import('./components/FindCenter'));

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main id="main-content" className="flex-grow container py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.section
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-16">
                <h1 className="hero-title">
                  VoteWise AI
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Your comprehensive guide to understanding elections. Learn the process, ask questions, and test your knowledge.
                </p>
              </div>
              
              <Timeline />
              
              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card">
                  <h2 className="text-2xl mb-4">Why it Matters</h2>
                  <p className="text-slate-400">
                    Understanding the election process is the first step toward effective civic engagement. 
                    Every vote counts, and every step in the process ensures fairness and transparency.
                  </p>
                </div>
                <div className="glass-card">
                  <h2 className="text-2xl mb-4">How to Use</h2>
                  <p className="text-slate-400">
                    Explore the timeline above, ask our AI assistant any specific questions, or take the 
                    interactive quiz to test your knowledge.
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'assistant' && (
            <Suspense fallback={<div className="text-center py-20">Loading Assistant...</div>}>
              <AIAssistant />
            </Suspense>
          )}

          {activeTab === 'education' && (
            <Suspense fallback={<div className="text-center py-20">Loading Modules...</div>}>
              <EducationalContent />
            </Suspense>
          )}

          {activeTab === 'quiz' && (
            <Suspense fallback={<div className="text-center py-20">Loading Quiz...</div>}>
              <Quiz />
            </Suspense>
          )}

          {activeTab === 'centers' && (
            <Suspense fallback={<div className="text-center py-20">Loading Map...</div>}>
              <FindCenter />
            </Suspense>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
