import React from 'react';
import { FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const ClinicaElite = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, companyName } = userData || {};
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-6 font-Inter">
      <div className="w-full max-w-sm bg-black border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600" />
        <div className="mb-12">
           <h1 className="text-4xl font-black text-white tracking-tighter italic">{displayName?.charAt(0) || 'C'}</h1>
           <div className="mt-8">
              <h2 className="text-2xl font-black text-white tracking-tighter">{displayName || 'Clinica Elite'}</h2>
              <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">{role || 'Specialist Surgeon'}</p>
           </div>
        </div>
        
        <div className="space-y-4">
           <a href={`tel:${mobileNumber}`} className="flex items-center justify-between border-b border-white/10 pb-4 group/link">
              <span className="text-[10px] font-black text-white/30 tracking-widest uppercase group-hover/link:text-blue-500 transition-colors">Emergency</span>
              <span className="text-white font-bold">{mobileNumber || '000.000'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center justify-between border-b border-white/10 pb-4 group/link">
              <span className="text-[10px] font-black text-white/30 tracking-widest uppercase group-hover/link:text-blue-500 transition-colors">Consult</span>
              <span className="text-white font-bold truncate ml-4">{email || 'elite@clinica.st'}</span>
           </a>
           <a href={website} className="mt-8 flex items-center justify-center gap-3 bg-white text-black py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all">
              Initialize Protocol
           </a>
        </div>
        
        <div className="mt-16 flex justify-between items-center opacity-20">
           <p className="text-[7px] font-black tracking-[0.6em] text-white">Elite Medical v4</p>
           <div className="flex gap-1">
              <div className="w-4 h-0.5 bg-white" />
              <div className="w-1 h-0.5 bg-white" />
           </div>
        </div>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};
export default ClinicaElite;
