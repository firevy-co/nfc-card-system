import React, { useEffect, useState } from 'react';
import { FiX, FiCheck, FiLayout, FiTag, FiHash, FiImage, FiFileText, FiBox, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { TEMPLATES } from '../../templates/templateRegistry';

const CreateTemplateModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Business',
        description: '',
        tags: '',
        previewColor: 'bg-primary',
        templateId: 'modern_realty'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                category: initialData.category || 'Business',
                description: initialData.description || '',
                tags: (initialData.tags || []).join(', '),
                previewColor: initialData.previewColor || 'bg-primary',
                templateId: initialData.templateId || 'modern_realty'
            });
        } else {
            setFormData({
                name: '',
                category: 'Business',
                description: '',
                tags: '',
                previewColor: 'bg-primary',
                templateId: 'modern_realty'
            });
        }
    }, [initialData, isOpen]);

    const categories = ['Business', 'Medical', 'Legal', 'Real Estate', 'Hospitality', 'Fitness', 'Creator', 'Beauty', 'Construction', 'Other'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-[94%] sm:w-full max-w-[900px] max-h-[90vh] sm:max-h-[85vh] bg-card/60 backdrop-blur-3xl border border-border rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 sm:p-10 border-b border-border bg-card/10">
                            <div className="flex items-center gap-4 sm:gap-6">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-[2rem] bg-foreground text-background flex items-center justify-center shadow-xl">
                                    <FiLayout size={24} className="sm:w-7 sm:h-7" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-foreground">Identity Studio</h2>
                                    <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-muted-foreground font-bold mt-0.5 sm:mt-1 opacity-60">Architecture & Interface Orchestrator</p>
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all border border-border"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        {/* Scrollable Form Body */}
                        <div className="flex-grow overflow-y-auto p-6 sm:p-12 custom-scrollbar">
                            <form id="template-form" onSubmit={handleSubmit} className="space-y-8 sm:space-y-12">
                                
                                {/* Identity DNA Sector */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                                    <div className="space-y-3 sm:space-y-4">
                                        <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-primary/70 flex items-center gap-2">
                                            <FiFileText /> Node Identity
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Modern Agent"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-secondary/30 border-2 border-border/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-sm sm:text-lg font-bold focus:border-primary/50 focus:ring-0 transition-all placeholder:text-muted-foreground/30"
                                        />
                                    </div>

                                    <div className="space-y-3 sm:space-y-4">
                                        <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-primary/70 flex items-center gap-2">
                                            <FiTag /> Industry Cluster
                                        </label>
                                        <div className="relative">
                                            <select 
                                                value={formData.category}
                                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                className="w-full bg-secondary/30 border-2 border-border/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-sm sm:text-lg font-bold focus:border-primary/50 appearance-none transition-all cursor-pointer"
                                            >
                                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                            <FiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
                                        </div>
                                    </div>
                                </div>

                                {/* Architecture Blueprint (DESIGN ID SELECTION) */}
                                <div className="space-y-3 sm:space-y-4">
                                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-primary/70 flex items-center gap-2">
                                        <FiBox /> Architecture Blueprint (Design DNA)
                                    </label>
                                    <div className="relative">
                                        <select 
                                            value={formData.templateId}
                                            onChange={(e) => setFormData({...formData, templateId: e.target.value})}
                                            className="w-full bg-foreground text-background border-2 border-foreground/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-lg sm:text-xl font-black uppercase tracking-tighter focus:ring-0 appearance-none transition-all cursor-pointer shadow-2xl hover:brightness-125"
                                        >
                                            {TEMPLATES.map(t => (
                                                <option key={t.id} value={t.id} className="bg-card text-foreground font-bold p-2 sm:p-4 text-xs sm:text-base">
                                                    {t.name} ({t.id})
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <FiChevronDown size={20} className="sm:w-6 sm:h-6 text-background" />
                                        </div>
                                    </div>
                                    <p className="text-[8px] sm:text-[9px] text-muted-foreground/60 uppercase tracking-widest font-bold px-2 sm:px-4 leading-relaxed">This selects the structural UI nodes through which the preview is simulated.</p>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-primary/70 flex items-center gap-2">
                                        <FiTag /> Metadata Tags (Comma Separated)
                                    </label>
                                    <div className="relative">
                                        <FiHash className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/60" />
                                        <input 
                                            type="text" 
                                            placeholder="Modern, clean, minimal..."
                                            value={formData.tags}
                                            onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                            className="w-full bg-secondary/30 border-2 border-border/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 pl-12 sm:pl-16 text-sm sm:text-lg font-bold focus:border-primary/50 focus:ring-0 transition-all placeholder:text-muted-foreground/30"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Mission Overview (Description)</label>
                                    <div className="relative">
                                        <FiFileText className="absolute left-4 top-5 text-primary/60" />
                                        <textarea
                                            rows={4}
                                            placeholder="Describe the aesthetic and purpose..."
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border-2 border-border/40 focus:border-primary/50 outline-none font-bold text-sm resize-none transition-all placeholder:text-muted-foreground/30"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Accent Selection */}
                                <div className="space-y-4 pt-4 border-t border-border">
                                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Network Identity Accent</label>
                                    <div className="flex flex-wrap gap-3 sm:gap-4">
                                        {['bg-primary', 'bg-blue-600', 'bg-emerald-500', 'bg-orange-500', 'bg-rose-500', 'bg-zinc-900'].map(color => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, previewColor: color })}
                                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${color} border-4 transition-all ${formData.previewColor === color ? 'border-white shadow-xl scale-125' : 'border-transparent opacity-40 hover:opacity-100 hover:scale-110'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 sm:p-8 border-t border-border bg-card/50 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-4 sm:py-5 rounded-2xl sm:rounded-[2.5rem] bg-secondary text-foreground font-black uppercase tracking-widest text-[9px] sm:text-[10px] border border-border hover:bg-border transition-all"
                            >
                                Abort
                            </button>
                            <button
                                type="submit"
                                form="template-form"
                                className="flex-[2] flex-grow flex items-center justify-center gap-3 sm:gap-4 bg-foreground text-background py-4 sm:py-5 px-8 sm:px-12 rounded-2xl sm:rounded-[2.5rem] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] hover:brightness-125 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.4)] active:scale-95 group"
                            >
                                <span className="group-hover:translate-x-1 transition-transform transform">
                                    {initialData ? "Synchronize" : "Initialize"}
                                </span>
                                <FiCheck size={18} className="sm:w-5 sm:h-5 group-hover:scale-125 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreateTemplateModal;
