import { GitBranch, Globe, Mail, CheckCircle2, ExternalLink, Shield, Users, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 bg-black/20 backdrop-blur-sm">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="text-primary" size={24} />
              <span className="text-xl font-bold font-outfit">
                Vote<span className="text-primary">Wise</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Empowering citizens with comprehensive election education. Learn, understand, and participate confidently in the democratic process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors" aria-label="Website">
                  <Globe size={20} />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                  <GitBranch size={20} />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors" aria-label="Contact">
                  <Mail size={20} />
                </a>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                  Educational
                </span>
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                  Non-Profit
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-outfit text-white mb-6 flex items-center gap-2">
              <BookOpen size={16} className="text-primary" />
              Quick Links
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">Election Timeline <ExternalLink size={12} className="opacity-50" /></a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">Voting Guide <ExternalLink size={12} className="opacity-50" /></a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">AI Assistant <ExternalLink size={12} className="opacity-50" /></a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">Knowledge Quiz <ExternalLink size={12} className="opacity-50" /></a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-outfit text-white mb-6 flex items-center gap-2">
              <Shield size={16} className="text-primary" />
              Resources
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">Electoral Commission <ExternalLink size={12} className="opacity-50" /></a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">Voter Rights <ExternalLink size={12} className="opacity-50" /></a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">International Standards <ExternalLink size={12} className="opacity-50" /></a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2">Privacy Policy <ExternalLink size={12} className="opacity-50" /></a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-500">
            <p>© 2026 VoteWise AI</p>
            <span className="hidden sm:inline">•</span>
            <p>Educational purpose only</p>
            <span className="hidden sm:inline">•</span>
            <p>Not affiliated with any governmental body</p>
          </div>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">Terms <Shield size={10} /></a>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">Privacy <Shield size={10} /></a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
