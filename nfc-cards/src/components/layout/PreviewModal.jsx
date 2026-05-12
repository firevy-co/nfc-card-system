import React from 'react';
import { FiX, FiExternalLink, FiMaximize2 } from 'react-icons/fi';

const PreviewModal = ({ isOpen, onClose, url, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative z-10 w-full max-w-5xl h-[85vh] bg-white dark:bg-[#0F0F10] rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-zinc-50/50 dark:bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                            <FiMaximize2 size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tight text-foreground">
                                {title || 'Deployment Preview'}
                            </h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-0.5">
                                Live Architecture Node
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => window.open(url, '_blank')}
                            className="h-12 px-6 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                        >
                            <FiExternalLink size={14} />
                            <span>New Tab</span>
                        </button>
                        
                        <button
                            onClick={onClose}
                            className="w-12 h-12 rounded-2xl border border-black/5 dark:border-white/10 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                        >
                            <FiX size={20} />
                        </button>
                    </div>
                </div>

                {/* Iframe Content */}
                <div className="flex-1 bg-zinc-100/50 dark:bg-black/20 relative">
                    <iframe
                        src={url}
                        className="w-full h-full border-none"
                        title="Identity Preview"
                    />
                </div>

                {/* Footer Info */}
                <div className="px-8 py-4 bg-zinc-50 dark:bg-white/[0.02] border-t border-black/5 dark:border-white/10 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            Live Synchronization Active • {url}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;
