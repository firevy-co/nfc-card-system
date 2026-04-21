import React from 'react';

const AppSkeleton = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center w-full font-['Mulish'] relative overflow-hidden">
            {/* Minimal Ambient Glows (Light Mode) */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-black/[0.03] rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-black/[0.02] rounded-full blur-[80px] animate-pulse delay-700"></div>

            <div className="flex flex-col items-center gap-8 relative z-10">
                <div className="relative">
                    {/* Ring Spinner - Black on White */}
                    <div className="w-16 h-16 border-[3px] border-black/10 border-t-black rounded-full animate-spin"></div>
                    {/* Inner Pulse Dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-black rounded-full animate-ping"></div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.6em] text-black animate-in fade-in slide-in-from-bottom-2 duration-1000">
                        Synchronizing Identity
                    </p>
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-black/20">
                        Neural Link Active
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppSkeleton;
