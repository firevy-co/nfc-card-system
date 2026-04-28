import React from 'react';
import { FiPhone, FiMail, FiMapPin, FiStar, FiGlobe, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const EliteCounsel = ({ userData }) => {
  const { displayName, email, role, phone, website, address } = userData || {};
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-['Mulish'] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm bg-slate-900 rounded-[3rem] p-1 shadow-2xl overflow-hidden group">
        <div className="bg-white p-10 rounded-[2.8rem] text-center relative overflow-hidden">
           <div className="absolute top-4 right-10 text-slate-100"><FiStar size={40} /></div>
           
           <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white text-3xl font-black mb-8 mx-auto shadow-2xl transition-transform group-hover:scale-110 overflow-hidden">
              {userData?.logo ? (
                <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
              ) : (
                displayName?.charAt(0) || 'C'
              )}
           </div>
           
           <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase mb-2">{displayName || 'Elite Counsel'}</h1>
           
           
           <div className="space-y-3 relative z-10 text-left">
              {website && <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiGlobe size={18} /> <span className="text-sm">{website}</span></a>}
              {email && <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiMail size={18} /> <span className="text-sm">{email}</span></a>}
              {phone && <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiPhone size={18} /> <span className="text-sm">{phone}</span></a>}
              {address && <div className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80"><FiMapPin size={18} /> <span className="text-sm">{address}</span></div>}

              {/* Legal Social Matrix */}
              {userData?.linkedin && <a href={userData?.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiLinkedin size={18} /> <span className="text-sm">{userData?.linkedin}</span></a>}
              {userData?.instagram && <a href={userData?.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiInstagram size={18} /> <span className="text-sm">{userData?.instagram}</span></a>}
           </div>
           
           <div className="mt-8 flex flex-col gap-3">
              <button className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] hover:brightness-125 transition-all shadow-xl shadow-slate-900/20 active:scale-95">
                Schedule Chambers Call
              </button>
           </div>
           
           {address && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>)}
           
           <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>
        </div>
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-center text-[7px] text-white/20 font-black tracking-[0.8em] py-8 uppercase hover:opacity-70 transition-opacity">Powered by Cardyn</a>
      </div>
    </div>
  );
};
export default EliteCounsel;
