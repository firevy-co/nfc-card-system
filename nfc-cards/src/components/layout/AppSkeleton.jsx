import React from 'react';

const AppSkeleton = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#020202] flex w-full font-['Mulish'] overflow-hidden">
            {/* Sidebar Skeleton (Desktop only) - High Fidelity */}
            <div className="hidden lg:flex w-[300px] flex-col border-r border-black/5 dark:border-white/5 p-10 gap-12 bg-white/50 dark:bg-white/[0.02] backdrop-blur-3xl relative z-20">
                {/* Logo Area */}
                <div className="flex items-center gap-5 px-2">
                    <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-2xl animate-pulse"></div>
                    <div className="w-32 h-8 bg-black/5 dark:bg-white/5 rounded-full animate-pulse"></div>
                </div>
                
                {/* Navigation Links Group */}
                <div className="space-y-6 mt-8">
                    <div className="w-20 h-3 bg-black/5 dark:bg-white/5 rounded-full mb-10 opacity-30 tracking-widest uppercase text-[10px] font-black"></div>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-full h-16 bg-black/[0.03] dark:bg-white/[0.03] rounded-[1.25rem] animate-pulse flex items-center px-6 gap-4 border border-transparent">
                            <div className="w-6 h-6 bg-black/5 dark:bg-white/5 rounded-lg"></div>
                            <div className="w-24 h-4 bg-black/5 dark:bg-white/5 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Main Content Area Skeleton */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
                {/* Fixed TopNav Skeleton */}
                <div className="h-24 border-b border-black/5 dark:border-white/5 flex items-center justify-between px-8 sm:px-12 bg-white/30 dark:bg-black/20 backdrop-blur-2xl">
                    <div className="flex items-center gap-5 w-full max-w-xl">
                        <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-2xl animate-pulse lg:hidden"></div>
                        <div className="flex-1 h-16 bg-black/[0.03] dark:bg-white/[0.03] rounded-2xl animate-pulse border border-black/5 dark:border-white/5 hidden sm:block"></div>
                    </div>
                    <div className="flex items-center gap-5 pl-8">
                        <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-2xl animate-pulse hidden sm:block"></div>
                        <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-full animate-pulse border border-black/5 dark:border-white/5"></div>
                        <div className="w-40 h-16 bg-black/10 dark:bg-white/10 rounded-2xl animate-pulse hidden md:block shadow-xl border border-black/5 dark:border-white/5"></div>
                    </div>
                </div>
                
                {/* Fluid Body Content Skeleton */}
                <div className="flex-1 overflow-y-auto p-8 sm:p-14 w-full bg-[#F3F5F7] dark:bg-transparent relative">
                    {/* Subtle Background Glows for Dark Mode */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 opacity-0 dark:opacity-100"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 opacity-0 dark:opacity-100"></div>

                    {/* Header Region Skeleton */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-2">
                        <div className="space-y-5">
                            <div className="w-32 h-4 bg-black/5 dark:bg-white/5 rounded-full animate-pulse opacity-30 font-black tracking-widest text-[10px] uppercase"></div>
                            <div className="w-64 sm:w-[550px] h-12 sm:h-16 bg-black/[0.05] dark:bg-white/[0.05] rounded-2xl animate-pulse"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-40 h-16 bg-black/[0.05] dark:bg-white/[0.05] rounded-2xl animate-pulse border border-black/5 dark:border-white/10"></div>
                            <div className="w-16 h-16 bg-black/[0.05] dark:bg-white/[0.05] rounded-2xl animate-pulse border border-black/5 dark:border-white/10 text-center"></div>
                        </div>
                    </div>
                    
                    {/* Stat Cards Row Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-44 bg-white/90 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] animate-pulse p-10 flex flex-col justify-between shadow-xl shadow-black/[0.02]">
                                <div className="flex justify-between items-start">
                                    <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-2xl"></div>
                                    <div className="w-20 h-7 bg-black/5 dark:bg-white/5 rounded-full"></div>
                                </div>
                                <div className="w-3/4 h-12 bg-black/5 dark:bg-white/5 rounded-xl"></div>
                            </div>
                        ))}
                    </div>
 
                    {/* Visual Data Regions Skeleton */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-1">
                        <div className="lg:col-span-2 h-[500px] bg-white/90 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[3.5rem] animate-pulse shadow-xl shadow-black/[0.02]"></div>
                        <div className="h-[500px] bg-white/90 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[3.5rem] animate-pulse shadow-xl shadow-black/[0.02]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppSkeleton;
