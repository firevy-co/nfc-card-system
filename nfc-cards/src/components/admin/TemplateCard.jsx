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
    onDelete,
    onEdit
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const baseRoute = location.pathname.startsWith('/admin') ? '/admin' : '/user';

    const previewData = {
        displayName: title,
        email: "hello@identity.co",
        role: category || "Design Lead",
        phone: "+x (xxx) xxx-xxxx"
    };

    return (
        <div className="bg-card border border-border rounded-2xl sm:rounded-[2.55rem] transition-all duration-500 group hover:border-primary/40 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden min-h-[220px] sm:min-h-[540px] relative">

            {/* Premium Preview Section: Micro-Scaled for 3-Column Grid */}
            <div className="h-[120px] sm:h-[260px] bg-secondary/10 relative flex items-center justify-center p-2 sm:p-8 overflow-hidden border-b border-border/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-30"></div>

                {/* NFC/Wifi Status Marker (Desktop Only) */}
                <div className="absolute top-5 right-8 opacity-40 hidden sm:block">
                    <FiWifi size={14} className="text-foreground" />
                </div>

                {/* The "V1CE" Style White Card Frame (High-Density Scale) */}
                <div className="w-[260px] sm:w-[320px] h-[220px] sm:h-[300px] bg-white rounded-2xl sm:rounded-[3rem] border border-border/10 shadow-2xl relative overflow-hidden transform scale-[0.55] sm:scale-[0.7] group-hover:scale-[0.6] sm:group-hover:scale-[0.78] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col pt-2 sm:pt-4">
                    
                    {/* Brand Identifier */}
                    <div className="flex justify-center mb-1">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white border border-border/10 shadow-sm flex items-center justify-center z-20">
                            <span className="text-[6px] sm:text-[8px] font-black text-black tracking-tighter">{title.charAt(0)}</span>
                        </div>
                    </div>

                    {/* Miniature Template Surface */}
                    <div className="flex-1 w-full px-4 sm:px-8 pb-4 sm:pb-8 flex items-center justify-center relative overflow-hidden">
                        <div className="w-full h-full rounded-xl sm:rounded-[2rem] bg-zinc-950/5 relative overflow-hidden flex items-center justify-center border border-black/5">
                            <div className="origin-center" style={{ transform: 'scale(0.2)' }}>
                                <div className="w-[375px] h-[667px] overflow-hidden relative rounded-[3rem]">
                                    <TemplateRenderer templateId={templateId} userData={previewData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info & Content Section: Optimized for Mobile Density */}
            <div className="p-3 sm:p-8 flex-1 flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-2 sm:mb-4 gap-1">
                    <h3 className="font-black text-foreground text-[10px] sm:text-xl tracking-tight leading-none group-hover:text-primary transition-colors line-clamp-1">
                        {title}
                    </h3>
                    <div className="px-1.5 py-0.5 rounded-md bg-secondary/40 border border-border">
                        <span className="text-[5px] sm:text-[7px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">
                            {category?.substring(0, 10)}
                        </span>
                    </div>
                </div>

                <p className="hidden sm:block text-[11px] text-muted-foreground line-clamp-2 mb-8 font-semibold leading-relaxed opacity-50">
                    {description || "A professional digital presence for your identity network."}
                </p>

                {/* Interaction Grid (Responsive Density) */}
                <div className="mt-auto">
                    <div className="flex flex-col gap-1.5 sm:gap-3">
                        <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
                            <button 
                                onClick={() => navigate(`${baseRoute}/templates${path}`)}
                                className="flex items-center justify-center gap-1.5 sm:gap-3 bg-foreground text-background py-2 sm:py-4 rounded-lg sm:rounded-2xl text-[6px] sm:text-[9px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] hover:brightness-125 transition-all shadow-lg active:scale-95"
                            >
                                <FiEye size={10} className="sm:w-4 sm:h-4" />
                                <span className="hidden sm:block">Preview</span>
                                <span className="sm:hidden">Look</span>
                            </button>

                            <button 
                                onClick={onEdit}
                                className="flex items-center justify-center gap-1.5 sm:gap-3 bg-secondary/50 text-foreground py-2 sm:py-4 rounded-lg sm:rounded-2xl text-[6px] sm:text-[9px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] hover:bg-secondary transition-all border border-border shadow-sm active:scale-95"
                            >
                                <FiEdit size={10} className="sm:w-4 sm:h-4" />
                                <span className="hidden sm:block">Edit</span>
                                <span className="sm:hidden">Tune</span>
                            </button>
                        </div>
                        
                        {isAdmin && (
                            <button 
                                onClick={onDelete}
                                className="w-full flex items-center justify-center gap-1.5 bg-rose-500/10 text-rose-500 py-1.5 sm:py-3 rounded-md sm:rounded-2xl text-[5px] sm:text-[8px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20 active:scale-[0.98] group/del"
                            >
                                <FiTrash2 size={8} className="sm:w-3.5 sm:h-3.5 group-hover/del:scale-110 transition-transform" />
                                <span className="hidden sm:block">Retire Identity Node</span>
                                <span className="sm:hidden">Retire</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}