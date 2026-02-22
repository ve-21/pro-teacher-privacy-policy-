
import React, { useState, useEffect } from 'react';
import {
    Users,
    Trash2,
    CheckCircle,
    Clock,
    Mail,
    User as UserIcon,
    LogOut,
    Search,
    RefreshCcw,
    Calendar
} from 'lucide-react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

interface DeletionRequest {
    id: string;
    name: string;
    email: string;
    reason: string;
    status: 'pending' | 'completed';
    createdAt: any;
}

const AdminDashboard: React.FC = () => {
    const [requests, setRequests] = useState<DeletionRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/admin');
            } else {
                setCurrentUser(user);
            }
        });

        const q = query(collection(db, 'deletionRequests'), orderBy('createdAt', 'desc'));
        const unsubscribeData = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as DeletionRequest[];
            setRequests(data);
            setLoading(false);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeData();
        };
    }, [navigate]);

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/admin');
    };

    const handleStatusUpdate = async (id: string, newStatus: 'pending' | 'completed') => {
        try {
            await updateDoc(doc(db, 'deletionRequests', id), {
                status: newStatus
            });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDeleteRequest = async (id: string) => {
        if (window.confirm('Are you sure you want to remove this request from the list?')) {
            try {
                await deleteDoc(doc(db, 'deletionRequests', id));
            } catch (error) {
                console.error('Error deleting request:', error);
            }
        }
    };

    const filteredRequests = requests.filter(req =>
        req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'No date';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
                    <p className="text-slate-500 font-medium tracking-tight">Manage account deletion requests</p>
                </div>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>

            {/* Stats & Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 font-mono">Total Requests</div>
                    <div className="text-3xl font-black text-slate-900">{requests.length}</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 font-mono">Pending</div>
                    <div className="text-3xl font-black text-slate-900">{requests.filter(r => r.status === 'pending').length}</div>
                </div>
                <div className="md:col-span-2">
                    <div className="relative h-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full h-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-3xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                                <th className="px-6 py-4">User Details</th>
                                <th className="px-6 py-4">Submission Date</th>
                                <th className="px-6 py-4">Reason</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {req.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{req.name}</p>
                                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Mail className="w-3 h-3" /> {req.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-600 flex items-center gap-2 font-medium">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                {formatDate(req.createdAt)}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-600 max-w-xs truncate font-medium" title={req.reason}>
                                                {req.reason || 'No reason provided'}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {req.status === 'completed' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                                                    <CheckCircle className="w-3 h-3" /> Completed
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
                                                    <Clock className="w-3 h-3" /> Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {req.status === 'pending' ? (
                                                    <button
                                                        onClick={() => handleStatusUpdate(req.id, 'completed')}
                                                        className="p-2 text-slate-400 hover:text-green-600 transition-colors"
                                                        title="Mark as completed"
                                                    >
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleStatusUpdate(req.id, 'pending')}
                                                        className="p-2 text-slate-400 hover:text-amber-600 transition-colors"
                                                        title="Revert to pending"
                                                    >
                                                        <RefreshCcw className="w-5 h-5" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteRequest(req.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                                    title="Delete request"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                                        No requests found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
