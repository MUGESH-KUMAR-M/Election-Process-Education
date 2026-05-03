import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Navigation, Info } from 'lucide-react';

const FindCenter = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-12">
        <h2 className="text-4xl font-outfit mb-4">Find Your Polling Center</h2>
        <p className="text-slate-400 max-w-2xl">
          Use the Google Maps integrated locator to find the nearest official voting center or electoral commission office.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <Search className="text-primary" size={20} />
              Quick Search
            </h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter ZIP or City..." 
                className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            </div>
            <button className="btn btn-primary w-full mt-4">Search Centers</button>
          </div>

          <div className="glass-card">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <Info className="text-primary" size={20} />
              Nearby Centers
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Central Library', dist: '0.8 miles', status: 'Open' },
                { name: 'Community Hall', dist: '1.2 miles', status: 'Open' },
                { name: 'High School Gym', dist: '2.5 miles', status: 'Closed' }
              ].map((loc, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold group-hover:text-primary transition-colors">{loc.name}</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-500">{loc.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin size={12} />
                    <span>{loc.dist} away</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-card h-[500px] p-0 overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-surface/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm">
                <Navigation className="text-primary" size={16} />
                <span>Google Maps Integrated</span>
              </div>
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2157071440317!2d-73.98509668459375!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480293%3A0x5117470702599d0b!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1683141234567!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
          <div className="mt-4 flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
            <Navigation className="text-primary" size={20} />
            <p className="text-sm text-slate-400">
              This map uses the <strong>Google Maps Platform</strong> to provide real-time location services and polling station navigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindCenter;
