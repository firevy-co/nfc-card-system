import React from 'react';
import { FiCoffee, FiPhone, FiMail, FiMapPin, FiInstagram } from 'react-icons/fi';

const UrbanBistro = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, city } = userData || {};
  return (
    <div className="min-h-screen bg-[#f3f1ed] flex items-center justify-center p-6 font-['Inter']">
      <div className="w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-[#e67e22] opacity-5 group-hover:opacity-10 transition-opacity">
           <FiCoffee size={180} />
        </div>
        <div className="mb-10 text-center">
           <div className="w-20 h-20 rounded-3xl bg-[#e67e22] text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#e67e22]/20">
              <FiCoffee size={32} />
           </div>
           <h1 className="text-3xl font-black text-[#2c3e50] tracking-tighter">{displayName || 'Urban Bistro'}</h1>
           <p className="text-[#e67e22] text-[10px] font-black uppercase tracking-[0.4em] mt-2">{role || 'General Manager'}</p>
        </div>
        
        <div className="space-y-4">
           <a href={`tel:${mobileNumber}`} className="flex items-center gap-4 bg-[#fcfaf7] p-4 rounded-2xl border border-[#ede3d8] hover:border-[#e67e22]/30 transition-all group/link">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#e67e22] shadow-sm"><FiPhone size={18} /></div>
              <span className="text-sm font-bold text-[#2c3e50]">{mobileNumber || 'Call Reserve'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center gap-4 bg-[#fcfaf7] p-4 rounded-2xl border border-[#ede3d8] hover:border-[#e67e22]/30 transition-all group/link">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#e67e22] shadow-sm"><FiMail size={18} /></div>
              <span className="text-sm font-bold text-[#2c3e50] truncate">{email || 'Email'}</span>
           </a>
           <a href={website} className="block w-full py-5 text-center bg-[#2c3e50] text-[#fcfaf7] rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-[#e67e22] transition-all shadow-xl shadow-[#2c3e50]/10">View Menu</a>
        </div>
        
        <div className="mt-12 text-center opacity-20">
           <p className="text-[7px] font-black tracking-[0.5em] text-[#2c3e50] uppercase italic">Urban Bistro Registry · Firevy</p>
        </div>
      </div>
    </div>
  );
};
export default UrbanBistro;
