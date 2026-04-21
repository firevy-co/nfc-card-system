import React from 'react';
import { FiPhone, FiMail, FiMapPin, FiStar } from 'react-icons/fi';

const EliteCounsel = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-slate-900 rounded-[3rem] p-1 shadow-2xl overflow-hidden group">
        <div className="bg-white p-10 rounded-[2.8rem] text-center relative overflow-hidden">
           <div className="absolute top-4 right-10 text-slate-100"><FiStar size={40} /></div>
           <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center text-white text-3xl font-black mb-6 mx-auto shadow-2xl transition-transform group-hover:scale-110">
              {displayName?.charAt(0) || 'C'}
           </div>
           <h1 className="text-2xl font-black text-slate-900 tracking-tight capitalize">{displayName || 'Elite Counsel'}</h1>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3 mb-10">{role || 'Senior Managing Partner'}</p>
           
           <div className="space-y-3">
              <a href={`tel:${mobileNumber}`} className="flex items-center justify-center gap-3 bg-slate-50 py-4 rounded-3xl border border-slate-100 hover:bg-slate-900 hover:text-white transition-all font-bold text-sm text-slate-700">
                 <FiPhone size={16} /> {mobileNumber || 'Connect'}
              </a>
              <a href={`mailto:${email}`} className="flex items-center justify-center gap-3 bg-slate-50 py-4 rounded-3xl border border-slate-100 hover:bg-slate-900 hover:text-white transition-all font-bold text-sm text-slate-700 truncate px-6">
                 <FiMail size={16} /> {email || 'Email'}
              </a>
           </div>
           
           <button className="w-full mt-6 py-5 bg-slate-900 text-white rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] hover:brightness-125 transition-all">Schedule Call</button>
        </div>
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-center text-[7px] text-white/20 font-black tracking-[0.8em] py-8 uppercase hover:opacity-70 transition-opacity">Powered by Cardyn</a>
      </div>
    </div>
  );
};
export default EliteCounsel;
