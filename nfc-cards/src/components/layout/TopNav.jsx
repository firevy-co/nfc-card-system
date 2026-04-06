import React from "react";
import { FiBell } from "react-icons/fi";

export default function TopNav({ title = "My Templates" }) {
    return (
        <div className="flex justify-between items-center bg-white border-b border-border px-8 h-[80px] shrink-0 shadow-sm sticky top-0 z-50">

            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest opacity-60">
                    <span>Identity Network</span>
                    <span>/</span>
                    <span className="text-gray-900">{title}</span>
                </div>
                <div className="text-xl font-black text-black tracking-tighter uppercase font-['Outfit'] flex items-center gap-2 mt-1">
                    {title}
                    <span className="text-[10px] font-bold text-gray-400 tracking-normal capitalize ml-2 opacity-40">
                        link.firevy.co/haydnprice
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-5">
                <div className="relative cursor-pointer p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <FiBell size={22} className="text-gray-600" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></div>
                </div>

                <button className="bg-black text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-black/10 active:scale-95">
                    Share Your Card
                </button>

            </div>

        </div>
    );
}
