import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const ExpertNode = ({ userData }) => {
  const { displayName, email, phone, website, address, linkedin, instagram, facebook, twitter, youtube, logo } = userData || {};
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Mulish',sans-serif] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm bg-neutral-900 border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500" />
        
        <div className="flex flex-col items-center mb-10">
           <div className="w-24 h-24 rounded-[2rem] bg-amber-500 text-black flex items-center justify-center mb-6 shadow-xl shadow-amber-500/20 group-hover:scale-105 transition-transform overflow-hidden p-1">
              {logo ? (
                <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-[28px] bg-black" />
              ) : (
                <FiIcons.FiAward size={36} />
              )}
           </div>
           <h1 className="text-2xl font-black text-white tracking-widest uppercase text-center italic leading-none">{displayName || 'Expert Node'}</h1>
           <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.5em] mt-3">Verified Service Partner</p>
        </div>
        
        <div className="space-y-3 relative z-10">
           {website && <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiGlobe size={18} /> <span className="text-sm">{website}</span></a>}
           {email && <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiMail size={18} /> <span className="text-sm">{email}</span></a>}
           {phone && <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiPhone size={18} /> <span className="text-sm">{phone}</span></a>}
           {address && <div className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80"><FiIcons.FiMapPin size={18} /> <span className="text-sm">{address}</span></div>}

           {/* Socials */}
           {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiInstagram size={18} /> <span className="text-sm">{instagram}</span></a>}
           {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiLinkedin size={18} /> <span className="text-sm">{linkedin}</span></a>}
           {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiFacebook size={18} /> <span className="text-sm">{facebook}</span></a>}
           {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiTwitter size={18} /> <span className="text-sm">{twitter}</span></a>}
           {youtube && <a href={youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiYoutube size={18} /> <span className="text-sm">{youtube}</span></a>}
        </div>

        {website && (
            <div className="mt-8 relative z-10">
               <a href={website} target="_blank" rel="noopener noreferrer" className="block w-full py-5 text-center bg-white text-black rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-amber-500 transition-all shadow-xl shadow-white/5 active:scale-95">Initialize Session</a>
            </div>
        )}

        <div className="mt-6 relative z-10">
           {address && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>)}
        </div>

        <div className="mt-6 relative z-10">
           <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>
        </div>

        <footer className="mt-16 text-center opacity-20 hover:opacity-100 transition-opacity">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] text-white font-black tracking-[0.8em] uppercase">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default ExpertNode;
