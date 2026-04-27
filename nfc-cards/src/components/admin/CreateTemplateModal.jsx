import React, { useEffect, useState, Suspense } from 'react';
import { FiX, FiCheck, FiLayout, FiTag, FiHash, FiFileText, FiBox, FiChevronRight, FiEye, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { TEMPLATES } from '../../templates/templateRegistry';
import TemplateRenderer from '../../templates/TemplateRenderer';

const CreateTemplateModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Business',
        description: '',
        tags: '',
        previewColor: 'bg-primary',
        templateId: 'real_estate',
        logo: '',
        logoType: 'url' // 'url' or 'file'
    });
    const [showPicker, setShowPicker] = useState(false);
    const [searchTemplate, setSearchTemplate] = useState('');

    useEffect(() => {
        setTimeout(() => {
            if (initialData) {
                setFormData({
                    name: initialData.name || '',
                    category: initialData.category || 'Business',
                    description: initialData.description || '',
                    tags: (initialData.tags || []).join(', '),
                    previewColor: initialData.previewColor || 'bg-primary',
                    templateId: initialData.templateId || 'real_estate',
                    logo: initialData.logo || '',
                    logoType: initialData.logoType || 'url'
                });
            } else {
                setFormData({
                    name: '',
                    category: 'Business',
                    description: '',
                    tags: '',
                    previewColor: 'bg-primary',
                    templateId: 'real_estate',
                    logo: '',
                    logoType: 'url'
                });
            }
            setShowPicker(false);
            setSearchTemplate('');
        }, 0);
    }, [initialData, isOpen]);

    const categories = Array.from(new Set(TEMPLATES.map(t => t.category || 'Other'))).sort();
    const selectedTemplate = TEMPLATES.find(t => t.id === formData.templateId) || TEMPLATES[0];

    const previewUserData = {
        displayName: formData.name || 'Your Name',
        email: 'hello@identity.co',
        role: formData.category || 'Professional',
        phone: '+x (xxx) xxx-xxxx',
        website: 'www.yoursite.com',
        address: 'Your City, Country',
        logo: formData.logo
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, logo: reader.result, logoType: 'file' });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        if (e?.preventDefault) e.preventDefault();
        onSave({
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 12 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-[1100px] max-h-[92vh] bg-white dark:bg-white border border-slate-100 dark:border-slate-100 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-7 py-6 border-b border-slate-100 dark:border-slate-100 bg-slate-50 dark:bg-slate-50 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#7BB9D4] text-white flex items-center justify-center shadow-lg">
                                    <FiLayout size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-black dark:text-black leading-none tracking-tight">
                                        {initialData ? 'Edit Identity Node' : 'New Identity Node'}
                                    </h2>
                                    <p className="text-[10px] text-black/40 dark:text-black/40 font-black capitalize tracking-[0.2em] mt-1 opacity-60">Identity Studio</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-black/40 hover:bg-slate-100 hover:text-black transition-all"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">

                            {/* LEFT - Form */}
                            <div className="flex-1 overflow-y-auto p-7 sm:p-10 custom-scrollbar space-y-8 border-r border-black/5 dark:border-white/10">

                                {/* Identity Branding */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black capitalize tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-1.5 opacity-60">
                                            <FiTag size={12} /> Identity Branding
                                        </label>
                                        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                                            <button
                                                onClick={() => setFormData({ ...formData, logoType: 'url' })}
                                                className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${formData.logoType === 'url' ? 'bg-white shadow-sm text-black' : 'text-black/30'}`}
                                            >URL</button>
                                            <button
                                                onClick={() => setFormData({ ...formData, logoType: 'file' })}
                                                className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${formData.logoType === 'file' ? 'bg-white shadow-sm text-black' : 'text-black/30'}`}
                                            >FILE</button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-200 rounded-[2rem]">
                                        <div className="relative group">
                                            <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
                                                {formData.logo ? (
                                                    <img src={formData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                                                ) : (
                                                    <FiBox size={24} className="text-slate-200" />
                                                )}
                                            </div>
                                            {formData.logo && (
                                                <button
                                                    onClick={() => setFormData({ ...formData, logo: '' })}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <FiX size={12} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            {formData.logoType === 'url' ? (
                                                <input
                                                    type="text"
                                                    placeholder="Paste Image URL..."
                                                    value={formData.logo}
                                                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-black focus:border-[#7BB9D4]/50 transition-all outline-none"
                                                />
                                            ) : (
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleLogoUpload}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                    <div className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-black/40 text-center uppercase tracking-widest hover:border-[#7BB9D4]/50 transition-all">
                                                        {formData.logo ? 'Change Image' : 'Choose Local File'}
                                                    </div>
                                                </div>
                                            )}
                                            <p className="text-[9px] text-black/20 font-black uppercase tracking-widest ml-1">Company or Personal Insignia</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Name + Category */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black capitalize tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-1.5 opacity-60">
                                            <FiFileText size={12} /> Designation
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Modern Agent"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-50 border border-slate-200 dark:border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-black dark:text-black focus:border-[#7BB9D4]/50 focus:ring-4 focus:ring-[#7BB9D4]/5 transition-all placeholder:text-black/20 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black capitalize tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-1.5 opacity-60">
                                            <FiTag size={12} /> Industry Group
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full bg-slate-50 dark:bg-slate-50 border border-slate-200 dark:border-slate-200 rounded-2xl px-5 py-4 text-sm font-black text-black dark:text-black focus:border-[#7BB9D4]/50 appearance-none transition-all cursor-pointer outline-none capitalize tracking-widest"
                                            >
                                                {categories.map(cat => <option key={cat} value={cat} className="bg-background text-foreground">{cat}</option>)}
                                            </select>
                                            <FiChevronRight size={14} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none text-muted-foreground opacity-60" />
                                        </div>
                                    </div>
                                </div>

                                {/* Template Picker */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black capitalize tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-1.5 opacity-60">
                                            <FiBox size={12} /> Design Blueprint
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowPicker(p => !p)}
                                            className="text-[10px] font-black text-muted-foreground hover:text-foreground capitalize tracking-widest flex items-center gap-2 transition-colors opacity-60 hover:opacity-100"
                                        >
                                            {showPicker ? 'Close Library' : 'Browse All Blueprints'}
                                            <FiEye size={12} />
                                        </button>
                                    </div>

                                    <div
                                        onClick={() => setShowPicker(p => !p)}
                                        className="w-full flex items-center gap-5 bg-slate-50 dark:bg-slate-50 border-2 border-slate-200 dark:border-slate-200 rounded-2xl px-5 py-4 cursor-pointer hover:border-[#7BB9D4]/40 transition-all group active:scale-[0.99]"
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${selectedTemplate.previewColor || 'bg-muted'} flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-base font-black text-foreground truncate">{selectedTemplate.name}</p>
                                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest opacity-50">{selectedTemplate.id}</p>
                                        </div>
                                        <FiChevronRight size={16} className={`text-muted-foreground transition-transform duration-500 ${showPicker ? 'rotate-90' : ''}`} />
                                    </div>

                                    <AnimatePresence>
                                        {showPicker && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-6 relative">
                                                    <div className="absolute left-4 top-10 text-black/20 z-10">
                                                        <FiSearch size={14} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Quick Search Blueprints..."
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#7BB9D4] mb-6"
                                                        onChange={(e) => setSearchTemplate(e.target.value)}
                                                        value={searchTemplate}
                                                    />

                                                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar space-y-8 pb-4 pr-1">
                                                        {Object.entries(
                                                            TEMPLATES
                                                                .filter(t =>
                                                                    t.name.toLowerCase().includes(searchTemplate.toLowerCase()) ||
                                                                    t.category.toLowerCase().includes(searchTemplate.toLowerCase()) ||
                                                                    t.id.toLowerCase().includes(searchTemplate.toLowerCase())
                                                                )
                                                                .reduce((acc, t) => {
                                                                    const cat = t.category || 'Other';
                                                                    if (!acc[cat]) acc[cat] = [];
                                                                    acc[cat].push(t);
                                                                    return acc;
                                                                }, {})
                                                        ).sort(([a], [b]) => a.localeCompare(b)).map(([category, templates]) => (
                                                            <div key={category} className="space-y-4">
                                                                <div className="flex items-center gap-4">
                                                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 dark:text-black/20 whitespace-nowrap font-['Mulish']">
                                                                        {category}
                                                                    </h3>
                                                                    <div className="h-px w-full bg-slate-100" />
                                                                </div>
                                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                                    {templates.map(t => (
                                                                        <button
                                                                            key={t.id}
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setFormData({ ...formData, templateId: t.id });
                                                                                setShowPicker(false);
                                                                            }}
                                                                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${formData.templateId === t.id
                                                                                ? 'border-black bg-slate-50 shadow-inner'
                                                                                : 'border-slate-100 bg-transparent hover:border-[#7BB9D4]/40 hover:bg-slate-50'
                                                                                }`}
                                                                        >
                                                                            <div className={`w-8 h-8 rounded-lg ${t.previewColor} flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`} />
                                                                            <div className="min-w-0 flex-1">
                                                                                <p className={`text-[11px] font-black truncate capitalize ${formData.templateId === t.id ? 'text-black' : 'text-black/60'}`}>
                                                                                    {t.name}
                                                                                </p>
                                                                                <p className="text-[8px] text-black/20 font-bold uppercase tracking-tighter truncate">{t.id}</p>
                                                                            </div>
                                                                            {formData.templateId === t.id && (
                                                                                <div className="shrink-0 w-5 h-5 rounded-full bg-black flex items-center justify-center shadow-lg">
                                                                                    <FiCheck size={10} className="text-white" />
                                                                                </div>
                                                                            )}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Tags */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black capitalize tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-1.5 opacity-60">
                                        <FiHash size={12} /> Meta Tags
                                    </label>
                                    <div className="relative">
                                        <FiHash size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/30" />
                                        <input
                                            type="text"
                                            placeholder="Modern, clean, minimal..."
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl px-5 pl-12 py-4 text-sm font-bold text-foreground focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black capitalize tracking-[0.2em] text-muted-foreground ml-1 flex items-center gap-1.5 opacity-60">
                                        <FiFileText size={12} /> Architectural Vision
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Outline the core objective of this design protocol..."
                                        className="w-full bg-slate-50 dark:bg-slate-50 border border-slate-200 dark:border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-black dark:text-black focus:border-[#7BB9D4]/50 transition-all placeholder:text-black/20 outline-none resize-none"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                {/* Accent Colors */}
                                <div className="space-y-4 pt-6 border-t border-black/5 dark:border-white/10">
                                    <label className="text-[10px] font-black capitalize tracking-[0.2em] text-muted-foreground ml-1 opacity-60">System Accent</label>
                                    <div className="flex flex-wrap gap-4">
                                        {['bg-primary', 'bg-blue-600', 'bg-emerald-500', 'bg-orange-500', 'bg-rose-500', 'bg-zinc-900'].map(color => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, previewColor: color })}
                                                className={`w-10 h-10 rounded-2xl ${color} border-2 transition-all relative ${formData.previewColor === color
                                                    ? 'border-foreground ring-4 ring-foreground/10 scale-110 shadow-xl'
                                                    : 'border-transparent opacity-30 hover:opacity-100 hover:scale-105'
                                                    }`}
                                            >
                                                {formData.previewColor === color && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <FiCheck className="text-white drop-shadow-md" size={16} />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT - Live Preview */}
                            <div className="hidden lg:flex w-[400px] xl:w-[450px] flex-col bg-slate-50 dark:bg-slate-50 border-l border-slate-100 dark:border-slate-100 shrink-0">
                                {/* Preview header */}
                                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-100">
                                    <div>
                                        <p className="text-[10px] font-black capitalize tracking-[0.2em] text-muted-foreground opacity-60">Pulse Preview</p>
                                        <p className="text-sm font-black text-foreground mt-1 capitalize">{selectedTemplate.name}</p>
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest bg-foreground text-background px-3 py-1.5 rounded-full shadow-lg">{formData.templateId}</span>
                                </div>

                                {/* Scaled template render */}
                                <div className="flex-1 overflow-hidden flex items-center justify-center p-10 bg-black/5 dark:bg-white/5">
                                    <div className="w-full max-w-[280px] aspect-[9/18.5] bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border-[6px] border-black/10 dark:border-white/10 overflow-hidden relative group">
                                        {/* Phone chrome notch */}
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/5 dark:bg-white/10 rounded-full z-10" />
                                        {/* Scaled content */}
                                        <div className="absolute inset-0 overflow-hidden" style={{ paddingTop: '30px' }}>
                                            <div
                                                className="origin-top-left"
                                                style={{ transform: 'scale(0.38)', width: '375px', height: '667px', minHeight: '667px' }}
                                            >
                                                <Suspense fallback={
                                                    <div className="w-full h-full flex items-center justify-center bg-background">
                                                        <div className="w-8 h-8 border-4 border-black/5 dark:border-white/10 border-t-foreground rounded-full animate-spin" />
                                                    </div>
                                                }>
                                                    <TemplateRenderer templateId={formData.templateId} userData={previewUserData} />
                                                </Suspense>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Template info */}
                                <div className="px-8 pb-10 pt-4">
                                    <p className="text-[11px] text-muted-foreground font-bold leading-relaxed opacity-60">
                                        {selectedTemplate.description || 'Select a blueprint to see a live preview.'}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-5">
                                        {(selectedTemplate.tags || []).map(tag => (
                                            <span key={tag} className="text-[8px] font-black capitalize tracking-[0.2em] bg-black/5 dark:bg-white/10 text-muted-foreground px-3 py-1.5 rounded-xl border border-black/5 dark:border-white/10 opacity-70">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-100 bg-slate-50 dark:bg-slate-50 flex items-center gap-4 shrink-0">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-4 rounded-2xl bg-white dark:bg-white text-black dark:text-black font-black text-[10px] capitalize tracking-[0.2em] border border-slate-200 dark:border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.98]"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex-[2] flex items-center justify-center gap-3 bg-[#7BB9D4] text-white py-4 px-10 rounded-2xl text-[10px] font-black capitalize tracking-[0.2em] hover:brightness-105 transition-all shadow-xl shadow-[#7BB9D4]/20 active:scale-[0.98]"
                            >
                                {initialData ? 'Update Infrastructure' : 'Initialize Protocol'}
                                <FiCheck size={18} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreateTemplateModal;
