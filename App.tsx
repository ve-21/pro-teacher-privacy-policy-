
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  Mail, 
  Printer, 
  Menu, 
  X, 
  ExternalLink,
  Lock,
  Database,
  Users,
  Eye,
  ArrowUp
} from 'lucide-react';
import { PolicyData } from './constants';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute('id') || '';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Pro Teacher Manager</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <a 
                href="mailto:vithuve21@gmail.com" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-all shadow-sm hover:shadow-md"
              >
                Contact Support
              </a>
            </nav>

            {/* Mobile Nav Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden">
          <div className="pt-20 pb-6 px-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4">Sections</h3>
            <div className="space-y-1">
              {PolicyData.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    activeSection === section.id 
                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100 px-4">
               <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 w-full text-slate-600 py-3"
                >
                  <Printer className="w-5 h-5" />
                  Print Policy
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Last updated: February 8, 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Your privacy is our priority. Learn how Pro Teacher Manager handles your data and protects your information.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Table of Contents */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-28">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">Table of Contents</h3>
              <nav className="space-y-1">
                {PolicyData.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`group flex items-center w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                      activeSection === section.id 
                      ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-200' 
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                    }`}
                  >
                    <ChevronRight className={`w-4 h-4 mr-2 transition-transform ${activeSection === section.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                    {section.title}
                  </button>
                ))}
              </nav>
              
              <div className="mt-12 p-6 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-100">
                <Lock className="w-8 h-8 mb-4" />
                <h4 className="font-bold mb-2">Secure & Private</h4>
                <p className="text-sm text-blue-100 leading-relaxed mb-4">
                  We use industry-standard encryption to ensure your teaching data remains only yours.
                </p>
                <a href="mailto:vithuve21@gmail.com" className="inline-flex items-center gap-2 text-xs font-bold underline hover:text-white transition-colors">
                  Contact our Privacy Team <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* Policy Content */}
          <article className="flex-grow max-w-3xl prose prose-slate prose-blue prose-lg">
            {PolicyData.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
                  {section.title}
                </h2>
                <div className="text-slate-600 leading-relaxed space-y-4">
                  {section.content}
                </div>
              </section>
            ))}

            {/* Data Safety Table - Special UI */}
            <section id="data-safety" className="scroll-mt-24 mb-16">
              <div className="bg-slate-900 rounded-3xl p-8 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <ShieldCheck className="w-64 h-64 -mr-20 -mt-20" />
                </div>
                <h2 className="text-2xl font-bold mb-8 text-white border-b border-slate-800 pb-4">
                  Google Play Store Data Safety
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-4">
                    <h3 className="text-blue-400 font-bold uppercase text-xs tracking-widest">Data Collected</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 text-sm">
                        <div className="mt-1 p-0.5 rounded-full bg-green-500/20 text-green-400"><ChevronRight className="w-3 h-3" /></div>
                        Personal info (Name, Email)
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <div className="mt-1 p-0.5 rounded-full bg-green-500/20 text-green-400"><ChevronRight className="w-3 h-3" /></div>
                        Photos (Optional student profiles)
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <div className="mt-1 p-0.5 rounded-full bg-green-500/20 text-green-400"><ChevronRight className="w-3 h-3" /></div>
                        App activity data & Analytics
                      </li>
                      <li className="flex items-start gap-3 text-sm">
                        <div className="mt-1 p-0.5 rounded-full bg-green-500/20 text-green-400"><ChevronRight className="w-3 h-3" /></div>
                        Financial records (Manual student payments)
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-blue-400 font-bold uppercase text-xs tracking-widest">Security Practices</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3 text-sm">
                        <div className="p-0.5 rounded bg-blue-500/20 text-blue-400"><Database className="w-4 h-4" /></div>
                        Encrypted in Transit (SSL/TLS)
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <div className="p-0.5 rounded bg-blue-500/20 text-blue-400"><Lock className="w-4 h-4" /></div>
                        Encrypted at Rest
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <div className="p-0.5 rounded bg-blue-500/20 text-blue-400"><X className="w-4 h-4" /></div>
                        No Third-Party Data Selling
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <div className="p-0.5 rounded bg-blue-500/20 text-blue-400"><Users className="w-4 h-4" /></div>
                        User Data Deletion Supported
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="bg-slate-900 p-1 rounded-md">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-slate-900">Pro Teacher Manager</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">
                The ultimate companion for modern educators to manage classes, students, and curriculum efficiently.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">App Store</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Play Store</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>© 2026 Pro Teacher Manager. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="mailto:vithuve21@gmail.com" className="hover:text-slate-600 flex items-center gap-1">
                <Mail className="w-3 h-3" /> vithuve21@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all no-print"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default App;
