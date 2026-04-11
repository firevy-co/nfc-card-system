import React from "react";
import { FiBell, FiShare2, FiShield } from "react-icons/fi";

export default function TopNav({ title = "My Templates" }) {
    return (
        <div className="flex justify-between items-center bg-card/40 backdrop-blur-md border-b border-border px-10 h-[90px] shrink-0 sticky top-0 z-50 transition-colors duration-300">

            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-60">
                    <FiShield className="text-primary" />
                    <span>Identity Network</span>
                    <span>/</span>
                    <span className="text-foreground">{title}</span>
                </div>
                <div className="text-2xl font-black text-foreground tracking-tighter uppercase font-['Outfit'] flex items-center gap-3 mt-1">
                    {title}
                    <div className="flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[10px] font-black text-emerald-500 tracking-widest uppercase">Live Sync</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative cursor-pointer p-3 rounded-2xl bg-secondary hover:bg-border transition-all border border-border shadow-sm group">
                    <FiBell size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    <div className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full border-2 border-card shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                </div>

                <button className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center gap-3">
                    <FiShare2 />
                    Broadcast Card
                </button>

            </div>

        </div>
    );
}
