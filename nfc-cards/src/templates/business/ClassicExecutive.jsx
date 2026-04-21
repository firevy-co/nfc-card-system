import React from 'react';
import { FiPhone, FiMail, FiGlobe, FiLinkedin, FiMapPin, FiWifi } from 'react-icons/fi';

/**
 * CLASSIC EXECUTIVE TEMPLATE
 * Design-forward, professional V-Card layout.
 */
const ClassicExecutive = ({ userData }) => {
  const { displayName, email, role, phone = "+1 (234) 567-890" } = userData || {};

  return (
    <div className="min-h-screen bg-card text-foreground flex flex-col items-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-secondary/30 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full translate-x-12 -translate-y-12 blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>

        {/* Header: Photo & Identity */}
        <header className="flex flex-col items-center mb-10 relative z-10">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary to-indigo-600 mb-6 flex items-center justify-center p-1 shadow-xl">
             <div className="w-full h-full bg-secondary border border-white/10 rounded-[1.8rem] flex items-center justify-center text-3xl font-black capitalize overflow-hidden">
                {/* Fallback to initials */}
                {displayName?.charAt(0) || "U"}
             </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground font-['Mulish'] capitalize">
            {displayName || "Identity Holder"}
          </h1>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-background text-[10px] font-black capitalize tracking-[0.2em] shadow-lg shadow-primary/20">
             {role || "System Architect"}
          </div>
        </header>

        {/* Contact Matrix */}
        <div className="space-y-4 relative z-10">
           <a href={`tel:${phone}`} className="flex items-center gap-4 bg-secondary p-4 rounded-2xl border border-white/5 hover:border-primary/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:text-primary">
                 <FiPhone size={18} />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-muted-foreground capitalize tracking-widest mb-0.5">Cellular Node</p>
                 <p className="font-bold text-sm">{phone}</p>
              </div>
           </a>

           <a href={`mailto:${email}`} className="flex items-center gap-4 bg-secondary p-4 rounded-2xl border border-white/5 hover:border-primary/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:text-primary">
                 <FiMail size={18} />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-muted-foreground capitalize tracking-widest mb-0.5">Cloud Mailbox</p>
                 <p className="font-bold text-sm truncate max-w-[180px]">{email || "resolving..."}</p>
              </div>
           </a>

           <div className="flex items-center gap-4 bg-secondary p-4 rounded-2xl border border-white/5 hover:border-primary/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:text-primary">
                 <FiGlobe size={18} />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-muted-foreground capitalize tracking-widest mb-0.5">Network Site</p>
                 <p className="font-bold text-sm">firevy.co/network</p>
              </div>
           </div>
        </div>

        {/* CTA Section */}
        <button className="w-full mt-10 py-5 rounded-3xl bg-primary text-background font-black text-[10px] capitalize tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-3">
           <FiWifi className="text-sm" />
           Synchronize Identity
        </button>

        <footer className="mt-10 text-center opacity-30 select-none pointer-events-none">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black capitalize tracking-[0.6em] hover:opacity-70 transition-opacity">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};

export default ClassicExecutive;
