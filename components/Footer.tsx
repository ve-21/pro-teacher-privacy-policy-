
import React from 'react';
import { ShieldCheck, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
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
                        <Link to="/" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
                        <Link to="/delete-account" className="hover:text-blue-600 transition-colors">Delete Account</Link>
                        <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                        <a href="mailto:vithuve21@gmail.com" className="hover:text-blue-600 transition-colors">Contact</a>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>© {new Date().getFullYear()} Pro Teacher Manager. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="mailto:vithuve21@gmail.com" className="hover:text-slate-600 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> vithuve21@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
