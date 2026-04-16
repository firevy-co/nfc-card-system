import React from 'react';
import { FiPlusSquare, FiPhone, FiMail, FiMapPin, FiCalendar } from 'react-icons/fi';

const TrustMedical = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city, country } = userData || {};
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-white rounded-[3rem] p-10 shadow-[0_40px_80px_-20px_rgba(37,99,235,0.1)] border border-blue-100/50">
        <div className="flex items-center gap-4 mb-10">
           <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
              <FiPlusSquare size={32} />
           </div>
           <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">{displayName || 'Trust Medical'}</h1>
              <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-1">{role || 'General Practitioner'}</p>
           </div>
        </div>
        
        <div className="space-y-4">
           <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Professional Contact</p>
              <div className="space-y-4">
                 <a href={`tel:${mobileNumber}`} className="flex items-center gap-3 group">
                    <FiPhone size={16} className="text-blue-500" />
                    <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{mobileNumber || '+1 (800) HEALTH'}</span>
                 </a>
                 <a href={`mailto:${email}`} className="flex items-center gap-3 group">
                    <FiMail size={16} className="text-blue-500" />
                    <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors truncate">{email || 'care@trustmed.com'}</span>
                 </a>
                 <div className="flex items-center gap-3">
                    <FiMapPin size={16} className="text-blue-500" />
                    <span className="text-sm font-bold text-slate-700">{[city, country].filter(Boolean).join(', ') || 'Medical Plaza'}</span>
                 </div>
              </div>
           </div>
           
           <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
              <FiCalendar size={16} /> Book Appointment
           </button>
        </div>
        <p className="mt-10 text-[7px] text-center text-slate-300 font-bold uppercase tracking-[0.5em]">Firevy Healthcare Protocol</p>
      </div>
    </div>
  );
};
export default TrustMedical;
