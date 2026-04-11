import React from 'react';

const AppSkeleton = () => {
    return (
        <div className="min-h-screen bg-background flex w-full">
            {/* Sidebar Skeleton (Desktop only) */}
            <div className="hidden md:flex w-72 flex-col border-r border-border p-6 gap-8 bg-card/10">
                {/* Logo Area */}
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 bg-muted/60 rounded-xl animate-pulse"></div>
                    <div className="w-32 h-6 bg-muted/60 rounded-md animate-pulse"></div>
                </div>
                
                {/* Navigation Links */}
                <div className="space-y-3 mt-4">
                    <div className="w-20 h-3 bg-muted/60 rounded-full mb-6"></div>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="w-full h-12 bg-muted/40 rounded-2xl animate-pulse flex items-center px-4 gap-4">
                            <div className="w-5 h-5 bg-muted/60 rounded-md"></div>
                            <div className="w-24 h-4 bg-muted/60 rounded-md"></div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Main Content Area Skeleton */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* TopNav Skeleton */}
                <div className="h-24 border-b border-border/50 flex items-center justify-between px-6 sm:px-10 bg-background/50">
                    <div className="flex items-center gap-4 w-full max-w-md">
                        <div className="w-10 h-10 bg-muted/60 rounded-xl animate-pulse md:hidden"></div>
                        <div className="flex-1 h-12 bg-muted/30 rounded-2xl animate-pulse border border-border/20 hidden sm:block"></div>
                    </div>
                    <div className="flex items-center gap-4 pl-4">
                        <div className="w-10 h-10 bg-muted/60 rounded-2xl animate-pulse hidden sm:block"></div>
                        <div className="w-10 h-10 bg-muted/60 rounded-full animate-pulse border border-border/20"></div>
                        <div className="w-32 h-12 bg-muted/40 rounded-2xl animate-pulse hidden md:block"></div>
                    </div>
                </div>
                
                {/* Body Content Skeleton */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-10 w-full">
                    {/* Header Region */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div className="space-y-4">
                            <div className="w-24 h-4 bg-muted/60 rounded-full animate-pulse"></div>
                            <div className="w-64 sm:w-96 h-10 sm:h-12 bg-muted/60 rounded-xl animate-pulse"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-32 h-12 bg-muted/40 rounded-xl animate-pulse"></div>
                            <div className="w-12 h-12 bg-muted/40 rounded-xl animate-pulse"></div>
                        </div>
                    </div>
                    
                    {/* Stat Cards Region */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-32 bg-card/40 border border-border/40 rounded-[2rem] animate-pulse p-6 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 bg-muted/60 rounded-xl"></div>
                                    <div className="w-16 h-6 bg-muted/40 rounded-full"></div>
                                </div>
                                <div className="w-3/4 h-8 bg-muted/60 rounded-lg"></div>
                            </div>
                        ))}
                    </div>

                    {/* Main Section Region */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 h-[400px] bg-card/40 border border-border/40 rounded-[2.5rem] animate-pulse"></div>
                        <div className="h-[400px] bg-card/40 border border-border/40 rounded-[2.5rem] animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppSkeleton;
