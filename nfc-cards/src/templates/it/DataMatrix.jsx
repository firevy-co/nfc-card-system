import React from 'react';
import { FiGrid, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const DataMatrix = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-[#000] flex items-center justify-center p-6 font-['Space Grotesk']">
      <div className="w-full max-w-sm border border-[#111] bg-[#050505] rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <FiGrid size={120} />
        </div>
        <div className="mb-12">
           <div className="text-white/20 text-[6px] font-black tracking-[0.5em] uppercase mb-4">Cardyn Systems / Identity / 2026</div>
           <h1 className="text-4xl font-black text-white tracking-tighter capitalize">{displayName || 'Data Node'}</h1>
           <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] mt-3">{role || 'Systems Analyst'}</p>
        </div>
        
        <div className="space-y-4">
           <a href={`tel:${mobileNumber}`} className="flex flex-col border-l-2 border-emerald-500 pl-4 py-2 group">
              <span className="text-[8px] text-white/30 font-bold uppercase tracking-widest mb-1 group-hover:text-emerald-500 transition-colors">Access Link</span>
              <span className="text-white text-lg font-bold tracking-tight">{mobileNumber || '++ -- ---'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex flex-col border-l-2 border-white/5 pl-4 py-2 group hover:border-emerald-500 transition-all">
              <span className="text-[8px] text-white/30 font-bold uppercase tracking-widest mb-1 group-hover:text-emerald-500 transition-colors">Neural Address</span>
              <span className="text-white text-lg font-bold tracking-tight truncate">{email || 'null@matrix.net'}</span>
           </a>
           <a href={website} className="mt-8 flex items-center justify-between bg-emerald-500 text-black p-5 rounded-2xl group hover:brightness-110 transition-all active:scale-[0.98]">
              <span className="font-black text-xs uppercase tracking-widest">Connect Matrix</span>
              <FiGlobe size={20} />
           </a>
        </div>
        <div className="mt-12 opacity-10 flex gap-2">
           <div className="w-full h-1 bg-white" />
           <div className="w-12 h-1 bg-white" />
           <div className="w-4 h-1 bg-white" />
        </div>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};
export default DataMatrix;
