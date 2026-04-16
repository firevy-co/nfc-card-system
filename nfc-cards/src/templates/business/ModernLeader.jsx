import React from 'react';
import { FiPhone, FiMail, FiGlobe, FiMapPin, FiAward } from 'react-icons/fi';

const ModernLeader = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, companyName, bio } = userData || {};
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-[3rem] p-1 shadow-2xl overflow-hidden group">
        <div className="bg-slate-900 p-8 rounded-[2.8rem] text-center text-white relative">
          <div className="absolute top-4 right-8"><FiAward size={20} className="text-slate-700" /></div>
          <div className="w-24 h-24 rounded-full border-4 border-slate-700 mx-auto mb-6 overflow-hidden bg-slate-800 flex items-center justify-center text-4xl font-black">
            {displayName?.charAt(0) || 'L'}
          </div>
          <h1 className="text-2xl font-black tracking-tight capitalize">{displayName || 'Modern Leader'}</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">{role || 'Executive Protocol'}</p>
        </div>
        <div className="p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <a href={`tel:${mobileNumber}`} className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center gap-2 border border-slate-100 hover:border-slate-900 transition-all">
              <FiPhone size={18} className="text-slate-900" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call</span>
            </a>
            <a href={`mailto:${email}`} className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center gap-2 border border-slate-100 hover:border-slate-900 transition-all">
              <FiMail size={18} className="text-slate-900" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</span>
            </a>
          </div>
          <a href={website} className="flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:brightness-125 transition-all">
             Visit Portal
          </a>
          <p className="text-[9px] text-center text-slate-300 font-bold uppercase tracking-[0.3em] pt-4">Firevy Authorized Identity</p>
        </div>
      </div>
    </div>
  );
};
export default ModernLeader;
