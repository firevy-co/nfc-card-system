import React from 'react';
import { FiLayout, FiSettings, FiCheckCircle, FiGlobe, FiMail, FiWifi } from 'react-icons/fi';

/**
 * SERVICE PORTFOLIO TEMPLATE
 * List-based layout optimized for service-oriented businesses.
 */
const ServicePortfolio = ({ userData }) => {
  const { displayName, email, role, phone = "+1 (999) 000-111" } = userData || {};

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-foreground p-6 flex flex-col items-center pt-20">
      <div className="w-full max-w-sm bg-secondary/10 border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
        
        {/* Abstract Background Decoration */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all duration-1000"></div>

        <header className="mb-14 text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/20 mx-auto mb-8 flex items-center justify-center p-2 border border-primary/30">
             <FiLayout size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl font-black tracking-tighter mb-2 text-foreground capitalize">{displayName || "SERVICE HUB"}</h2>
          
        </header>

        {/* Service List Identity */}
        <div className="space-y-4 mb-14">
           {['Digital Strategy', 'Network Deployment', 'Cloud Architecture'].map((service, index) => (
             <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-crosshair group/item">
                <FiCheckCircle className="text-primary opacity-40 group-hover/item:opacity-100 transition-opacity" />
                <span className="text-xs font-bold tracking-wide text-foreground/80">{service}</span>
             </div>
           ))}
        </div>

        {/* Action Controls */}
        <div className="space-y-4">
           <a href={`tel:${phone}`} className="flex items-center gap-6 bg-white/5 p-5 rounded-[2rem] border border-white/5 hover:border-primary/50 transition-all group/link">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/link:bg-primary transition-all">
                 <FiWifi size={18} className="group-hover/link:text-background" />
              </div>
              <div>
                 <p className="text-[8px] font-bold text-muted-foreground capitalize tracking-widest mb-0.5">Cellular Bridge</p>
                 <p className="font-bold text-sm tracking-widest">{phone}</p>
              </div>
           </a>

           <a href={`mailto:${email}`} className="flex items-center gap-6 bg-white/5 p-5 rounded-[2rem] border border-white/5 hover:border-primary/50 transition-all group/link">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover/link:bg-primary transition-all">
                 <FiMail size={18} className="group-hover/link:text-background" />
              </div>
              <div>
                 <p className="text-[8px] font-bold text-muted-foreground capitalize tracking-widest mb-0.5">Cloud Relay</p>
                 <p className="font-bold text-sm tracking-widest truncate max-w-[150px]">{email || "resolving..."}</p>
              </div>
           </a>
        </div>

        {/* Branding */}
        <footer className="mt-16 text-center opacity-40 select-none pointer-events-none">
           <div className="flex items-center justify-center gap-2 mb-6">
              <FiSettings size={14} className="opacity-20 translate-y-0.5" />
              <p className="text-[8px] font-black capitalize tracking-[0.6em]">Modular Identity System</p>
           </div>
        </footer>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};

export default ServicePortfolio;
