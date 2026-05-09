import React from "react";

/**
 * TEMPLATE CARD SKELETON
 * A high-fidelity loading placeholder for TemplateCard.
 * Matches the exact proportions and layout of the actual card.
 */
export default function TemplateCardSkeleton() {
    return (
        <div className="h-full min-h-[580px] rounded-2xl border border-black/5 bg-white shadow-[0_0_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col animate-pulse">
            {/* Preview Section Skeleton */}
            <div className="h-[360px] bg-gray-100/80 relative flex items-center justify-center p-4 border-b border-black/5">
                {/* Badge Skeleton */}
                <div className="absolute top-6 right-6 w-20 h-6 bg-gray-200/60 rounded-full"></div>
                
                {/* Device Frame Skeleton */}
                <div className="w-[165px] h-[320px] bg-gray-200/60 rounded-[2rem] shadow-sm relative">
                    <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-300/40 rounded-full"></div>
                </div>
            </div>

            {/* Info Section Skeleton */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col gap-6">
                <div>
                    {/* Title Skeleton */}
                    <div className="h-7 w-3/4 bg-gray-200/80 rounded mb-3"></div>
                    {/* Description Skeleton */}
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-100/80 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-100/80 rounded"></div>
                    </div>
                </div>

                {/* Actions Skeleton */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                    <div className="h-12 bg-gray-200/80 rounded-2xl"></div>
                    <div className="h-12 bg-gray-100/80 rounded-2xl"></div>
                    <div className="col-span-2 h-10 bg-gray-50 rounded-2xl"></div>
                </div>
            </div>
        </div>
    );
}
