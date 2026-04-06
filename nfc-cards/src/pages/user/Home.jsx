import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';

export const Home = ({ userData }) => {
    const handleLogout = () => signOut(auth);

    return (
        <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="bg-card/30 backdrop-blur-3xl border border-border p-12 rounded-[3.5rem] shadow-premium max-w-2xl w-full text-center space-y-8 relative overflow-hidden">
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"></div>

                <header>
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-cyan-500/20 rotate-3">
                        <span className="text-2xl font-black text-white italic">F</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter uppercase tracking-[0.2em]">Identity Node</h2>
                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] mt-2 opacity-50 underline decoration-cyan-400/20 underline-offset-4">{userData?.email}</p>
                </header>

                <div className="py-8 border-y border-border/50">
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                        Welcome to your digital orchestration hub. You are currently connected to the <span className="text-cyan-400 font-bold">Firevy Architecture</span>.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="flex-1 px-8 py-4 rounded-2xl bg-white/5 border border-border text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-cyan-400 transition-all">
                        Edit Metadata
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="flex-1 px-8 py-4 rounded-2xl bg-red-500/10 text-red-500 font-black uppercase tracking-widest text-[10px] border border-red-500/20 hover:bg-red-500 hover:text-black transition-all shadow-xl hover:shadow-red-500/20"
                    >
                        Sign Out Session
                    </button>
                </div>
            </div>
            
            <footer className="mt-12 opacity-20 pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Firevy Platform Architecture</span>
            </footer>
        </div>
    );
};