import React from 'react';
import { FiPhone, FiMail, FiGlobe, FiMapPin, FiBriefcase } from 'react-icons/fi';

const CorporateGlass = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, companyName, bio } = userData || {};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-500/30">
              {displayName?.charAt(0) || 'C'}
            </div>
            <div>
              <h1 className="text-xl font-black text-white capitalize">{displayName || 'Corporate Lead'}</h1>
              <p className="text-blue-300 text-xs font-bold mt-1">{role || 'Director'}</p>
              <div className="flex items-center gap-1.5 mt-1"><FiBriefcase size={10} className="text-white/40" /><p className="text-white/40 text-[10px] font-bold">{companyName || 'Company'}</p></div>
            </div>
          </div>
          {bio && <p className="text-white/60 text-xs font-bold mb-6 leading-relaxed">{bio}</p>}
          <div className="space-y-3">
            {mobileNumber && <a href={`tel:${mobileNumber}`} className="flex items-center gap-4 bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all border border-white/5"><FiPhone size={16} className="text-blue-300" /><span className="text-sm font-bold text-white">{mobileNumber}</span></a>}
            {email && <a href={`mailto:${email}`} className="flex items-center gap-4 bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all border border-white/5"><FiMail size={16} className="text-blue-300" /><span className="text-sm font-bold text-white truncate">{email}</span></a>}
            {website && <a href={website} className="flex items-center gap-4 bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all border border-white/5"><FiGlobe size={16} className="text-blue-300" /><span className="text-sm font-bold text-white">{website}</span></a>}
          </div>
          <button className="w-full mt-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:scale-[1.02] transition-all">Connect Now</button>
        </div>
      </div>
    </div>
  );
};
export default CorporateGlass;
