import React from 'react';
import { FiPhone, FiMail, FiGlobe, FiMapPin, FiHeart } from 'react-icons/fi';

const VelvetBoutique = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, companyName, city, country } = userData || {};
  return (
    <div className="min-h-screen bg-[#1c1817] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-[#251f1e] border border-[#3b3231] rounded-[2rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-1 bg-[#d4af37] rounded-full opacity-50" />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-2xl font-serif italic text-[#d4af37] tracking-wider mb-2">{displayName || 'Velvet Boutique'}</h1>
          <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.4em]">{role || 'Artisanal Designer'}</p>
        </div>
        <div className="space-y-4">
          <a href={`tel:${mobileNumber}`} className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-[#d4af37]/30 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]"><FiPhone size={18} /></div>
            <span className="text-sm font-bold text-white/80">{mobileNumber || '+1 (555) VELVET'}</span>
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-[#d4af37]/30 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]"><FiMail size={18} /></div>
            <span className="text-sm font-bold text-white/80 truncate">{email || 'hello@velvet.com'}</span>
          </a>
          {(city || country) && (
            <div className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/5">
              <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]"><FiMapPin size={18} /></div>
              <span className="text-sm font-bold text-white/80">{[city, country].filter(Boolean).join(', ')}</span>
            </div>
          )}
        </div>
        <div className="mt-12 flex items-center justify-center gap-2 text-white/20">
          <FiHeart size={14} />
          <p className="text-[8px] font-black uppercase tracking-[0.2em]">Exclusively Crafted Identity</p>
        </div>
      </div>
    </div>
  );
};
export default VelvetBoutique;
