import React from 'react';
import { FiTool, FiPhone, FiMail, FiMapPin, FiTruck } from 'react-icons/fi';

const RigidBuild = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-6 font-Inter">
      <div className="w-full max-w-sm bg-[#1a1a1a] border-4 border-orange-500 rounded-3xl p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 text-orange-500 opacity-10 group-hover:opacity-20 transition-opacity">
           <FiTool size={120} />
        </div>
        <div className="mb-12 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center text-black mb-8 shadow-xl shadow-orange-500/20 group-hover:rotate-12 transition-transform">
              <FiTruck size={32} />
           </div>
           <h1 className="text-3xl font-black text-white tracking-widest uppercase leading-none">{displayName || 'Rigid Build'}</h1>
           <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] mt-3 italic">{role || 'Project Super'}</p>
        </div>
        
        <div className="space-y-4 relative z-10">
           <a href={`tel:${mobileNumber}`} className="flex items-center justify-between border-b border-white/5 pb-4 group/link">
              <span className="text-[10px] font-black text-white/30 tracking-widest uppercase group-hover/link:text-orange-500 transition-colors">On Site Link</span>
              <span className="text-white font-bold">{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center justify-between border-b border-white/5 pb-4 group/link">
              <span className="text-[10px] font-black text-white/30 tracking-widest uppercase group-hover/link:text-orange-500 transition-colors">Digital Logs</span>
              <span className="text-white font-bold truncate ml-8 font-mono">{email || 'SIGNAL'}</span>
           </a>
           <div className="flex items-center justify-between border-b border-white/5 pb-4 group/link">
              <span className="text-[10px] font-black text-white/30 tracking-widest uppercase group-hover/link:text-orange-500 transition-colors">HQ Location</span>
               <span className="text-white font-bold">{city || 'Field Office'}</span>
           </div>
           <button className="w-full mt-8 py-5 bg-white text-black rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-orange-500 active:scale-95 transition-all shadow-xl">Initiate Work</button>
        </div>
        <div className="mt-16 opacity-30 flex justify-between items-center relative z-10">
           <p className="text-[7px] font-black tracking-[0.8em] text-white">Rigid Protocol v3.0</p>
           <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center"><FiTool size={14} className="text-orange-500" /></div>
        </div>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};
export default RigidBuild;
