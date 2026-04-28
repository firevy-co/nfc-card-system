import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const EliteTrainer = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
      linkedin,
      instagram,
      youtube,
      twitter
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#020617] flex justify-center items-start py-16 px-4 text-white font-['Mulish']">
         <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] shadow-2xl backdrop-blur-xl p-8 relative overflow-hidden group">
            
            {/* POWER STRIPE DECORATION */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-[80px]"></div>

            {/* COACH HEADER */}
            <div className="flex flex-col items-center text-center mt-4">
               <div className="w-24 h-24 bg-cyan-400/10 border border-cyan-400/20 rounded-3xl flex items-center justify-center mb-6 transform group-hover:rotate-0 transition-transform duration-500 shadow-xl shadow-cyan-400/10 overflow-hidden">
                  {userData?.logo ? (
                     <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                     <FiIcons.FiZap size={32} className="text-cyan-400" />
                  )}
               </div>

               <h1 className="text-3xl font-black text-white tracking-tight leading-none mb-1 italic uppercase text-center">
                  {displayName || 'Performance Lab'}
               </h1>

               <div className="text-cyan-400 text-[10px] font-black capitalize tracking-[0.4em] mb-10 opacity-80 mt-2">
                  TACTICAL PERFORMANCE COACH
               </div>
            </div>

            {/* METRICS STACK */}
            <div className="grid grid-cols-2 gap-3 mb-8 font-black">
               <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center gap-1 group transition-all">
                  <span className="text-[7px] uppercase tracking-widest text-gray-500">Availability</span>
                  <span className="text-xs text-white">PRO READY</span>
               </div>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center gap-1 group transition-all">
                  <span className="text-[7px] uppercase tracking-widest text-gray-500">Specialty</span>
                  <span className="text-xs text-white">ELITE PERFORMANCE</span>
               </div>
            </div>

            {/* ACTION STACK */}
            <div className="flex flex-col gap-3 mb-10">
               <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all flex items-center justify-center gap-3">
                  <FiIcons.FiActivity size={18} />
                  Start Enrollment
               </button>
            </div>

            {/* CONTACT MINIMALIST STACK */}
            <div className="space-y-3 relative z-10">
               {website && <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiGlobe size={18} /> <span className="text-sm">{website}</span></a>}
               {email && <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiMail size={18} /> <span className="text-sm">{email}</span></a>}
               {phone && <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiPhone size={18} /> <span className="text-sm">{phone}</span></a>}
               {address && <div className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80"><FiIcons.FiMapPin size={18} /> <span className="text-sm">{address}</span></div>}

               {/* Social Uplinks */}
               {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiLinkedin size={18} /> <span className="text-sm">{linkedin}</span></a>}
               {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiInstagram size={18} /> <span className="text-sm">{instagram}</span></a>}
               {youtube && <a href={youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiYoutube size={18} /> <span className="text-sm">{youtube}</span></a>}
               {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiTwitter size={18} /> <span className="text-sm">{twitter}</span></a>}
            </div>

            {address && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>)}

            <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>

            <footer className="mt-12 text-center opacity-20">
                <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-[0.5em] text-gray-300 hover:text-white transition-colors uppercase">Powered by Cardyn</a>
            </footer>
         </div>
      </div>
   );
};

export default EliteTrainer;
