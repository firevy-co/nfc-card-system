import React from 'react';
import { FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const GoldenGrace = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-white border border-[#ead8c2] rounded-[4rem] p-12 shadow-[0_30px_60px_-15px_rgba(234,216,194,0.5)] flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-[#fcf5eb] border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] text-4xl mb-8">
           {displayName?.charAt(0) || 'G'}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight text-center">{displayName || 'Golden Grace'}</h1>
        <p className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.3em] mt-3 mb-10">{role || 'Luxury Consultant'}</p>
        
        <div className="w-full space-y-2">
          {mobileNumber && <a href={`tel:${mobileNumber}`} className="w-full py-4 text-center rounded-2xl bg-[#fcf5eb] text-gray-800 font-bold text-sm block hover:bg-[#f9eee0] transition-all">{mobileNumber}</a>}
          {email && <a href={`mailto:${email}`} className="w-full py-4 text-center rounded-2xl bg-[#fcf5eb] text-gray-800 font-bold text-sm block hover:bg-[#f9eee0] transition-all truncate px-4">{email}</a>}
          {website && <a href={website} className="w-full py-4 text-center rounded-2xl bg-gray-900 text-white font-bold text-sm block hover:bg-black transition-all">Visit Showroom</a>}
        </div>
        
        <div className="mt-12 flex items-center gap-1 opacity-20">
          <div className="w-8 h-px bg-black" />
          <span className="text-[7px] font-black uppercase tracking-[0.5em]">Cardyn Luxe</span>
          <div className="w-8 h-px bg-black" />
        </div>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};
export default GoldenGrace;
