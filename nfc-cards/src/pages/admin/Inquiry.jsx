import React, { useState, useEffect } from 'react';
import { db } from '../../firebase.config';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiMail, FiPhone, FiSearch, FiCheckCircle,
    FiMessageSquare, FiTrash2, FiMaximize2, FiActivity, FiSend
} from 'react-icons/fi';
import AdminNav from '../../components/layout/AdminNav';
import TopNav from '../../components/layout/TopNav';
import toast from 'react-hot-toast';
import logo from '../../assets/logo (2).png';

const Inquiry = ({ userData }) => {
    const [inquiries, setInquiries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [reply, setReply] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch live inquiries
    useEffect(() => {
        const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setInquiries(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Fetch messages for selected inquiry
    useEffect(() => {
        if (!selectedInquiry) {
            setTimeout(() => setMessages([]), 0);
            return;
        }

        const q = query(
            collection(db, "inquiries", selectedInquiry.id, "messages"),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(data);
        });

        return () => unsubscribe();
    }, [selectedInquiry]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateDoc(doc(db, "inquiries", id), { status });
            toast.success(`Status updated to ${status}`);
        } catch (err) {
            toast.error("Status update failed.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Permanent deletion protocol?")) return;
        try {
            await deleteDoc(doc(db, "inquiries", id));
            toast.success("Inquiry purged.");
            if (selectedInquiry?.id === id) setSelectedInquiry(null);
        } catch (err) {
            toast.error("Purge failure.");
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        if (!reply.trim() || !selectedInquiry) return;

        const messageText = reply.trim();
        setReply(""); // Optimistic clear

        try {
            // 1. Dispatch message to thread sub-collection
            await addDoc(collection(db, "inquiries", selectedInquiry.id, "messages"), {
                text: messageText,
                sender: "Admin",
                senderName: userData?.displayName || "System Architect",
                createdAt: serverTimestamp(),
            });

            // 2. Automate status transition to priority processing
            if (selectedInquiry.status === "Unread") {
                await updateDoc(doc(db, "inquiries", selectedInquiry.id), {
                    status: "Processing",
                    lastUpdated: serverTimestamp()
                });
            } else {
                // Just update the timestamp for sorting
                await updateDoc(doc(db, "inquiries", selectedInquiry.id), {
                    lastUpdated: serverTimestamp()
                });
            }

            toast.success("Security response dispatched.");
        } catch (err) {
            console.error("Transmission Error:", err);
            setReply(messageText); // Restore on failure
            toast.error("Handshake failure. Sync re-check required.");
        }
    };

    const filteredInquiries = inquiries.filter(iq =>
        iq.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        iq.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        iq.id?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-zinc-50 text-black flex flex-col overflow-x-hidden">
            <TopNav title="Operational Inbox" />
            <AdminNav />

            <main className="flex-1 p-6 lg:p-12 mt-20 max-w-[1600px] mx-auto w-full">
                <header className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-10 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="flex-1">
                        <img src={logo} alt="Logo" className="h-4 object-contain mb-4 opacity-50" />
                        <h2 className="text-4xl font-black text-black tracking-tighter capitalize">Inquiry Hub</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-black transition-colors" />
                            <input
                                type="text"
                                placeholder="Audit Inbox..."
                                className="pl-14 pr-6 py-4 rounded-2xl bg-white border border-zinc-100 text-sm font-bold focus:ring-4 focus:ring-black/5 focus:border-black/20 outline-none transition-all w-full sm:w-80 shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                <div className="w-full">
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
                                    {loading ? (
                                        Array.from({ length: 8 }).map((_, i) => (
                                            <tr key={i} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-all">
                                                <td className="px-10 py-10"><div className="w-48 h-12 skeleton-box rounded-2xl" /></td>
                                                <td className="px-10 py-10"><div className="w-32 h-8 skeleton-box rounded-xl" /></td>
                                                <td className="px-10 py-10"><div className="w-24 h-6 skeleton-box rounded-full" /></td>
                                                <td className="px-10 py-10 text-right"><div className="w-24 h-11 skeleton-box rounded-2xl ml-auto" /></td>
                                            </tr>
                                        ))
                                    ) : filteredInquiries.length > 0 ? (
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
                                                            <div className={`w-2 h-2 rounded-full ${iq.status === 'Unread' ? 'bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]' :
                                                                iq.status === 'Resolved' ? 'bg-emerald-500' : 'bg-black'
                                                                }`}></div>
                                                            <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${iq.status === 'Unread' ? 'text-amber-500' : 'text-zinc-500'
                                                                }`}>{iq.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-9 text-right">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <button
                                                                onClick={() => setSelectedInquiry(iq)}
                                                                className="px-6 py-2.5 rounded-xl bg-black text-white font-black uppercase tracking-[0.2em] text-[10px] hover:brightness-125 transition-all shadow-lg active:scale-95"
                                                            >
                                                                Audit Brief
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(iq.id)}
                                                                className="w-10 h-10 rounded-xl bg-red-50 text-red-400 hover:text-red-500 hover:bg-red-100 transition-all flex items-center justify-center"
                                                            >
                                                                <FiTrash2 size={16} />
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

                        {!loading && filteredInquiries.length === 0 && (
                            <div className="px-10 py-32 text-center opacity-30">
                                <FiMessageSquare size={48} className="mx-auto mb-6 text-black animate-pulse" />
                                <p className="font-black uppercase tracking-[0.4em] text-xs text-black">No active inquiries in priority buffer</p>
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
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white border border-zinc-100 w-full max-w-4xl rounded-[3.5rem] flex flex-col md:flex-row h-[85vh] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative z-10 overflow-hidden font-['Mulish']"
                        >
                            {/* LEFT SIDE: DETAILS */}
                            <div className="w-full md:w-80 bg-zinc-50/50 border-r border-zinc-100 p-10 flex flex-col justify-between">
                                <div className="space-y-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-2xl">
                                            <FiMessageSquare size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-black tracking-tighter">Inquiry Node</h3>
                                            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-0.5">Audit: {selectedInquiry.id.slice(0, 8)}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Subject Origin</p>
                                            <p className="text-base font-black text-black">{selectedInquiry.name}</p>
                                            <p className="text-[10px] font-bold text-zinc-500">{selectedInquiry.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Vector</p>
                                            <div className="inline-flex px-3 py-1 bg-white border border-zinc-100 rounded-lg font-black uppercase tracking-[0.1em] text-[9px] text-zinc-700">
                                                {selectedInquiry.vector}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">System Status</p>
                                            <div className="flex flex-wrap gap-2">
                                                {['Unread', 'Processing', 'Resolved'].map(s => (
                                                    <button
                                                        key={s}
                                                        onClick={() => handleStatusUpdate(selectedInquiry.id, s)}
                                                        className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${selectedInquiry.status === s
                                                            ? 'bg-black text-white shadow-lg'
                                                            : 'bg-white border border-zinc-100 text-zinc-400 hover:text-black'
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
                                    className="w-full py-4 rounded-2xl bg-zinc-100 text-zinc-400 font-black uppercase tracking-[0.2em] text-[9px] hover:bg-zinc-200 transition-all border border-zinc-200"
                                >
                                    Terminate Audit
                                </button>
                            </div>

                            {/* RIGHT SIDE: CHAT */}
                            <div className="flex-1 flex flex-col bg-white">
                                <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                                    <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-[2.5rem] rounded-tl-none relative mb-12">
                                        <span className="absolute -top-3 left-0 bg-black text-white px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Initialization Brief</span>
                                        <p className="text-sm font-bold text-zinc-800 leading-relaxed italic">
                                            "{selectedInquiry.brief}"
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={`flex flex-col ${msg.sender === 'Admin' ? 'items-end' : 'items-start'}`}>
                                                <div className={`p-5 rounded-3xl max-w-[85%] text-sm font-bold shadow-sm ${msg.sender === 'Admin'
                                                    ? 'bg-black text-white rounded-tr-none'
                                                    : 'bg-zinc-50 border border-zinc-100 text-zinc-800 rounded-tl-none'
                                                    }`}>
                                                    <p>{msg.text}</p>
                                                </div>
                                                <span className="text-[7px] font-black uppercase tracking-widest text-zinc-400 mt-1.5 px-2">
                                                    {msg.sender} • {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Syncing...'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <form onSubmit={handleReply} className="p-8 border-t border-zinc-50 flex gap-4 items-center">
                                    <input
                                        type="text"
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        placeholder="Enter secure response..."
                                        className="flex-1 bg-zinc-50 border border-zinc-100 px-8 py-5 rounded-2xl text-sm font-bold text-black outline-none focus:ring-4 focus:ring-black/5 focus:border-black/20 transition-all"
                                    />
                                    <button
                                        type="submit"
                                        className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center hover:brightness-125 transition-all shadow-xl active:scale-95"
                                    >
                                        <FiSend size={20} />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Inquiry;
