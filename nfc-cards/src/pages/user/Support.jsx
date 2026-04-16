import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { db, auth } from '../../firebase.config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Layout from '../../components/layout/layout';

const Support = ({ userData }) => {
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [formData, setFormData] = useState({
        vector: 'Technical Infrastructure',
        brief: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.brief.trim()) return;

        setIsSending(true);
        try {
            await addDoc(collection(db, "inquiries"), {
                uid: auth.currentUser?.uid || 'anonymous',
                name: userData?.displayName || 'User',
                email: userData?.email || 'unknown',
                vector: formData.vector,
                brief: formData.brief,
                status: 'Unread',
                createdAt: serverTimestamp()
            });
            setSent(true);
            toast.success("Security brief dispatched.");
            setFormData({ ...formData, brief: '' });
        } catch (error) {
            console.error("Communication failure:", error);
            toast.error("Network synchronization failed.");
        } finally {
            setIsSending(false);
        }
    };

    // SHARED THEME
    const brandColor = "#7BB9D4";

    return (
        <Layout userData={userData} title="Support Terminal">
            <div className="w-full mb-20 space-y-8 animate-in fade-in duration-1000">
                {/* Header */}
                <header className="flex flex-col gap-4 border-b border-black/[0.05] dark:border-black/[0.1] pb-8">
                    <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-6 bg-[#7BB9D4] rounded-full shadow-lg`}></div>
                        <span className="text-[10px] font-black text-black dark:text-black uppercase tracking-[0.4em] opacity-40">Operational Support</span>
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black text-foreground dark:text-black tracking-tighter">Support Terminal</h2>
                        <p className="text-muted-foreground font-bold tracking-tight text-sm opacity-50 dark:text-black/40 italic">Direct neural link to our technical architecture team. Dispatch your operational briefs here.</p>
                    </div>
                </header>

                <div className="max-w-full mx-auto">
                    {/* --- COMM CONSOLE --- */}
                    <div className={`bg-white dark:bg-white p-8 md:p-12 lg:p-14 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-100 relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7BB9D4]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        
                        <AnimatePresence mode="wait">
                            {!sent ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-10 relative z-10"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7BB9D4] ml-1">Inquiry Vector</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full px-8 py-5 rounded-2xl bg-gray-50 dark:bg-gray-50 border border-gray-100 dark:border-gray-200 text-black dark:text-black focus:ring-4 focus:ring-[#7BB9D4]/10 focus:border-[#7BB9D4]/40 outline-none transition-all font-black uppercase tracking-[0.2em] text-[11px] appearance-none cursor-pointer"
                                                    value={formData.vector}
                                                    onChange={(e) => setFormData({ ...formData, vector: e.target.value })}
                                                >
                                                    <option>Technical Infrastructure</option>
                                                    <option>Identity Management</option>
                                                    <option>Commercial Protocols</option>
                                                    <option>Feature Requests</option>
                                                </select>
                                                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-black dark:text-black">
                                                    <FiMessageSquare size={14} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7BB9D4] ml-1">Communication Brief</label>
                                            <textarea
                                                rows="6"
                                                required
                                                className="w-full px-8 py-7 rounded-[2rem] bg-gray-50 dark:bg-gray-50 border border-gray-100 dark:border-gray-200 text-black dark:text-black focus:ring-4 focus:ring-[#7BB9D4]/10 focus:border-[#7BB9D4]/40 outline-none transition-all font-bold placeholder:opacity-30 resize-none text-sm"
                                                placeholder="Describe your operational requirements..."
                                                value={formData.brief}
                                                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <button
                                        disabled={isSending}
                                        className="w-full group py-6 rounded-2xl bg-[#7BB9D4] text-white font-black uppercase tracking-[0.3em] text-[11px] hover:scale-[1.01] hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-xl shadow-[#7BB9D4]/20"
                                    >
                                        {isSending ? (
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <FiSend size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        )}
                                        {isSending ? "Dispatching..." : "Dispatch Message"}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-20 relative z-10"
                                >
                                    <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                                        <FiCheckCircle size={48} />
                                    </div>
                                    <h3 className="text-4xl font-black text-black dark:text-black tracking-tighter mb-4">Transmission Successful</h3>
                                    <p className="text-zinc-500 dark:text-black/40 font-bold mb-10 max-w-sm mx-auto text-base">Your operational brief has been synchronized with our support node infrastructure.</p>
                                    <button
                                        onClick={() => setSent(false)}
                                        className="px-12 py-5 bg-[#7BB9D4] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl shadow-[#7BB9D4]/20"
                                    >
                                        New Transmission
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* --- FOOTER BRIEF --- */}
                    <div className="mt-12 p-10 rounded-[2.5rem] bg-white dark:bg-white border border-slate-100 dark:border-slate-100 flex flex-col items-center text-center gap-4 shadow-sm">
                        <div className="p-4 rounded-2xl bg-[#7BB9D4]/10 text-[#7BB9D4]">
                            <FiMessageSquare size={24} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-black/30">Secure Administrative Handshake Enabled</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Support;
