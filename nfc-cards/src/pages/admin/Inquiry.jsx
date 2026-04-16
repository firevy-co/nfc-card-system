import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiMail, FiPhone, FiSearch, FiCheckCircle, 
    FiMessageSquare, FiTrash2, FiMaximize2, FiActivity 
} from 'react-icons/fi';
import AdminNav from '../../components/layout/AdminNav';
import TopNav from '../../components/layout/TopNav';

// --- ARCHITECTURAL MOCK DATA ---
const MOCK_INQUIRIES = [
    { 
        id: 'INQ-8821', 
        name: 'Alex Rivera', 
        email: 'alex@quantum.io', 
        vector: 'Technical Infrastructure', 
        brief: 'Requesting documentation for the card synchronization API and webhook protocols for real-time identity updates.',
        time: '2 hours ago',
        status: 'Unread'
    },
    { 
        id: 'INQ-8822', 
        name: 'Sarah Chen', 
        email: 'schen@identity.co', 
        vector: 'Identity Management', 
        brief: 'Seeking clarification on the encryption layers used for NFC data transmission in high-security environments.',
        time: '5 hours ago',
        status: 'Resolved'
    },
    { 
        id: 'INQ-8823', 
        name: 'Marc Hudson', 
        email: 'hudson@nexus.dev', 
        vector: 'Commercial Protocols', 
        brief: 'Intersted in bulk enterprise licensing for a workforce of 500+ across multiple global nodes.',
        time: '1 day ago',
        status: 'Processing'
    }
];

const Inquiry = () => {
    const [inquiries] = useState(MOCK_INQUIRIES);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    const filteredInquiries = inquiries.filter(iq => 
        iq.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        iq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        iq.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-zinc-50 text-black flex flex-col font-['Mulish'] overflow-x-hidden">
            <TopNav />
            <AdminNav />

            <main className="flex-1 p-6 lg:p-12 mt-20 max-w-7xl mx-auto w-full">
                <header className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-10 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-1.5 h-6 bg-primary rounded-full shadow-lg"></div>
                            <span className="text-[10px] font-black text-black uppercase tracking-[0.4em] opacity-40">Operational Inbox</span>
                        </div>
                        <h2 className="text-5xl font-black text-black tracking-tighter capitalize font-['Mulish']">Inquiry Hub</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" />
                            <input 
                                type="text"
                                placeholder="Audit Inbox..."
                                className="pl-14 pr-6 py-4 rounded-2xl bg-white border border-zinc-100 text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all w-full sm:w-80 shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                <div className="w-full">
                    {/* --- INQUIRY REGISTRY: FULL WIDTH --- */}
                    <div className="bg-white border border-zinc-100 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-zinc-50 bg-zinc-50/50">
                                        <th className="px-10 py-7 text-left text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 whitespace-nowrap">Origin Node</th>
                                        <th className="px-10 py-7 text-left text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 whitespace-nowrap">Primary Vector</th>
                                        <th className="px-10 py-7 text-left text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 whitespace-nowrap">Status</th>
                                        <th className="px-10 py-7 text-right text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {filteredInquiries.map((iq, idx) => (
                                            <motion.tr 
                                                key={iq.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-all group"
                                            >
                                                <td className="px-10 py-9">
                                                    <div className="flex flex-col">
                                                        <span className="text-black font-black tracking-tighter text-lg whitespace-nowrap">{iq.name}</span>
                                                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.1em] mt-1">{iq.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-9">
                                                    <div className="inline-flex items-center px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-100">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-600 whitespace-nowrap">{iq.vector}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-9">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-2 h-2 rounded-full ${
                                                            iq.status === 'Unread' ? 'bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]' :
                                                            iq.status === 'Resolved' ? 'bg-emerald-500' : 'bg-primary'
                                                        }`}></div>
                                                        <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${
                                                            iq.status === 'Unread' ? 'text-amber-500' : 'text-zinc-500'
                                                        }`}>{iq.status}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-9 text-right">
                                                    <div className="flex items-center justify-end gap-3 transition-all duration-300">
                                                        <button 
                                                            onClick={() => setSelectedInquiry(iq)}
                                                            className="px-6 py-2.5 rounded-xl bg-black text-white font-black uppercase tracking-[0.2em] text-[10px] hover:brightness-125 transition-all shadow-lg active:scale-95"
                                                        >
                                                            Audit Brief
                                                        </button>
                                                        <button className="w-10 h-10 rounded-xl bg-red-50 text-red-400 hover:text-red-500 hover:bg-red-100 transition-all flex items-center justify-center">
                                                            <FiTrash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>

                        {filteredInquiries.length === 0 && (
                            <div className="px-10 py-32 text-center opacity-30">
                                <FiMessageSquare size={48} className="mx-auto mb-6 text-black animate-pulse" />
                                <p className="font-black uppercase tracking-[0.4em] text-xs text-black">No active inquiries in priority buffer</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* --- INQUIRY PREVIEW MODAL --- */}
            <AnimatePresence>
                {selectedInquiry && (
                    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-8">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-3xl" 
                            onClick={() => setSelectedInquiry(null)}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white border border-zinc-100 w-full max-w-2xl rounded-[3.5rem] p-10 lg:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative z-10 overflow-hidden font-['Mulish']"
                        >
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-indigo-500 to-primary/20"></div>
                            
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-2xl">
                                        <FiMessageSquare size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-black tracking-tighter">Inquiry Protocol</h3>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-1">Audit Trail: {selectedInquiry.id}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedInquiry(null)}
                                    className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 hover:text-black transition-all active:scale-95"
                                >
                                    <FiMaximize2 size={18} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Origin Architect</p>
                                        <p className="text-lg font-black text-black">{selectedInquiry.name}</p>
                                        <p className="text-xs font-bold text-zinc-500 mt-1">{selectedInquiry.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Primary Vector</p>
                                        <div className="inline-flex px-4 py-2 bg-zinc-50 rounded-xl font-black uppercase tracking-[0.1em] text-[10px] text-zinc-700 border border-zinc-100">
                                            {selectedInquiry.vector}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Operational Brief</p>
                                    <p className="text-sm font-bold text-zinc-800 leading-relaxed italic">
                                        "{selectedInquiry.brief}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-6 pt-6">
                                    <button className="flex-1 py-5 rounded-[1.5rem] bg-black text-white font-black uppercase tracking-[0.25em] text-[11px] hover:brightness-125 transition-all flex items-center justify-center gap-3 shadow-lg">
                                        <FiCheckCircle size={16} />
                                        Initialize Resolve
                                    </button>
                                    <button 
                                        onClick={() => setSelectedInquiry(null)}
                                        className="px-10 py-5 rounded-[1.5rem] bg-zinc-50 text-zinc-400 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-100 transition-all border border-zinc-100"
                                    >
                                        Close Brief
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Inquiry;
