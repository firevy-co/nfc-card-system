import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '@/firebase.config';
import { collection, query, where, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { FiBell, FiMessageSquare, FiClock, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotificationCenter = ({ isAdmin, theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!auth.currentUser) return;

        let q;
        if (isAdmin) {
            // Admins see all Unread inquiries
            q = query(
                collection(db, "inquiries"),
                where("status", "==", "Unread"),
                limit(20) // Fetch a larger buffer to sort in JS
            );
        } else {
            // Users see Processing inquiries (replied by admin)
            q = query(
                collection(db, "inquiries"),
                where("uid", "==", auth.currentUser.uid),
                where("status", "==", "Processing"),
                limit(20)
            );
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Manual sorting in memory to avoid needing composite indexes
            if (isAdmin) {
                data.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
            } else {
                data.sort((a, b) => (b.lastUpdated?.toMillis?.() || 0) - (a.lastUpdated?.toMillis?.() || 0));
            }

            setNotifications(data.slice(0, 5)); // Final slice for UI
            setUnreadCount(data.length);
        });

        return () => unsubscribe();
    }, [isAdmin]);

    const handleNotificationClick = (id) => {
        setIsOpen(false);
        if (isAdmin) {
            navigate('/admin/inquiry');
        } else {
            navigate('/user/support');
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2.5 rounded-full transition-all relative group ${
                    theme === 'dark' 
                    ? 'text-zinc-400 hover:text-white hover:bg-white/10' 
                    : 'text-zinc-500 hover:text-black hover:bg-black/10'
                }`}
            >
                <FiBell size={20} className={isOpen ? 'scale-110' : ''} />
                {unreadCount > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-4 ring-current border border-white dark:border-zinc-950 animate-pulse"></span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        className={`fixed sm:absolute inset-x-4 sm:inset-x-auto sm:right-0 top-[80px] sm:top-auto sm:mt-4 sm:w-96 rounded-[2.5rem] sm:rounded-[2rem] border shadow-2xl overflow-hidden z-[100] ${
                            theme === 'dark'
                            ? 'bg-zinc-900 border-white/10 text-white'
                            : 'bg-white border-black/5 text-black'
                        }`}
                    >
                        <div className="p-4 sm:p-6 border-b border-current/5 flex items-center justify-between">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Identity Signal Buffer</h4>
                            <span className="text-[8px] font-black px-2 py-1 bg-current/10 rounded-full">
                                {unreadCount} Priority
                            </span>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {notifications.length > 0 ? (
                                notifications.map((notif) => (
                                    <div 
                                        key={notif.id}
                                        onClick={() => handleNotificationClick(notif.id)}
                                        className={`p-4 sm:p-6 border-b border-current/5 hover:bg-current/[0.02] cursor-pointer transition-all animate-in slide-in-from-right-4`}
                                    >
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-current/5 flex items-center justify-center shrink-0">
                                                <FiMessageSquare size={16} />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-xs font-black leading-tight line-clamp-1">
                                                    {isAdmin ? `Inquiry from ${notif.name}` : `Admin Reply: ${notif.vector}`}
                                                </p>
                                                <p className="text-[10px] font-bold opacity-40 line-clamp-2">
                                                    {notif.brief || "Direct neural link transmission received."}
                                                </p>
                                                <div className="flex items-center gap-2 pt-2 opacity-30 text-[8px] font-black uppercase tracking-widest">
                                                    <FiClock />
                                                    {notif.createdAt?.toDate ? notif.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-12 sm:py-20 text-center space-y-4">
                                    <FiCheckCircle size={32} className="mx-auto opacity-10" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">All identity nodes synced</p>
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={() => {
                                setIsOpen(false);
                                navigate(isAdmin ? '/admin/inquiry' : '/user/support');
                            }}
                            className="w-full py-5 text-[9px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 hover:bg-current/[0.05] transition-all"
                        >
                            Operational Log Entry →
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationCenter;

