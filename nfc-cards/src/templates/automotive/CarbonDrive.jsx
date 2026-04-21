import React from 'react';
import { FiTarget, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const CarbonDrive = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-zinc-900 border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-red-600 via-transparent to-red-600" />
        <div className="mb-10 flex items-center justify-between">
           <div>
              <h1 className="text-2xl font-black text-white tracking-widest uppercase italic">{displayName || 'Carbon Drive'}</h1>
              <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mt-1">{role || 'Performance Lead'}</p>
           </div>
           <div className="w-12 h-12 bg-red-600 flex items-center justify-center text-white rounded-xl shadow-xl shadow-red-600/20 group-hover:scale-110 transition-transform">
              <FiTarget size={24} />
           </div>
        </div>
        
        <div className="space-y-4">
           <a href={`tel:${mobileNumber}`} className="flex flex-col bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-red-600/30 transition-all group">
              <span className="text-[8px] font-black text-white/30 tracking-widest uppercase mb-1 group-hover:text-red-600 transition-colors">Emergency Dispatch</span>
              <span className="text-white text-lg font-bold tracking-tight">{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex flex-col bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-red-600/30 transition-all group">
              <span className="text-[8px] font-black text-white/30 tracking-widest uppercase mb-1 group-hover:text-red-600 transition-colors">Cloud Signal</span>
              <span className="text-white text-lg font-bold tracking-tight truncate">{email || 'Email'}</span>
           </a>
           <button className="w-full mt-4 py-5 bg-red-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:brightness-110 transition-all shadow-xl shadow-red-600/20">Initialize Control</button>
        </div>
        
        <div className="mt-12 opacity-10 flex justify-between items-center">
           <p className="text-[7px] font-black tracking-[0.8em] text-white uppercase italic">Carbon Fabric v8</p>
           <div className="w-12 h-0.5 bg-white" />
        </div>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};
export default CarbonDrive;
