import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaYoutube, FaTiktok, FaDiscord, FaTelegram, FaSkype, FaPaypal } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';

const QuantumCode = ({ userData }) => {
  const { 
    displayName, email, role, phone, website, address, bio,
    whatsapp, facebook, youtube, tiktok, discord, telegram, skype, paypal,
    github, linkedin, twitter, instagram, company, businessName, logo, profileImage
  } = userData || {};
  
  return (
    <div className="w-full bg-[#050510] font-['Mulish'] relative overflow-hidden">
      {/* CYBER AMBIENT LAYERS */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0ff 1px, transparent 1px), linear-gradient(90deg, #0ff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse"></div>
      
      <div className="w-full bg-[#0a0a1f]/80 border-b border-cyan-500/20 shadow-[0_0_80px_rgba(6,182,212,0.15)] backdrop-blur-2xl relative z-10 overflow-hidden group">
        
        {/* NEON HEADER BLOCK */}
        <div className="bg-gradient-to-br from-[#0a0a1f] to-[#161633] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
          
          {/* SYSTEM BRAND NODE */}
          <div className="w-32 h-32 rounded-3xl bg-cyan-500/5 flex items-center justify-center text-cyan-400 border-2 border-cyan-400/20 shadow-[0_0_30px_rgba(34,211,238,0.2)] mx-auto mb-8 relative z-10 group-hover:rotate-[360deg] transition-transform duration-1000 overflow-hidden">
            <img src={logo || profileImage} alt={displayName} className="w-full h-full object-cover rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"></div>
          </div>
          
          <h1 className="text-white text-4xl font-black tracking-tighter uppercase leading-none relative z-10 mb-4">
            {displayName || 'Quantum Architect'}
          </h1>
          
          {(company || businessName) && (
             <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest">
                {company || businessName}
             </p>
          )}
          
          {/* STATUS PROTOCOL */}
          <div className="mt-8 flex items-center justify-center gap-3 relative z-10">
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
             <span className="text-[9px] font-black uppercase tracking-[0.5em] text-cyan-400/60">Node Online</span>
          </div>
        </div>
        
        {/* INTERACTION SUITE */}
        <div className="p-8 space-y-10 relative z-10">
           
           {/* BIO BLOCK */}
           {bio && (
             <div className="text-center px-4">
                <p className="text-sm text-cyan-400/40 font-medium leading-relaxed font-mono">
                   &gt; {bio}
                </p>
             </div>
           )}

           {/* CORE UPLINKS */}
           <div className="space-y-4">
              {email && <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiMail size={18} /> <span className="text-sm">{email}</span></a>}
              {phone && <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiPhone size={18} /> <span className="text-sm">{phone}</span></a>}
              {address && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiMapPin size={18} /> <span className="text-sm">Deployment Sector</span></a>}
           </div>

           {/* TECH SOCIAL MATRIX */}
           <div className="grid grid-cols-4 gap-4">
              {[
                 { id: 'github', val: github, icon: FiIcons.FiGithub, color: 'hover:bg-zinc-800' },
                 { id: 'linkedin', val: linkedin, icon: FiIcons.FiLinkedin, color: 'hover:bg-[#0077b5]' },
                 { id: 'whatsapp', val: whatsapp, icon: FaWhatsapp, color: 'hover:bg-[#25d366]' },
                 { id: 'telegram', val: telegram, icon: FaTelegram, color: 'hover:bg-[#0088cc]' },
                 { id: 'discord', val: discord, icon: FaDiscord, color: 'hover:bg-[#5865f2]' },
                 { id: 'twitter', val: twitter, icon: FiIcons.FiTwitter, color: 'hover:bg-black' },
                 { id: 'youtube', val: youtube, icon: FaYoutube, color: 'hover:bg-[#ff0000]' },
                 { id: 'facebook', val: facebook, icon: FaFacebook, color: 'hover:bg-[#1877f2]' }
              ].map((social, i) => social.val && (
                 <a 
                   key={i}
                   href={social.id === 'whatsapp' ? `https://wa.me/${social.val.replace(/\D/g, '')}` : (social.val.startsWith('http') ? social.val : `https://${social.id}.com/${social.val}`)} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className={`aspect-square rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-cyan-400/40 hover:text-white transition-all ${social.color}`}
                 >
                    <social.icon size={22} />
                 </a>
              ))}
           </div>

           {/* PRIMARY COMMAND (PORTAL) */}
           {website && (
              <div className="pt-2">
                 <a 
                   href={website.startsWith('http') ? website : `https://${website}`} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="w-full flex items-center justify-center gap-4 bg-cyan-500 text-[#050510] py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:brightness-110 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all shadow-xl active:scale-95"
                 >
                   <FiIcons.FiTerminal size={20} /> Execute Portal
                 </a>
              </div>
           )}

           {/* MAP PROTOCOL */}
           {address && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>}

           {/* SAVE CONTACT PROTOCOL */}
           <div className="pt-2">
              <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>
           </div>

           {/* SYSTEM FOOTER */}
           <div className="pt-10 pb-10 text-center">
              <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="inline-block text-[8px] text-cyan-400/20 font-black uppercase tracking-[0.6em] hover:text-cyan-400 transition-colors py-3 px-8 border border-white/5 rounded-full backdrop-blur-sm">
                Powered by Cardyn Identity
              </a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumCode;
