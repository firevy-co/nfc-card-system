import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const SovereignLaw = ({ userData }) => {
  const { displayName, email, role, phone, website, address } = userData || {};
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-all duration-1000 opacity-20" />
        
        <div className="mb-10 text-center flex flex-col items-center">
           <div className="w-16 h-1 bg-cyan-400 mb-8 opacity-50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
           <h1 className="text-2xl font-black text-white tracking-tight uppercase leading-none">{displayName || 'Sovereign Law'}</h1>
           
        </div>
        
        <div className="space-y-3 relative z-10">
           {website && <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiGlobe size={18} /> <span className="text-sm">{website}</span></a>}
           {email && <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiMail size={18} /> <span className="text-sm">{email}</span></a>}
           {phone && <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiPhone size={18} /> <span className="text-sm">{phone}</span></a>}
           {address && <div className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80"><FiIcons.FiMapPin size={18} /> <span className="text-sm">{address}</span></div>}
           {userData?.linkedin && <a href={userData?.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiLinkedin size={18} /> <span className="text-sm">{userData?.linkedin}</span></a>}
           {userData?.instagram && <a href={userData?.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiIcons.FiInstagram size={18} /> <span className="text-sm">{userData?.instagram}</span></a>}
        </div>

        <div className="flex flex-col gap-3 mt-10 w-full">
            <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all">
                Request Consultation
            </button>
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
export default SovereignLaw;
