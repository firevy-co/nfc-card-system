import React, { useState, useEffect } from "react";
import { db, auth } from '@/firebase.config';
import { collection, addDoc, serverTimestamp, query, where, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { FiSend, FiMessageSquare, FiClock, FiCheckCircle, FiActivity } from 'react-icons/fi';
import toast from "react-hot-toast";
import Layout from "../../components/layout/layout";

const Support = ({ userData }) => {
    const [formData, setFormData] = useState({
        category: "Technical Issue",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [selectedConv, setSelectedConv] = useState(null);
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState("");

    useEffect(() => {
        if (!auth.currentUser) return;

        const q = query(
            collection(db, "inquiries"),
            where("uid", "==", auth.currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Memory-side sorting to bypass composite index requirements
            data.sort((a, b) => {
                const timeA = a.createdAt?.toMillis?.() || 0;
                const timeB = b.createdAt?.toMillis?.() || 0;
                return timeB - timeA;
            });

            setConversations(data);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!selectedConv) {
            setMessages([]);
            return;
        }

        const q = query(
            collection(db, "inquiries", selectedConv.id, "messages"),
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
    }, [selectedConv]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.message.trim()) return;

        setLoading(true);
        try {
            await addDoc(collection(db, "inquiries"), {
                uid: auth.currentUser?.uid || "anonymous",
                name: userData?.displayName || "User",
                email: userData?.email || "unknown",
                vector: formData.category,
                brief: formData.message,
                status: "Unread",
                createdAt: serverTimestamp(),
            });

            toast.success("Support brief dispatched!");
            setFormData({ ...formData, message: "" });
        } catch (err) {
            console.error(err);
            toast.error("Network synchronization failure.");
        } finally {
            setLoading(false);
        }
    };

    const handleReply = async (convId) => {
        if (!reply.trim()) return;
        const msgText = reply.trim();
        setReply(""); // Optimistic UI clear

        try {
            await addDoc(collection(db, "inquiries", convId, "messages"), {
                text: msgText,
                sender: "User",
                senderName: userData?.displayName || "User",
                createdAt: serverTimestamp(),
            });

            // Update main document for sorting/status
            await updateDoc(doc(db, "inquiries", convId), {
                lastUpdated: serverTimestamp(),
                status: "Processing" // Re-activate thread if user replies
            });

            toast.success("Identity pulse dispatched!");
        } catch (err) {
            console.error("Chat Sync Error:", err);
            setReply(msgText); // Restore on error
            toast.error("Handshake synchronization failed.");
        }
    };

    return (
        <Layout userData={userData} title="Support Terminal">
            <div className="w-full mb-20 mt-4 sm:mt-10 space-y-8 sm:space-y-12 animate-in fade-in duration-1000 font-['Mulish']">

                {/* Header Section */}
                <header className="flex flex-col gap-3 border-b border-black/[0.05] pb-6 sm:pb-10">
                    <div className="space-y-1">
                        <h2 className="text-2xl sm:text-4xl font-black text-foreground">Support Terminal</h2>
                        <p className="text-muted-foreground font-bold tracking-tight text-sm opacity-60">Direct neural link to technical architecture templates. Dispatch your operational briefs below.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-start">

                    {/* INQUIRY CONSOLE */}
                    <div className="bg-white rounded-xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-50 p-6 sm:p-8 md:p-14 relative overflow-hidden group transition-all duration-700 hover:shadow-[0_40px_120px_-20px_rgba(123,185,212,0.15)]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7BB9D4]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-[#7BB9D4]/10 transition-all duration-1000" />

                        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7BB9D4] ml-1">Inquiry Vector</label>
                                    <div className="relative">
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-slate-100 border border-slate-200 px-8 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] outline-none focus:ring-4 focus:ring-[#7BB9D4]/10 focus:border-[#7BB9D4]/40 transition-all appearance-none cursor-pointer"
                                        >
                                            <option>Technical Issue</option>
                                            <option>Account Problem</option>
                                            <option>Billing Inquiry</option>
                                            <option>Feature Request</option>
                                        </select>
                                        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                            <FiActivity size={14} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7BB9D4] ml-1">Operational Brief</label>
                                    <textarea
                                        rows="6"
                                        required
                                        placeholder="Detail your request or inquiry here..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-slate-100 border border-slate-200 px-8 py-6 rounded-xl text-sm font-bold text-gray-700 outline-none focus:ring-4 focus:ring-[#7BB9D4]/10 focus:border-[#7BB9D4]/40 transition-all resize-none placeholder:opacity-30"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group py-6 rounded-2xl bg-gray-700 text-white font-black uppercase tracking-[0.3em] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl shadow-[#7BB9D4]/30"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <FiSend size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        <span>Dispatch Protocol</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* CONVERSATION HISTORY (Continuous Chat Section) */}
                    <div className="bg-white rounded-xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-50 p-6 sm:p-8 md:p-14 space-y-8 sm:space-y-10 transition-all duration-700 hover:shadow-[0_40px_120px_-20px_rgba(123,185,212,0.15)]">
                        <div className="flex items-center justify-between px-4">
                            <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                                <FiMessageSquare className="text-[#7BB9D4]" />
                                Conversation Log
                            </h3>
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                                {conversations.length} Active Templates
                            </span>
                        </div>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {conversations.length > 0 ? (
                                conversations.map((conv) => (
                                    <div
                                        key={conv.id}
                                        onClick={() => setSelectedConv(conv)}
                                        className={`bg-slate-50/50 border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer ${selectedConv?.id === conv.id ? 'border-[#7BB9D4] ring-2 ring-[#7BB9D4]/10 bg-white' : 'border-slate-100 hover:bg-white'}`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-slate-100 text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">
                                                    {conv.vector}
                                                </div>
                                                <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-relaxed">
                                                    {conv.brief}
                                                </p>
                                            </div>
                                            <div className={`px-2 py-1 rounded-md text-[7px] font-black uppercase tracking-widest ${conv.status === 'Unread' ? 'bg-amber-500/10 text-amber-500' :
                                                conv.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    'bg-[#7BB9D4]/10 text-[#7BB9D4]'
                                                }`}>
                                                {conv.status}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 text-[9px] text-slate-300 font-bold">
                                            <div className="flex items-center gap-2">
                                                <FiClock size={10} />
                                                {conv.createdAt?.toDate ? conv.createdAt.toDate().toLocaleDateString() : 'Syncing...'}
                                            </div>
                                            <div className="text-[#7BB9D4] font-black uppercase tracking-widest invisible group-hover:visible">
                                                View Thread →
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-slate-100 rounded-xl border border-dashed border-slate-200">
                                    <FiMessageSquare size={32} className="mx-auto text-slate-300 mb-4 opacity-20" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">No communication logs found</p>
                                </div>
                            )}
                        </div>

                        {/* Encrypted Handshake Info */}
                        <div className="p-6 rounded-[2rem] bg-[#7BB9D4]/5 border border-[#7BB9D4]/10 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7BB9D4] shadow-sm">
                                <FiCheckCircle size={20} />
                            </div>
                            <p className="text-[10px] font-bold text-slate-500 leading-tight">Secure administrative handshake enabled. All transmissions are encrypted via the Identity Template network.</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Chat Thread Backdrop/Modal (Simple implementation for "Continues Chat") */}
            {selectedConv && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedConv(null)}></div>
                    <div className="bg-white w-full max-w-2xl rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-10 relative z-10 shadow-2xl border border-slate-100 flex flex-col h-[85vh]">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h4 className="text-2xl font-black tracking-tighter">Template Brief: {selectedConv.vector}</h4>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Ref: {selectedConv.id}</p>
                            </div>
                            <button onClick={() => setSelectedConv(null)} className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-all">✕</button>
                        </div>

                        <div className="flex-1 overflow-y-auto mb-8 space-y-6 pr-4 custom-scrollbar bg-slate-50/50 rounded-[2rem] p-6">
                            <div className="bg-white border border-slate-100 p-6 rounded-3xl rounded-tl-none shadow-sm max-w-[85%] self-start relative mb-4">
                                <span className="absolute -top-3 left-0 text-[8px] font-black text-[#7BB9D4] uppercase tracking-widest">Initial Dispatch</span>
                                <p className="text-sm font-bold text-slate-700 leading-relaxed italic">"{selectedConv.brief}"</p>
                            </div>

                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.sender === 'User' ? 'items-end' : 'items-start'}`}>
                                    <div className={`p-5 rounded-3xl max-w-[85%] text-sm font-bold shadow-sm ${msg.sender === 'User'
                                        ? 'bg-[#7BB9D4] text-white rounded-tr-none'
                                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                                        }`}>
                                        <p>{msg.text}</p>
                                    </div>
                                    <span className="text-[7px] font-black uppercase tracking-widest text-slate-400 mt-1.5 px-2">
                                        {msg.sender} • {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Syncing...'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4 items-center p-2 bg-slate-50 rounded-2xl border border-slate-100 focus-within:ring-4 focus-within:ring-[#7BB9D4]/10 transition-all">
                            <input
                                type="text"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder="Neural link response..."
                                className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-sm font-bold text-slate-700"
                                onKeyPress={(e) => e.key === 'Enter' && handleReply(selectedConv.id)}
                            />
                            <button
                                onClick={() => handleReply(selectedConv.id)}
                                className="w-12 h-12 rounded-xl bg-[#7BB9D4] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                            >
                                <FiSend size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Support;
