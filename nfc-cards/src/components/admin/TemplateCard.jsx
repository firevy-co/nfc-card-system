import React from "react";
import { FiEye, FiEdit, FiGlobe, FiWifi, FiTrash2, FiSettings } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import TemplateRenderer from "../../templates/TemplateRenderer";

/**
 * TEMPLATE CARD COMPONENT
 * Renders a high-fidelity miniature preview of a template.
 * Layout inspired by V1CE's clean and premium card design.
 */
export default function TemplateCard({
    templateId,
    title,
    path,
    type,
    status = "Active",
    isAdmin = true,
    description,
    category,
    tags = [],
    userData,
    onDelete,
    onEdit,
    onSelect,
    isSelected = false
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const baseRoute = location.pathname.startsWith('/admin') ? '/admin' : '/user';

    const previewData = {
        displayName: userData?.displayName || title,
        email: userData?.email || "hello@identity.co",
        role: userData?.businessName || userData?.role || category || "Design Lead",
        phone: userData?.phone || "+x (xxx) xxx-xxxx",
        socialLinks: userData?.socialLinks || {},
        logo: userData?.logo
    };

    return (
        <div className={`h-full rounded-[2.5rem] backdrop-blur-xl border transition-all duration-700 group flex flex-col overflow-hidden relative ${isSelected
            ? 'border-primary/50 bg-primary/[0.03] shadow-[0_0_50px_rgba(0,0,0,0.12)] ring-1 ring-primary/20'
            : 'border-black/5 dark:border-white/80 bg-white shadow-[0_0_30px_rgba(0,0,0,0.06)] dark:bg-white/5 hover:border-primary/30 hover:shadow-[0_0_50px_rgba(0,0,0,0.1)]'
            }`}>
            {/* ACTIVE SELECTION GLOW */}
            {isSelected && (
                <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none z-0"></div>
            )}

            {/* Premium Preview Section */}
            <div className="h-[280px] sm:h-[340px] bg-black/5 dark:bg-white/5 relative flex items-center justify-center p-6 sm:p-12 overflow-hidden border-b border-black/5 dark:border-white/10 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-50 z-0"></div>

                {/* Floating Status Badge (Admin only or Top right) */}
                <div className="absolute top-6 right-6 z-20">
                    <div className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest backdrop-blur-md border ${isSelected
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        : 'bg-white/20 dark:bg-white/10 text-muted-foreground border-black/5 dark:border-white/10'
                        }`}>
                        {isSelected ? 'Active Node' : category || 'Premium'}
                    </div>
                </div>

                {/* The Device Frame Preview */}
                <div className="w-[180px] h-[320px] bg-white dark:bg-zinc-900 rounded-[2rem] border-[6px] border-black/10 dark:border-white/10 shadow-2xl relative overflow-hidden transform scale-[0.8] group-hover:scale-[0.85] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col z-10">
                    {/* Device Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/5 dark:bg-white/10 rounded-b-xl z-30"></div>

                    {/* Inner Content Scale */}
                    <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center">
                        <div className="origin-center" style={{ transform: 'scale(0.24)' }}>
                            <div className="w-[375px] h-[667px] overflow-hidden relative">
                                <TemplateRenderer templateId={templateId} userData={previewData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col relative z-10">
                <div className="mb-6">
                    <h3 className="font-black text-foreground text-xl tracking-tighter leading-none mb-2 capitalize">
                        {title}
                    </h3>
                    <p className="text-[12px] text-muted-foreground font-semibold leading-relaxed opacity-60 line-clamp-2">
                        {description || "A professional digital identity presence optimized for high-conversion networking."}
                    </p>
                </div>

                {/* Actions Grid */}
                <div className="mt-auto flex flex-col gap-3">
                    {isAdmin ? (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => navigate(`${baseRoute}/templates${path}`)}
                                className="flex items-center justify-center gap-2 bg-foreground text-background py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 hover:scale-[1.02] transition-all shadow-lg active:scale-95"
                            >
                                <FiEye size={16} />
                                Preview
                            </button>
                            <button
                                onClick={onEdit}
                                className="flex items-center justify-center gap-2 bg-white/5 dark:bg-white/10 text-foreground py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black/10 dark:hover:bg-white/20 transition-all border border-black/5 dark:border-white/10 active:scale-95"
                            >
                                <FiEdit size={14} />
                                Edit Node
                            </button>
                            <button
                                onClick={onDelete}
                                className="col-span-2 flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-500/20 active:scale-95"
                            >
                                <FiTrash2 size={14} />
                                Retire Identity Node
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-5 gap-3">
                            <button
                                onClick={() => navigate(`${baseRoute}/templates${path}`)}
                                className="col-span-2 flex items-center justify-center gap-2 bg-white/5 dark:bg-white/10 text-muted-foreground py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-foreground hover:bg-black/10 dark:hover:bg-white/20 transition-all border border-black/5 dark:border-white/10 shadow-sm active:scale-95"
                            >
                                <FiEye size={16} />
                                View
                            </button>
                            <button
                                onClick={onSelect}
                                disabled={isSelected}
                                className={`col-span-3 flex items-center justify-center gap-2 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${isSelected
                                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default'
                                    : 'bg-foreground text-background hover:brightness-110 active:scale-95'
                                    }`}
                            >
                                {isSelected ? (
                                    <>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        Active
                                    </>
                                ) : (
                                    'Select Node'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
