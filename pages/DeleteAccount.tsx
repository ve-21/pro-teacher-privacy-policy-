
import React, { useState } from 'react';
import { Mail, User, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const DeleteAccount: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        reason: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            await addDoc(collection(db, 'deletionRequests'), {
                ...formData,
                createdAt: serverTimestamp(),
                status: 'pending'
            });
            setStatus('success');
            setFormData({ name: '', email: '', reason: '' });
        } catch (error) {
            console.error('Error submitting request:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Request Received</h1>
                <p className="text-slate-600 mb-8">
                    Your request to delete your account has been submitted. Our team will process it within 24-48 hours. You will receive a confirmation email once completed.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-blue-600 font-bold hover:underline"
                >
                    Submit another request
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Account Deletion Request</h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We're sorry to see you go. Please fill out the form below to request the permanent deletion of your Pro Teacher Manager account and all associated data.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
                    <div className="bg-amber-50 border-b border-amber-100 p-6 flex items-start gap-4">
                        <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-amber-900">Warning: Permanent Action</h3>
                            <p className="text-amber-800 text-sm">
                                Deleting your account is permanent. All your data, including classes, student records, and payment history, will be permanently removed from our servers and cannot be recovered.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700 ml-1">Account Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700 ml-1">Reason for Leaving (Optional)</label>
                            <textarea
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                placeholder="Tell us why you want to delete your account..."
                                rows={4}
                                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className={`w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 active:translate-y-0'}`}
                        >
                            {status === 'submitting' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Submit Deletion Request
                                </>
                            )}
                        </button>

                        {status === 'error' && (
                            <p className="text-red-500 text-sm text-center font-medium mt-4">
                                Something went wrong. Please try again or contact support.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
