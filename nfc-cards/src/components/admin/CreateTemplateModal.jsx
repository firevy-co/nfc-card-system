import React, { useEffect, useState, Suspense } from 'react';
import { FiX, FiCheck, FiLayout, FiTag, FiHash, FiFileText, FiBox, FiChevronRight, FiEye } from 'react-icons/fi';
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
        templateId: 'real_estate'
    });
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                category: initialData.category || 'Business',
                description: initialData.description || '',
                tags: (initialData.tags || []).join(', '),
                previewColor: initialData.previewColor || 'bg-primary',
                templateId: initialData.templateId || 'real_estate'
            });
        } else {
            setFormData({
                name: '',
                category: 'Business',
                description: '',
                tags: '',
                previewColor: 'bg-primary',
                templateId: 'real_estate'
            });
        }
        setShowPicker(false);
    }, [initialData, isOpen]);

    const categories = ['Business', 'Medical', 'Legal', 'Real Estate', 'Hospitality', 'Fitness', 'Creator', 'Beauty', 'Construction', 'Other'];
    const selectedTemplate = TEMPLATES.find(t => t.id === formData.templateId) || TEMPLATES[0];

    const previewUserData = {
        displayName: formData.name || 'Your Name',
        email: 'hello@identity.co',
        role: formData.category || 'Professional',
        phone: '+x (xxx) xxx-xxxx',
        website: 'www.yoursite.com',
        address: 'Your City, Country',
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
                        className="relative w-full max-w-[1100px] max-h-[92vh] bg-white border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        {/* ── Header ── */}
                        <div className="flex items-center justify-between px-7 py-5 border-b border-border bg-card   shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center shadow">
                                    <FiLayout size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-foreground leading-none tracking-tight">
                                        {initialData ? 'Edit Template' : 'New Template'}
                                    </h2>
                                    <p className="text-[10px] text-muted-foreground font-semibold capitalize tracking-wider mt-1">Identity Studio</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        {/* ── Body: Two-column layout ── */}
                        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">

                            {/* LEFT — Form */}
                            <div className="flex-1 overflow-y-auto p-7 sm:p-8 custom-scrollbar space-y-6 border-r border-border bg-card">

                                {/* Name + Category */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold capitalize tracking-wider text-muted-foreground flex items-center gap-1.5">
                                            <FiFileText size={12} /> Template Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Modern Agent"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/40 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold capitalize tracking-wider text-muted-foreground flex items-center gap-1.5">
                                            <FiTag size={12} /> Industry
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium text-foreground focus:border-primary/50 appearance-none transition-all cursor-pointer outline-none"
                                            >
                                                {categories.map(cat => <option key={cat} value={cat} className="bg-card text-foreground">{cat}</option>)}
                                            </select>
                                            <FiChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none text-muted-foreground" />
                                        </div>
                                    </div>
                                </div>

                                {/* ── Template Picker ── */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[11px] font-bold capitalize tracking-wider text-muted-foreground flex items-center gap-1.5">
                                            <FiBox size={12} /> Design Blueprint
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowPicker(p => !p)}
                                            className="text-[10px] font-bold text-muted-foreground hover:text-foreground capitalize tracking-wider flex items-center gap-1 transition-colors"
                                        >
                                            {showPicker ? 'Close Grid' : 'Browse All'}
                                            <FiEye size={11} />
                                        </button>
                                    </div>

                                    {/* Selected badge */}
                                    <div
                                        onClick={() => setShowPicker(p => !p)}
                                        className="w-full flex items-center gap-4 bg-card border-2 border-border rounded-xl px-4 py-3.5 cursor-pointer hover:border-primary/50 transition-all group"
                                    >
                                        <div className={`w-8 h-8 rounded-lg ${selectedTemplate.previewColor || 'bg-muted'} flex-shrink-0 shadow-sm`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-foreground truncate">{selectedTemplate.name}</p>
                                            <p className="text-[10px] text-muted-foreground font-mono">{selectedTemplate.id}</p>
                                        </div>
                                        <FiChevronRight size={14} className={`text-muted-foreground transition-transform ${showPicker ? 'rotate-90' : ''}`} />
                                    </div>

                                    {/* Grid Picker */}
                                    <AnimatePresence>
                                        {showPicker && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                                                    {TEMPLATES.map(t => (
                                                        <button
                                                            key={t.id}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData({ ...formData, templateId: t.id });
                                                                setShowPicker(false);
                                                            }}
                                                            className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${formData.templateId === t.id
                                                                ? 'border-foreground bg-secondary hover:bg-secondary'
                                                                : 'border-border hover:border-foreground/30 bg-card hover:bg-secondary/50'
                                                                }`}
                                                        >
                                                            <div className={`w-7 h-7 rounded-lg ${t.previewColor} flex-shrink-0 shadow-sm`} />
                                                            <div className="min-w-0">
                                                                <p className={`text-[11px] font-bold truncate ${formData.templateId === t.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                                    {t.name}
                                                                </p>
                                                                <p className="text-[9px] text-muted-foreground/60 font-mono truncate">{t.id}</p>
                                                            </div>
                                                            {formData.templateId === t.id && (
                                                                <div className="ml-auto shrink-0 w-4 h-4 rounded-full bg-foreground flex items-center justify-center">
                                                                    <FiCheck size={9} className="text-background" />
                                                                </div>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Tags */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold capitalize tracking-wider text-muted-foreground flex items-center gap-1.5">
                                        <FiHash size={12} /> Tags
                                    </label>
                                    <div className="relative">
                                        <FiHash size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                                        <input
                                            type="text"
                                            placeholder="Modern, clean, minimal..."
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            className="w-full bg-card border border-border rounded-xl px-4 pl-10 py-3 text-sm font-medium text-foreground focus:border-primary/50 transition-all placeholder:text-muted-foreground/40 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold capitalize tracking-wider text-muted-foreground flex items-center gap-1.5">
                                        <FiFileText size={12} /> Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Describe the purpose of this template..."
                                        className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium text-foreground focus:border-primary/50 transition-all placeholder:text-muted-foreground/40 outline-none resize-none"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                {/* Accent Colors */}
                                <div className="space-y-3 pt-4 border-t border-border">
                                    <label className="text-[11px] font-bold capitalize tracking-wider text-muted-foreground">Accent Color</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['bg-primary', 'bg-blue-600', 'bg-emerald-500', 'bg-orange-500', 'bg-rose-500', 'bg-zinc-900'].map(color => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, previewColor: color })}
                                                className={`w-8 h-8 rounded-full ${color} border-2 transition-all ${formData.previewColor === color
                                                    ? 'border-foreground ring-2 ring-foreground/20 scale-110 shadow-md'
                                                    : 'border-transparent opacity-40 hover:opacity-90'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT — Live Preview */}
                            <div className="hidden lg:flex w-[380px] xl:w-[420px] flex-col bg-card border-l border-border shrink-0">
                                {/* Preview header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                                    <div>
                                        <p className="text-[11px] font-bold capitalize tracking-widest text-muted-foreground">Live Preview</p>
                                        <p className="text-xs font-semibold text-foreground mt-0.5">{selectedTemplate.name}</p>
                                    </div>
                                    <span className="text-[9px] font-mono bg-secondary text-foreground px-2 py-1 rounded-md border border-border">{formData.templateId}</span>
                                </div>

                                {/* Scaled template render */}
                                <div className="flex-1 overflow-hidden flex items-center justify-center p-6 bg-secondary/10">
                                    <div className="w-full h-full bg-card rounded-2xl shadow-xl border border-border overflow-hidden relative">
                                        {/* Phone chrome notch */}
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-secondary rounded-full z-10" />
                                        {/* Scaled content */}
                                        <div className="absolute inset-0 overflow-hidden" style={{ paddingTop: '20px' }}>
                                            <div
                                                className="origin-top-left"
                                                style={{ transform: 'scale(0.38)', width: '375px', height: '667px', minHeight: '667px' }}
                                            >
                                                <Suspense fallback={
                                                    <div className="w-full h-full flex items-center justify-center bg-card">
                                                        <div className="w-6 h-6 border-2 border-border border-t-foreground rounded-full animate-spin" />
                                                    </div>
                                                }>
                                                    <TemplateRenderer templateId={formData.templateId} userData={previewUserData} />
                                                </Suspense>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Template info */}
                                <div className="px-6 pb-5 pt-2">
                                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                        {selectedTemplate.description || 'Select a blueprint to see a live preview.'}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {(selectedTemplate.tags || []).map(tag => (
                                            <span key={tag} className="text-[9px] font-bold capitalize tracking-wider bg-secondary text-foreground px-2 py-1 rounded-md border border-border">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Footer ── */}
                        <div className="px-7 py-5 border-t border-border bg-card flex items-center gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-bold text-sm border border-border hover:brightness-110 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex-[2] flex items-center justify-center gap-2 bg-foreground text-background py-3 px-8 rounded-xl text-sm font-bold hover:brightness-125 transition-all shadow-md active:scale-[0.98]"
                            >
                                {initialData ? 'Save Changes' : 'Create Template'}
                                <FiCheck size={16} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreateTemplateModal;
