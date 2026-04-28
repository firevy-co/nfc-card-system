import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const ZenCafe = ({ userData }) => {
  const { displayName, email, role, phone, website, address, instagram } = userData || {};
  return (
    <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-white border border-[#e5e5e0] rounded-[5rem] p-10 shadow-2xl overflow-hidden flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#f4f4f0] flex items-center justify-center text-[#86867e] mb-8 overflow-hidden">
           {userData?.logo ? (
             <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
           ) : (
             <FiIcons.FiWind size={32} />
           )}
        </div>
        <h1 className="text-2xl font-black text-[#444440] tracking-tight text-center leading-none">{displayName || 'Zen Cafe'}</h1>
        
        
        <div className="w-full space-y-3 relative z-10">
           {website && <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiGlobe size={18} /> <span className="text-sm">{website}</span></a>}
           {email && <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiMail size={18} /> <span className="text-sm">{email}</span></a>}
           {phone && <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiPhone size={18} /> <span className="text-sm">{phone}</span></a>}
           {address && <div className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80"><FiIcons.FiMapPin size={18} /> <span className="text-sm">{address}</span></div>}

           {/* Socials */}
           {userData?.instagram && <a href={userData?.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiInstagram size={18} /> <span className="text-sm">{userData?.instagram}</span></a>}
           {userData?.twitter && <a href={userData?.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiTwitter size={18} /> <span className="text-sm">{userData?.twitter}</span></a>}
           {userData?.facebook && <a href={userData?.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiFacebook size={18} /> <span className="text-sm">{userData?.facebook}</span></a>}
           {userData?.linkedin && <a href={userData?.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiLinkedin size={18} /> <span className="text-sm">{userData?.linkedin}</span></a>}
           {userData?.youtube && <a href={userData?.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiYoutube size={18} /> <span className="text-sm">{userData?.youtube}</span></a>}
        </div>

        <div className="w-full mt-6">
           <a href={`tel:${phone}`} className="w-full flex items-center justify-center py-4 rounded-3xl bg-[#f4f4f0] text-[#444440] font-black text-xs hover:bg-[#ebebe7] transition-all uppercase tracking-widest shadow-sm">
              Connect Directly
           </a>
        </div>

        {address && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>)}

        <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>
        
        <div className="mt-12 flex justify-center gap-2 opacity-20">
           <div className="w-2 h-2 rounded-full bg-[#86867e]" />
           <div className="w-2 h-2 rounded-full bg-[#83a493]" />
           <div className="w-2 h-2 rounded-full bg-[#d9c49d]" />
        </div>
        <footer className="mt-8 text-center opacity-20">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[7px] font-black tracking-[0.6em] text-[#444440] uppercase hover:opacity-100 transition-opacity">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default ZenCafe;
