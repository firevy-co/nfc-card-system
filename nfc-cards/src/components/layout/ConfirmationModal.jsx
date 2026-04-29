import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiTrash2, FiX } from 'react-icons/fi';

const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Confirm Deletion", 
    message = "Are you sure you want to permanently delete this item? This action cannot be undone.",
    confirmText = "Delete Permanently",
    isLoading = false,
    type = "danger" // danger, warning
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={!isLoading ? onClose : undefined}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 w-full max-w-md rounded-[2.5rem] p-8 sm:p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative z-10 overflow-hidden font-['Mulish']"
                    >
                        {/* Status bar */}
                        <div className={`absolute top-0 left-0 w-full h-1.5 ${type === 'danger' ? 'bg-red-500' : 'bg-amber-500'}`}></div>

                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-zinc-400 hover:text-black dark:hover:text-white transition-all active:scale-95 disabled:opacity-50"
                        >
                            <FiX size={18} />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl ${
                                type === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                            }`}>
                                {type === 'danger' ? <FiTrash2 size={32} /> : <FiAlertTriangle size={32} />}
                            </div>

                            <h3 className="text-2xl font-black text-black dark:text-white tracking-tighter mb-4">
                                {title}
                            </h3>
                            
                            <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10">
                                {message}
                            </p>

                            <div className="w-full grid grid-cols-1 gap-3">
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 ${
                                        type === 'danger' 
                                            ? 'bg-red-500 text-white hover:bg-red-600' 
                                            : 'bg-amber-500 text-white hover:bg-amber-600'
                                    }`}
                                >
                                    {isLoading ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        type === 'danger' ? <FiTrash2 size={14} /> : <FiAlertTriangle size={14} />
                                    )}
                                    {isLoading ? 'Processing...' : confirmText}
                                </button>
                                
                                <button
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="w-full py-4 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-200 dark:hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
