import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const TrustMedical = ({ userData }) => {
  const { displayName, email, phone, website, address, linkedin, instagram, facebook, twitter, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-start justify-center py-16 px-6 font-['Mulish'] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
        
        <div className="flex flex-col items-center text-center mb-10">
           <div className="w-20 h-20 rounded-2xl bg-cyan-400 text-black mb-8 flex items-center justify-center shadow-xl shadow-cyan-400/20 transform group-hover:scale-105 transition-transform overflow-hidden p-0.5">
              {logo ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-[14px] bg-black" />
              ) : (
                  <FiIcons.FiPlusSquare size={32} />
              )}
           </div>
           <h1 className="text-2xl font-black text-white tracking-tight leading-none">{displayName || 'Medical Node'}</h1>
           <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.2em] mt-3">Health Professional</p>
        </div>
        
        <div className="space-y-3 relative z-10">
           {website && <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiGlobe size={18} /> <span className="text-sm">{website}</span></a>}
           {email && <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiMail size={18} /> <span className="text-sm">{email}</span></a>}
           {phone && <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiPhone size={18} /> <span className="text-sm">{phone}</span></a>}
           {address && <div className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80"><FiIcons.FiMapPin size={18} /> <span className="text-sm">{address}</span></div>}
           {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiLinkedin size={18} /> <span className="text-sm">{linkedin}</span></a>}
           {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiInstagram size={18} /> <span className="text-sm">{instagram}</span></a>}
           {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiFacebook size={18} /> <span className="text-sm">{facebook}</span></a>}
           {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiTwitter size={18} /> <span className="text-sm">{twitter}</span></a>}
        </div>

        {website && (
            <div className="flex flex-col gap-3 mt-10">
                <a href={website} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all active:scale-95">
                    Book Appointment
                </a>
            </div>
        )}

        {/* Map Preview */}
        {address && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>)}

        <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>

        <PoweredBy />
      </div>
    </div>
  );
};
export default TrustMedical;
