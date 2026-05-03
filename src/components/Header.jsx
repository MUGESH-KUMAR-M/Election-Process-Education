import React, { useState } from 'react';
import { Vote, Info, MessageSquare, GraduationCap, CheckCircle2, Menu, X, Zap } from 'lucide-react';

const Header = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'overview', label: 'Timeline', icon: <Vote size={18} />, description: 'Process Steps' },
    { id: 'education', label: 'Learn', icon: <Info size={18} />, description: 'Educational Guide' },
    { id: 'assistant', label: 'AI Help', icon: <MessageSquare size={18} />, description: 'Ask Questions' },
    { id: 'quiz', label: 'Test', icon: <GraduationCap size={18} />, description: 'Knowledge Quiz' },
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
                <span className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/25 animate-fade-in-scale" />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button 
            className="btn btn-primary btn-sm hidden sm:flex items-center gap-2 shadow-glow animate-pulse-glow" 
            onClick={() => setActiveTab('education')}
          >
            <Zap size={14} />
            <span>Start Learning</span>
          </button>
          
          <button
            className="lg:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 active:scale-95"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass border-b border-white/[0.08] overflow-hidden animate-fade-in">
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
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.icon}
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">{item.label}</span>
                    <span className="text-xs opacity-70">{item.description}</span>
                  </div>
                </button>
              ))}
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
        </div>
      )}
    </header>
  );
};

export default Header;
