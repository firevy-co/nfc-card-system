import React from 'react';
import { FiHeart, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const VelvetSkin = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-black border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-1 bg-rose-500 mb-12 opacity-50" />
          <h1 className="text-3xl font-light text-white tracking-[0.2em] uppercase text-center">{displayName || 'Velvet Skin'}</h1>
          
          
          <div className="w-full space-y-4">
            <a href={`tel:${mobileNumber}`} className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-rose-500/30 transition-all group/link">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover/link:bg-rose-500 group-hover/link:text-white transition-all"><FiPhone size={18} /></div>
              <span className="text-sm font-bold text-white/80">{mobileNumber || 'Connect'}</span>
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-rose-500/30 transition-all group/link">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover/link:bg-rose-500 group-hover/link:text-white transition-all"><FiMail size={18} /></div>
              <span className="text-sm font-bold text-white/80 truncate">{email || 'Inquiries'}</span>
            </a>
          </div>
          <button className="mt-12 w-full py-5 bg-rose-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-rose-500/20">Book Treatment</button>
          
          <p className="mt-12 text-[7px] text-white/10 font-black tracking-[1em] uppercase">Velvet Identity v1.0</p>
        </div>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};
export default VelvetSkin;
