import React from 'react';
import { FiCheckCircle, FiPhone, FiMail, FiGlobe, FiTool, FiMapPin, FiLinkedin, FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const TaskGrid = ({ userData }) => {
  const { displayName, email, phone, website, address, linkedin, instagram, facebook, twitter, youtube, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center py-8 px-6 font-['Mulish',sans-serif] text-slate-900 md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-slate-100 opacity-20 pointer-events-none"><FiTool size={120} /></div>
        
        <div className="mb-10 relative z-10 flex flex-col items-center text-center">
           <div className="w-24 h-24 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center mb-6 shadow-xl group-hover:rotate-6 transition-transform overflow-hidden p-1 border-2 border-slate-900">
              {logo ? (
                <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-xl bg-white" />
              ) : (
                <FiCheckCircle size={36} />
              )}
           </div>
           <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none uppercase">{displayName || 'Expert Node'}</h1>
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-3">Technical Specialist</p>
        </div>
        
        <div className="space-y-3 relative z-10 mb-8">
           {website && <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiGlobe size={18} /> <span className="text-sm">{website}</span></a>}
           {email && <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiMail size={18} /> <span className="text-sm">{email}</span></a>}
           {phone && <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiPhone size={18} /> <span className="text-sm">{phone}</span></a>}
           {address && <div className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80"><FiMapPin size={18} /> <span className="text-sm">{address}</span></div>}
           
           {/* Social Integrations */}
           {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiInstagram size={18} /> <span className="text-sm">{instagram}</span></a>}
           {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiLinkedin size={18} /> <span className="text-sm">{linkedin}</span></a>}
           {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiTwitter size={18} /> <span className="text-sm">{twitter}</span></a>}
           {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiFacebook size={18} /> <span className="text-sm">{facebook}</span></a>}
           {youtube && <a href={youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiYoutube size={18} /> <span className="text-sm">{youtube}</span></a>}
        </div>
        
        {website && (
            <div className="flex flex-col gap-3 mb-8 relative z-10">
               <a href={website} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-slate-900 text-white py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:brightness-125 active:scale-95 transition-all">
                  Verify Credentials
               </a>
            </div>
        )}

        <div className="mt-6 relative z-10">
           {address && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>)}
        </div>
        
        <div className="mt-6 relative z-10">
           <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>
        </div>
        
        <footer className="mt-12 text-center opacity-40 hover:opacity-100 transition-opacity">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-[0.5em] text-slate-400 hover:text-slate-900 uppercase">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default TaskGrid;
