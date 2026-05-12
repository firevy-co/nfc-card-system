import React, { useState, useEffect } from 'react';
import { auth } from '@/firebase.config';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiMail, FiPhone, FiSearch, FiCheckCircle,
    FiMessageSquare, FiTrash2, FiMaximize2, FiActivity, FiSend
} from 'react-icons/fi';
import AdminNav from '../../components/layout/AdminNav';
import TopNav from '../../components/layout/TopNav';
import MobileFooter from '../../components/layout/MobileFooter';
import toast from 'react-hot-toast';
import { API_BASE_URL } from "../../config/api";
import ConfirmationModal from '../../components/layout/ConfirmationModal';
import axios from 'axios';

const Inquiry = ({ userData }) => {
    const [inquiries, setInquiries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [reply, setReply] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [inquiryToDelete, setInquiryToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // --- DATA ORCHESTRATION ---

    const fetchInquiries = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/inquiries`);
            setInquiries(data);
            setLoading(false);
        } catch (err) {
            console.error("[INQUIRY]: Failed to fetch inquiries", err);
            setLoading(false);
        }
    };

    const fetchMessages = async (id) => {
        if (!id) return;
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/inquiries/${id}/messages`);
            setMessages(data);
        } catch (err) {
            console.error("[INQUIRY]: Failed to fetch messages", err);
        }
    };

    // Live sync polling
    useEffect(() => {
        fetchInquiries();
        const interval = setInterval(fetchInquiries, 10000); // 10s polling for admin
        return () => clearInterval(interval);
    }, []);

    // Thread polling
    useEffect(() => {
        if (!selectedInquiry) {
            setMessages([]);
            return;
        }
        fetchMessages(selectedInquiry.id);
        const interval = setInterval(() => fetchMessages(selectedInquiry.id), 5000);
        return () => clearInterval(interval);
    }, [selectedInquiry]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.patch(`${API_BASE_URL}/api/inquiries/${id}/status`, { status });
            toast.success(`Status updated to ${status}`);
            fetchInquiries(); // Sync immediately
            if (selectedInquiry?.id === id) {
                setSelectedInquiry(prev => ({ ...prev, status }));
            }
        } catch (err) {
            toast.error("Status update failed.");
        }
    };

    const confirmDelete = (iq) => {
        setInquiryToDelete(iq);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!inquiryToDelete) return;

        setIsDeleting(true);
        try {
            await axios.delete(`${API_BASE_URL}/api/inquiries/${inquiryToDelete.id}`);
            toast.success("Inquiry and message thread purged.");
            setInquiries(prev => prev.filter(iq => iq.id !== inquiryToDelete.id));

            if (selectedInquiry?.id === inquiryToDelete.id) setSelectedInquiry(null);
            setIsDeleteModalOpen(false);
            setInquiryToDelete(null);
        } catch (err) {
            toast.error("Purge failure. Cloud sync check required.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        if (!reply.trim() || !selectedInquiry) return;

        const messageText = reply.trim();
        setReply(""); // Optimistic clear

        try {
            await axios.post(`${API_BASE_URL}/api/inquiries/${selectedInquiry.id}/messages`, {
                text: messageText,
                sender: "Admin",
                senderName: userData?.displayName || "System Architect"
            });

            toast.success("Security response dispatched.");
            fetchMessages(selectedInquiry.id);
            fetchInquiries(); // Update status in list
        } catch (err) {
            console.error("Transmission Error:", err);
            setReply(messageText); // Restore on failure
            const errorMsg = err.response?.status === 404 
                ? "Backend route not found. Cloud sync deployment required." 
                : "Handshake failure. Sync re-check required.";
            toast.error(errorMsg);
        }
    };

    const filteredInquiries = inquiries.filter(iq =>
        iq.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        iq.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        iq.id?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8EDEB] text-black flex flex-col overflow-x-hidden font-['Mulish']">
            <AdminNav />

            <main className="flex-1 p-4 sm:p-8 lg:p-12 pb-28 lg:pb-12 max-w-[1600px] mx-auto w-full">
                {/* NAVIGATION SPACER */}
                <div className="h-24 sm:h-28 lg:h-32" />

                <header className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Communication Network</p>
                        <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight leading-none capitalize">Inquiry Hub</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative group w-full sm:w-auto">
                            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-black transition-colors" />
                            <input
                                type="text"
                                placeholder="Audit identity stream..."
                                className="pl-16 pr-8 py-5 rounded-2xl bg-white border border-zinc-100 text-sm font-bold focus:ring-[12px] focus:ring-black/5 focus:border-black/20 outline-none transition-all w-full sm:w-96 shadow-sm placeholder:text-zinc-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-6 py-5 rounded-2xl bg-black text-white shadow-xl shadow-black/10">
                            <FiActivity className="animate-pulse text-[#7BB9D4]" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{filteredInquiries.length} Active Nodes</span>
                        </div>
                    </div>
                </header>

                <div className="w-full">
                    <div className="bg-white border border-zinc-100 rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden">

                        {/* MOBILE CARDS (< md) */}
                        <div className="md:hidden divide-y divide-zinc-50">
                            {filteredInquiries.length > 0 ? (
                                filteredInquiries.map((iq) => (
                                    <div key={iq.id} className="p-6 hover:bg-zinc-50 transition-all active:bg-zinc-100">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="space-y-1">
                                                <p className="font-black text-lg text-black tracking-tight leading-none">{iq.name}</p>
                                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{iq.email}</p>
                                            </div>
                                            <div className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                                                iq.status === 'Unread' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' :
                                                iq.status === 'Resolved' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' :
                                                'bg-black text-white'}`}>
                                                {iq.status}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-6">
                                            <span className="text-[9px] font-black uppercase tracking-widest bg-zinc-100 border border-zinc-200/50 px-3 py-2 rounded-xl text-zinc-500">{iq.vector}</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setSelectedInquiry(iq)}
                                                    className="px-6 py-2.5 rounded-xl bg-black text-white font-black uppercase tracking-widest text-[9px] active:scale-95 transition-all shadow-lg"
                                                >
                                                    Audit
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(iq)}
                                                    className="w-10 h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center active:scale-95 border border-red-100"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : null}
                        </div>

                        {/* DESKTOP TABLE (≥ md) */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-zinc-50 bg-[#fafafa]">
                                        <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Identity Origin</th>
                                        <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Primary Vector</th>
                                        <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Network Status</th>
                                        <th className="px-10 py-6 text-right text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Operational Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInquiries.length > 0 ? (
                                        <AnimatePresence>
                                            {filteredInquiries.map((iq, idx) => (
                                                <motion.tr
                                                    key={iq.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.03 }}
                                                    className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-all group"
                                                >
                                                    <td className="px-10 py-8">
                                                        <div className="flex flex-col">
                                                            <span className="text-black font-black tracking-tight text-lg leading-none">{iq.name}</span>
                                                            <span className="text-[11px] text-zinc-400 font-bold tracking-tight mt-1.5">{iq.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white border border-zinc-100 shadow-sm">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-800">{iq.vector}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-2 h-2 rounded-full ${
                                                                iq.status === 'Unread' ? 'bg-amber-500 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.5)]' :
                                                                iq.status === 'Resolved' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 
                                                                'bg-black'
                                                            }`}></div>
                                                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                                                                iq.status === 'Unread' ? 'text-amber-500' : 'text-zinc-500'
                                                            }`}>{iq.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-8 text-right">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <button
                                                                onClick={() => setSelectedInquiry(iq)}
                                                                className="px-6 py-3 rounded-xl bg-black text-white font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-black/5"
                                                            >
                                                                Audit Brief
                                                            </button>
                                                            <button
                                                                onClick={() => confirmDelete(iq)}
                                                                className="w-11 h-11 rounded-xl bg-red-50 text-red-400 hover:text-red-500 hover:bg-red-100 transition-all flex items-center justify-center active:scale-95 border border-red-100/50"
                                                            >
                                                                <FiTrash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    ) : null}
                                </tbody>
                            </table>
                        </div>

                        {filteredInquiries.length === 0 && (
                            <div className="px-10 py-40 text-center">
                                <div className="space-y-6">
                                    <div className="w-20 h-20 bg-zinc-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-zinc-100">
                                        <FiMessageSquare size={32} className={`text-zinc-200 ${loading ? 'animate-bounce' : ''}`} />
                                    </div>
                                    <p className="font-black uppercase tracking-[0.5em] text-sm text-zinc-300">
                                        {loading ? "Initializing Identity Stream..." : "No Communication Nodes Found"}
                                    </p>
                                    {loading && (
                                        <div className="w-48 h-1 bg-zinc-100 rounded-full mx-auto overflow-hidden">
                                            <div className="w-full h-full bg-black/10 animate-pulse"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* --- INQUIRY PREVIEW & CHAT MODAL --- */}
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
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white border border-zinc-100 w-full max-w-5xl rounded-3xl flex flex-col md:flex-row h-[90vh] sm:h-[80vh] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] relative z-10 overflow-hidden font-['Mulish']"
                        >
                            {/* LEFT SIDE: DETAILS */}
                            <div className="w-full md:w-80 bg-[#fbfbfb] border-r border-zinc-100 p-8 flex flex-col justify-between">
                                <div className="space-y-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shadow-xl">
                                            <FiMessageSquare size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-black tracking-tight leading-none">Inquiry Hub</h3>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-1">ID: {selectedInquiry.id.slice(0, 8)}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Subject Origin</p>
                                            <p className="text-xl font-black text-black leading-tight">{selectedInquiry.name}</p>
                                            <p className="text-xs font-bold text-zinc-500">{selectedInquiry.email}</p>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Primary Vector</p>
                                            <div className="inline-flex px-3 py-1.5 bg-white border border-zinc-100 rounded-lg font-black uppercase tracking-widest text-[9px] text-zinc-800 shadow-sm">
                                                {selectedInquiry.vector}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Network Status</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['Unread', 'Processing', 'Resolved'].map(s => (
                                                    <button
                                                        key={s}
                                                        onClick={() => handleStatusUpdate(selectedInquiry.id, s)}
                                                        className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedInquiry.status === s
                                                            ? 'bg-black text-white shadow-lg'
                                                            : 'bg-white border border-zinc-100 text-zinc-400 hover:text-black hover:border-black/20'
                                                            }`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedInquiry(null)}
                                    className="w-full py-4 rounded-xl bg-white text-zinc-400 font-black uppercase tracking-widest text-[10px] hover:bg-zinc-50 transition-all border border-zinc-100 shadow-sm"
                                >
                                    Dismiss Brief
                                </button>
                            </div>

                            {/* RIGHT SIDE: CHAT */}
                            <div className="flex-1 flex flex-col bg-white">
                                {/* Chat Header (Mobile Only) */}
                                <div className="md:hidden p-4 border-b border-zinc-100 flex items-center justify-between">
                                    <span className="font-black text-sm uppercase tracking-widest">Communication Thread</span>
                                    <button onClick={() => setSelectedInquiry(null)} className="text-zinc-400">✕</button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 custom-scrollbar">
                                    {/* Initial Brief Bubble */}
                                    <div className="flex flex-col items-start max-w-[90%] sm:max-w-[80%]">
                                        <div className="bg-[#f3f4f6] border border-zinc-200/50 p-6 rounded-2xl rounded-tl-none relative shadow-sm">
                                            <p className="text-sm font-bold text-zinc-800 leading-relaxed">
                                                {selectedInquiry.brief}
                                            </p>
                                        </div>
                                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300 mt-2 ml-2">
                                            Initial Sync • {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleDateString() : 'Historical'}
                                        </span>
                                    </div>

                                    {/* Thread Messages */}
                                    <div className="space-y-6">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={`flex flex-col ${msg.sender === 'Admin' ? 'items-end' : 'items-start'}`}>
                                                <div className={`p-4 px-6 rounded-2xl max-w-[85%] text-sm font-bold shadow-sm ${msg.sender === 'Admin'
                                                    ? 'bg-black text-white rounded-tr-none'
                                                    : 'bg-white border border-zinc-100 text-zinc-800 rounded-tl-none'
                                                    }`}>
                                                    <p className="leading-relaxed">{msg.text}</p>
                                                </div>
                                                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300 mt-2 px-2">
                                                    {msg.sender === 'Admin' ? 'Identity Architect' : msg.sender} • {msg.createdAt ? (
                                                        typeof msg.createdAt === 'string'
                                                            ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                            : msg.createdAt.toDate?.()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Syncing'
                                                    ) : 'Syncing'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Message Input Area */}
                                <div className="p-6 sm:p-8 border-t border-zinc-50 bg-[#fbfbfb]/50">
                                    <form onSubmit={handleReply} className="relative flex items-center gap-3">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                value={reply}
                                                onChange={(e) => setReply(e.target.value)}
                                                placeholder="Enter secure response..."
                                                className="w-full bg-white border border-zinc-200 px-6 py-5 rounded-2xl text-sm font-bold text-black outline-none focus:ring-4 focus:ring-black/5 focus:border-black/20 transition-all placeholder:text-zinc-300 shadow-sm"
                                            />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-20">
                                                <FiActivity size={14} />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center hover:bg-zinc-800 transition-all shadow-xl active:scale-95 flex-shrink-0"
                                        >
                                            <FiSend size={20} />
                                        </button>
                                    </form>
                                    <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-300 mt-4 text-center">
                                        Secure end-to-end identity transmission protocol active
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* DELETE CONFIRMATION MODAL */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => { setIsDeleteModalOpen(false); setInquiryToDelete(null); }}
                onConfirm={handleDelete}
                title="Purge Inquiry Thread"
                message={`Are you sure you want to permanently delete the inquiry from ${inquiryToDelete?.name}? This will also wipe the entire message thread from the network.`}
                confirmText="Purge Identity Thread"
                isLoading={isDeleting}
            />

            {/* Mobile Footer Navigation */}
            <MobileFooter userData={userData} />
        </div>
    );
};

export default Inquiry;
