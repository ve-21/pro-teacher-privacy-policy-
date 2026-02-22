
import React, { useState } from 'react';
import { ShieldCheck, Menu, X, Printer, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    const handlePrint = () => {
        window.print();
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 no-print">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">Pro Teacher Manager</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className={`text-slate-600 hover:text-blue-600 font-medium transition-colors ${location.pathname === '/' ? 'text-blue-600' : ''}`}>
                            Privacy Policy
                        </Link>
                        <Link to="/delete-account" className={`text-slate-600 hover:text-blue-600 font-medium transition-colors ${location.pathname === '/delete-account' ? 'text-blue-600' : ''}`}>
                            Delete Account
                        </Link>
                        {isHome && (
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
                            >
                                <Printer className="w-4 h-4" />
                                Print
                            </button>
                        )}
                        <Link to="/admin" className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                            <LayoutDashboard className="w-5 h-5" />
                        </Link>
                        <a
                            href="mailto:vithuve21@gmail.com"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-all shadow-sm hover:shadow-md"
                        >
                            Support
                        </a>
                    </nav>

                    {/* Mobile Nav Button */}
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white md:hidden">
                    <div className="pt-20 pb-6 px-4">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4">Navigation</h3>
                        <div className="space-y-1">
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-3 rounded-xl transition-colors ${location.pathname === '/' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600'}`}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/delete-account"
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-3 rounded-xl transition-colors ${location.pathname === '/delete-account' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600'}`}
                            >
                                Delete Account
                            </Link>
                            <Link
                                to="/admin"
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-3 rounded-xl transition-colors ${location.pathname === '/admin' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600'}`}
                            >
                                Admin Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
