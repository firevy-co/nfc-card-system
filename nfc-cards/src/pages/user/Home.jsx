import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import Layout from '../../components/layout/layout';
import { FiLogOut, FiEdit3, FiGlobe, FiShield } from 'react-icons/fi';

export const Home = ({ userData }) => {
    const handleLogout = () => signOut(auth);

    return (
        <Layout userData={userData} title="Home Center">
            <div className="min-h-[80vh] flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-card border border-border p-14 rounded-[3.5rem] shadow-premium max-w-2xl w-full text-center space-y-10 relative overflow-hidden group">
                    {/* Visual Identity Elements */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 group-hover:bg-indigo-500/10 transition-all duration-700"></div>

                    <header className="relative z-10">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-indigo-600 rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-primary/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <FiShield className="text-white text-4xl" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-5xl font-black tracking-tighter capitalize font-['Outfit']">Identity Node</h2>
                            <div className="flex items-center justify-center gap-2 text-primary font-black text-[10px] capitalize tracking-[0.4em] opacity-60">
                            <FiGlobe />
                            <span>Synchronized Protocol</span>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-[11px] font-black capitalize tracking-[0.2em] mt-6 bg-secondary/50 px-6 py-2 rounded-full inline-block border border-border">
                            {userData?.email || "Resolving Identity..."}
                        </p>
                    </header>

                    <div className="py-10 border-y border-border/50 relative z-10">
                        <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-md mx-auto">
                            Welcome to your digital orchestration hub. You are currently established as a secure participant within the <span className="text-foreground font-black">Firevy Network Architecture</span>.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 relative z-10">
                        <button className="flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-secondary text-foreground font-black text-[10px] capitalize tracking-[0.2em] hover:bg-border border border-border transition-all shadow-sm">
                            <FiEdit3 size={16} />
                            Metadata Audit
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-destructive text-white font-black capitalize tracking-[0.2em] text-[10px] hover:shadow-2xl hover:shadow-destructive/20 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-destructive/10"
                        >
                            <FiLogOut size={16} />
                            Terminate Session
                        </button>
                    </div>
                </div>
                
                <footer className="mt-16 opacity-30 pointer-events-none select-none">
                    <span className="text-[10px] font-black capitalize tracking-[0.6em] text-muted-foreground">Firevy Platform Orchestration © 2026</span>
                </footer>
            </div>
        </Layout>
    );
};
