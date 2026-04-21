import React from 'react';
import { FiWind, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const WellnessWay = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-white border border-[#f0ede5] rounded-[5rem] p-12 shadow-[0_40px_80px_-20px_rgba(235,230,215,0.7)] flex flex-col items-center">
        <div className="w-20 h-20 rounded-[2.5rem] bg-[#f0ede5] flex items-center justify-center text-[#8e8d8a] mb-8 animate-pulse">
           <FiWind size={32} />
        </div>
        <h1 className="text-2xl font-black text-gray-800 tracking-tight text-center">{displayName || 'Wellness Way'}</h1>
        <p className="text-[#8e8d8a] text-[10px] font-black uppercase tracking-[0.5em] mt-3 mb-12">{role || 'Harmony Specialist'}</p>
        
        <div className="w-full space-y-3">
           <a href={`tel:${mobileNumber}`} className="w-full flex items-center justify-center p-5 rounded-[2.5rem] border border-[#f0ede5] text-gray-700 font-bold text-sm bg-transparent hover:bg-[#f0ede5] transition-all">
              {mobileNumber || 'Connect'}
           </a>
           <a href={`mailto:${email}`} className="w-full flex items-center justify-center p-5 rounded-[2.5rem] bg-gray-800 text-white font-bold text-sm hover:brightness-110 transition-all truncate px-6">
              {email || 'Email Address'}
           </a>
        </div>
        
        <div className="mt-12 opacity-30 flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
           <p className="text-[7px] font-black uppercase tracking-[0.8em]">Wellness Registry</p>
           <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
        </div>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};
export default WellnessWay;
