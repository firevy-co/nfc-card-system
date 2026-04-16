import React from 'react';
import { FiFigma, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const VividStudio = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-[#ff3366] flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-white rounded-[3rem] p-10 shadow-[0_50px_100px_-20px_rgba(255,51,102,0.3)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff3366]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-black text-[#ff3366] tracking-tighter leading-none italic">{displayName?.charAt(0) || 'V'}</h1>
            <div className="px-4 py-1.5 rounded-full bg-[#ff3366]/10 text-[#ff3366] text-[10px] font-black uppercase tracking-widest">In Motion</div>
          </div>
          <div className="mb-10">
            <h2 className="text-3xl font-black text-black tracking-tighter">{displayName || 'Vivid Artist'}</h2>
            <p className="text-gray-400 font-bold text-sm mt-1">{role || 'Creative Director'}</p>
          </div>
          <div className="space-y-4">
             <a href={`tel:${mobileNumber}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#ff3366] group-hover:text-white transition-all"><FiPhone size={18} /></div>
                <span className="text-sm font-bold text-gray-800">{mobileNumber || '+0 112 358'}</span>
             </a>
             <a href={`mailto:${email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#ff3366] group-hover:text-white transition-all"><FiMail size={18} /></div>
                <span className="text-sm font-bold text-gray-800 truncate">{email || 'hello@vivid.st'}</span>
             </a>
          </div>
          <a href={website} className="mt-12 block text-center bg-black text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#ff3366] transition-all overflow-hidden group relative">
             <span className="relative z-10 transition-transform group-hover:scale-110 inline-block">View Portfolio</span>
          </a>
          <p className="text-center text-[7px] text-gray-200 font-black tracking-[0.6em] mt-10 uppercase">Firevy Creative Studio</p>
        </div>
      </div>
    </div>
  );
};
export default VividStudio;
