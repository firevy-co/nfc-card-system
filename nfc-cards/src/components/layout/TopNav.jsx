import React from "react";
import { FiBell, FiShare2, FiShield, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const TopNav = ({ title = "My Templates", showActions = true, onMenuToggle, isMenuOpen }) => {
    return (
        <header className="h-16 sm:h-24 bg-card border-b border-border flex items-center justify-between px-4 sm:px-10 shrink-0 sticky top-0 z-[50] transition-all duration-300 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-8 min-w-0">
                <button
                    onClick={onMenuToggle}
                    className="lg:hidden w-11 h-11 rounded-xl bg-foreground text-background flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90 shadow-xl border border-border shrink-0"
                    aria-label="Access Command Hub"
                >
                    <motion.span
                        animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        className="w-5 h-[2px] bg-background rounded-full transition-all duration-300"
                    />
                    {!isMenuOpen && (
                        <motion.span className="w-3.5 h-[1.5px] bg-background/70 rounded-full flex self-start ml-3" />
                    )}
                    <motion.span
                        animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        className="w-5 h-[2px] bg-background rounded-full transition-all duration-300"
                    />
                </button>

                <div className="flex flex-col min-w-0">
                    <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-muted-foreground capitalize tracking-[0.2em] opacity-60">
                        <FiShield className="text-primary" />
                        <span>Identity Network</span>
                        <FiChevronRight className="mt-0.5" />
                        <span className="text-foreground truncate">{title}</span>
                    </div>
                    <h2 className="text-base sm:text-2xl font-black text-foreground tracking-tighter capitalize truncate font-['Plus_Jakarta_Sans'] leading-none">
                        {isMenuOpen ? "Navigation Hub" : "Identity Studio"}
                    </h2>
                </div>
            </div>

            {showActions && !isMenuOpen && (
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="relative cursor-pointer p-2.5 rounded-xl bg-secondary hover:bg-border transition-all border border-border group hidden xs:block">
                        <FiBell size={16} className="text-muted-foreground group-hover:text-foreground transition-colors sm:w-[20px] sm:h-[20px]" />
                        <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full border-2 border-card shadow-sm"></div>
                    </div>

                    <button className="flex items-center justify-center gap-2 bg-foreground text-background px-4 sm:px-8 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] capitalize tracking-widest hover:brightness-125 transition-all shadow-xl active:scale-95 shrink-0">
                        <FiShare2 className="text-sm sm:text-base shrink-0" />
                        <span className="hidden sm:block">Broadcast</span>
                        <span className="sm:hidden">Share</span>
                    </button>
                </div>
            )}
        </header>
    );
};

export default TopNav;
