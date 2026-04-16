import React from 'react';
import { FiShield, FiPhone, FiMail, FiMapPin, FiBriefcase } from 'react-icons/fi';

const JusticePartners = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city, country } = userData || {};
  return (
    <div className="min-h-screen bg-[#fcf9f5] flex items-center justify-center p-6 font-serif">
      <div className="w-full max-w-sm bg-white border border-[#e8dfd3] rounded-3xl p-10 shadow-2xl relative">
        <div className="absolute top-8 right-10 text-[#c5a176]"><FiShield size={32} opacity={0.2} /></div>
        <div className="mb-12">
           <div className="w-16 h-1 bg-[#c5a176] mb-6" />
           <h1 className="text-3xl font-black text-[#1a1a1a] tracking-tight italic capitalize">{displayName || 'Justice Partner'}</h1>
           <p className="text-[#c5a176] text-[11px] font-bold uppercase tracking-[0.3em] font-sans mt-3">{role || 'Attorney at Law'}</p>
        </div>
        
        <div className="space-y-5 font-sans">
           <div className="p-5 bg-[#faf8f6] rounded-2xl border border-[#ede3d8]">
              <p className="text-[9px] font-black text-[#8a7a6a] uppercase tracking-widest mb-4">Official Counsel</p>
              <div className="space-y-4">
                 <a href={`tel:${mobileNumber}`} className="flex items-center gap-4 group">
                    <FiPhone size={18} className="text-[#c5a176]" />
                    <span className="text-sm font-bold text-[#4a4a4a] group-hover:text-black transition-colors">{mobileNumber || '+1 (800) LEGAL'}</span>
                 </a>
                 <a href={`mailto:${email}`} className="flex items-center gap-4 group">
                    <FiMail size={18} className="text-[#c5a176]" />
                    <span className="text-sm font-bold text-[#4a4a4a] group-hover:text-black transition-colors truncate">{email || 'counsel@justice.com'}</span>
                 </a>
                 <div className="flex items-center gap-4">
                    <FiMapPin size={18} className="text-[#c5a176]" />
                    <span className="text-sm font-bold text-[#4a4a4a]">{[city, country].filter(Boolean).join(', ') || 'District Court'}</span>
                 </div>
              </div>
           </div>
           
           <button className="w-full mt-4 py-5 bg-[#1a1a1a] text-[#c5a176] rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:brightness-125 hover:shadow-xl transition-all">
              <FiBriefcase size={16} /> Consult Counsel
           </button>
        </div>
        <p className="mt-12 text-[7px] text-center text-[#c5a176] font-bold uppercase tracking-[0.6em] font-sans">Firevy Judicial Registry</p>
      </div>
    </div>
  );
};
export default JusticePartners;
