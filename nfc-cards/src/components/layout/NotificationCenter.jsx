import React, { useState, useEffect, useRef } from 'react';
import { auth } from '@/firebase.config';
import { FiBell, FiMessageSquare, FiClock, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from "../../config/api";

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

    const fetchNotifications = async () => {
        if (!auth.currentUser) return;
        try {
            const params = isAdmin ? {} : { uid: auth.currentUser.uid };
            const { data } = await axios.get(`${API_BASE_URL}/api/inquiries`, { params });
            
            // Filter by unread status - being inclusive of legacy 'Unread' and new 'Replied' statuses
            const unreadItems = data.filter(iq => {
                const status = iq.status?.toLowerCase();
                if (isAdmin) {
                    return iq.adminUnread === true || status === 'unread' || status === 'pending';
                } else {
                    return iq.userUnread === true || status === 'replied' || status === 'processing';
                }
            });
            
            setNotifications(unreadItems.slice(0, 10)); // Show more items
            setUnreadCount(unreadItems.length);
        } catch (err) {
            console.warn("[NOTIFICATIONS]: Failed to fetch identity signals", err);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 8000); // Poll slightly faster (8s)
        return () => clearInterval(interval);
    }, [isAdmin]);

    const handleNotificationClick = async (id) => {
        setIsOpen(false);
        try {
            // Mark as read in background
            await axios.patch(`${API_BASE_URL}/api/inquiries/${id}/read`, { isAdmin });
            fetchNotifications(); // Update count immediately
        } catch (err) {
            console.error("Failed to mark as read", err);
        }

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
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-zinc-950 animate-pulse"></span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        className={`fixed sm:absolute inset-x-4 sm:inset-x-auto sm:right-0 top-[80px] sm:top-auto sm:mt-4 sm:w-96 rounded-3xl border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden z-[100] ${
                            theme === 'dark'
                            ? 'bg-zinc-900 border-white/10 text-white'
                            : 'bg-white border-black/5 text-black'
                        }`}
                    >
                        <div className="p-5 sm:p-7 border-b border-current/5 flex items-center justify-between bg-current/[0.01]">
                            <div className="flex flex-col">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Identity Signal Buffer</h4>
                                <p className="text-[8px] font-bold opacity-20 uppercase tracking-widest mt-0.5">Continuous Monitoring Active</p>
                            </div>
                            <span className="text-[9px] font-black px-4 py-1.5 bg-red-600 text-white rounded-full shadow-lg shadow-red-600/20">
                                {unreadCount} Priority
                            </span>
                        </div>

                        <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                            {notifications.length > 0 ? (
                                notifications.map((notif) => (
                                    <div 
                                        key={notif.id}
                                        onClick={() => handleNotificationClick(notif.id)}
                                        className={`p-5 sm:p-7 border-b border-current/5 hover:bg-current/[0.03] cursor-pointer transition-all animate-in slide-in-from-right-4 relative overflow-hidden group`}
                                    >
                                        <div className="absolute inset-y-0 left-0 w-1.5 bg-red-600 opacity-100 transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                                        <div className="flex gap-4">
                                            <div className="flex-1 space-y-1.5">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-[11px] font-black leading-tight text-current/80">
                                                        {isAdmin ? notif.name : `Support: ${notif.vector}`}
                                                    </p>
                                                    <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.4)]"></div>
                                                </div>
                                                <p className="text-[10px] font-bold opacity-40 line-clamp-2 leading-relaxed tracking-tight italic">
                                                    "{notif.lastMessage || notif.brief || "Awaiting neural sync..."}"
                                                </p>
                                                <div className="flex items-center justify-between pt-1">
                                                    <div className="flex items-center gap-2 opacity-30 text-[8px] font-black uppercase tracking-widest">
                                                        <FiClock size={10} />
                                                        {notif.lastUpdated ? new Date(notif.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Syncing'}
                                                    </div>
                                                    <span className="text-[7px] font-black uppercase tracking-[0.2em] opacity-30 bg-current/5 px-2 py-0.5 rounded-md border border-current/5">
                                                        {notif.status || 'Active'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-16 sm:py-24 text-center space-y-5 px-10">
                                    <div className="w-20 h-20 bg-current/[0.03] rounded-[2rem] flex items-center justify-center mx-auto border border-current/[0.05]">
                                        <FiCheckCircle size={36} className="opacity-10" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40">All Identity Nodes Synced</p>
                                        <p className="text-[9px] font-bold opacity-20 uppercase tracking-widest">No Priority Alerts Detected</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={() => {
                                setIsOpen(false);
                                navigate(isAdmin ? '/admin/inquiry' : '/user/support');
                            }}
                            className="w-full py-6 text-[10px] font-black uppercase tracking-[0.5em] opacity-40 hover:opacity-100 hover:bg-current/[0.05] transition-all border-t border-current/5 group"
                        >
                            <span className="group-hover:tracking-[0.7em] transition-all duration-500">Operational Log Entry →</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationCenter;

