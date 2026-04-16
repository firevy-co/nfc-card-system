import React from 'react';
import { FiPhone, FiMail, FiGlobe, FiMapPin } from 'react-icons/fi';

const BoldEntrepreneur = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, companyName, city, country } = userData || {};
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm">
        <div className="bg-yellow-400 rounded-t-[2.5rem] p-8">
          <div className="w-24 h-24 rounded-2xl bg-black flex items-center justify-center text-yellow-400 text-4xl font-black mb-6 shadow-2xl">
            {displayName?.charAt(0) || 'B'}
          </div>
          <h1 className="text-3xl font-black text-black tracking-tighter capitalize">{displayName || 'Entrepreneur'}</h1>
          <p className="text-black/60 font-black text-sm mt-1 uppercase tracking-widest">{role || 'Founder & CEO'}</p>
          <p className="text-black/40 font-bold text-xs mt-0.5">{companyName}</p>
        </div>
        <div className="bg-zinc-900 rounded-b-[2.5rem] p-8 space-y-4">
          {mobileNumber && <a href={`tel:${mobileNumber}`} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-yellow-400/10 transition-all border border-white/5 group"><FiPhone size={16} className="text-yellow-400" /><span className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">{mobileNumber}</span></a>}
          {email && <a href={`mailto:${email}`} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-yellow-400/10 transition-all border border-white/5 group"><FiMail size={16} className="text-yellow-400" /><span className="text-sm font-bold text-white truncate group-hover:text-yellow-400 transition-colors">{email}</span></a>}
          {website && <a href={website} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-yellow-400/10 transition-all border border-white/5 group"><FiGlobe size={16} className="text-yellow-400" /><span className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">{website}</span></a>}
          {(city || country) && <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"><FiMapPin size={16} className="text-yellow-400" /><span className="text-sm font-bold text-white">{[city, country].filter(Boolean).join(', ')}</span></div>}
          <button className="w-full mt-2 py-5 bg-yellow-400 text-black rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-yellow-300 transition-all shadow-2xl shadow-yellow-400/20">Make Contact</button>
        </div>
      </div>
    </div>
  );
};
export default BoldEntrepreneur;
