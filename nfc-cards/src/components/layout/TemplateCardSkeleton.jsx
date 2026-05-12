import React from "react";

/**
 * TEMPLATE CARD SKELETON
 * A high-fidelity loading placeholder for TemplateCard.
 * Matches the exact proportions and layout of the actual card.
 */
export default function TemplateCardSkeleton() {
    return (
        <div className="h-full min-h-[580px] rounded-2xl border border-black/5 bg-white shadow-[0_0_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
            {/* Preview Section Skeleton */}
            <div className="h-[360px] bg-accent/5 relative flex items-center justify-center p-4 border-b border-black/5">
                {/* Badge Skeleton */}
                <div className="absolute top-6 right-6 w-20 h-6 skeleton-box"></div>
                
                {/* Device Frame Skeleton */}
                <div className="w-[165px] h-[320px] bg-accent/10 rounded-[2rem] shadow-sm relative skeleton-box border-4 border-white">
                    <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-16 h-4 bg-white/40 rounded-full"></div>
                </div>
            </div>

            {/* Info Section Skeleton */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col gap-6">
                <div>
                    {/* Title Skeleton */}
                    <div className="h-7 w-3/4 skeleton-box mb-3"></div>
                    {/* Description Skeleton */}
                    <div className="space-y-2">
                        <div className="h-4 w-full skeleton-box opacity-60"></div>
                        <div className="h-4 w-5/6 skeleton-box opacity-60"></div>
                    </div>
                </div>

                {/* Actions Skeleton */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                    <div className="h-12 skeleton-box"></div>
                    <div className="h-12 bg-gray-50 rounded-2xl"></div>
                    <div className="col-span-2 h-10 bg-gray-50/50 rounded-2xl"></div>
                </div>
            </div>
        </div>
    );
}
