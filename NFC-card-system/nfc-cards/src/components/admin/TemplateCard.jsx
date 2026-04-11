import React from "react";
import { FiEye, FiEdit, FiMoreHorizontal, FiGlobe, FiLayers, FiWifi } from "react-icons/fi";

export default function TemplateCard({ title, path, type, status = "Active", isAdmin = true }) {

    const getStatusColor = () => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'synced': return 'bg-primary/10 text-primary border-primary/20';
            default: return 'bg-secondary text-muted-foreground border-border';
        }
    };

    return (
        <div className="bg-card border border-border rounded-[2.5rem] transition-all duration-300 group hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 flex flex-col overflow-hidden h-[450px]">

            {/* Preview Section - Emulating the Image UI */}
            <div className="h-[250px] bg-muted/30 relative flex items-center justify-center border-b border-border p-6">
                {isAdmin && (
                    <div className="absolute top-4 right-4 text-muted-foreground/30">
                        <FiWifi size={18} />
                    </div>
                )}

                <div className="w-full h-full bg-card/80 rounded-2xl border border-border flex flex-col items-center p-4 shadow-sm relative overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-muted/50 mb-3 border border-border"></div>
                    <div className="w-2/3 h-2 bg-muted rounded-full mb-1"></div>
                    <div className="w-1/2 h-1.5 bg-muted/50 rounded-full mb-4"></div>

                    <div className="w-full h-8 bg-foreground/5 rounded-lg mb-2"></div>
                    <div className="w-full h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <div className="w-1/3 h-2 bg-primary/40 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-foreground text-lg tracking-tight mb-1">
                    {title}
                </h3>
                <div className="flex items-center gap-1.5 opacity-60 mb-auto font-medium">
                    <FiGlobe size={12} />
                    <span className="text-xs uppercase tracking-widest truncate">
                        link.firevy.co{path}
                    </span>
                </div>

                {/* Actions Grid */}
                <div className="flex gap-2 mt-6">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all border border-foreground/10 shadow-sm">
                        <FiEye size={16} className="opacity-80" />
                        Preview
                    </button>

                    {isAdmin && (
                        <>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all border border-foreground/10 shadow-sm">
                                <FiEdit size={16} className="opacity-80" />
                                Edit
                            </button>

                            <button className="px-4 flex items-center justify-center bg-secondary/50 text-foreground rounded-xl border border-border hover:bg-border transition-all">
                                <FiMoreHorizontal size={18} />
                            </button>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}