import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, Info, MessageSquare, GraduationCap, CheckCircle2, Menu, X, Zap, MapPin, User } from 'lucide-react';

const Header = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'overview', label: 'Timeline', icon: <Vote size={18} />, description: 'Process Steps' },
    { id: 'education', label: 'Learn', icon: <Info size={18} />, description: 'Educational Guide' },
    { id: 'assistant', label: 'AI Help', icon: <MessageSquare size={18} />, description: 'Ask Questions' },
    { id: 'quiz', label: 'Test', icon: <GraduationCap size={18} />, description: 'Knowledge Quiz' },
    { id: 'centers', label: 'Centers', icon: <MapPin size={18} />, description: 'Google Maps' },
  ];

  return (
    <header className="glass sticky top-0 z-50 animate-fade-in">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group select-none"
          onClick={() => setActiveTab('overview')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setActiveTab('overview')}
          aria-label="Go to homepage"
        >
          <div className="relative p-2.5 bg-primary/15 rounded-xl group-hover:bg-primary/25 transition-all duration-300 group-hover:scale-105">
            <CheckCircle2 className="text-primary" size={24} strokeWidth={2.5} />
            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="hidden sm:block">
            <span className="text-xl md:text-2xl font-bold font-outfit tracking-tight">
              Vote<span className="text-primary-gradient">Wise</span>
            </span>
            <p className="text-[10px] md:text-xs text-slate-400 mt-0.5 tracking-wide uppercase font-medium">Election Education</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-current={activeTab === item.id ? 'page' : undefined}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 focus-ring ${
                activeTab === item.id 
                  ? 'text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {activeTab === item.id && (
                <motion.span 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/25" 
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div id="google_translate_element" className="hidden xl:block"></div>
          
          <div className="g_id_signin hidden sm:block"
               data-type="standard"
               data-shape="pill"
               data-theme="filled_blue"
               data-text="signin_with"
               data-size="medium"
               data-logo_alignment="left">
          </div>

          <button className="btn btn-primary hidden md:flex items-center gap-2" onClick={() => setActiveTab('education')}>
            <Zap size={16} />
            <span className="hidden xl:inline">Start Learning</span>
          </button>

          <button
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 glass border-b border-white/[0.08] overflow-hidden"
          >
            <nav className="container py-4" aria-label="Mobile Navigation">
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    aria-current={activeTab === item.id ? 'page' : undefined}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 focus-ring ${
                      activeTab === item.id 
                        ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.icon}
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-sm">{item.label}</span>
                      <span className="text-xs opacity-70">{item.description}</span>
                    </div>
                  </button>
                ))}
                
                <div className="g_id_signin mt-4 w-full" data-type="standard" data-width="100%"></div>

                <button 
                  className="btn btn-primary mt-3 w-full"
                  onClick={() => {
                    setActiveTab('education');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Zap size={16} />
                  Start Learning
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

Header.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default memo(Header);
