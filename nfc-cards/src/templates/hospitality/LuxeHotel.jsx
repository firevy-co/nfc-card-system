import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const LuxeHotel = ({ userData }) => {
  const { displayName, email, phone, website, address, logo, linkedin, instagram, facebook, twitter } = userData || {};
  
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-['Mulish',sans-serif]">
      <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col items-center group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-indigo-600 to-cyan-400 opacity-50" />

        <div className="flex gap-1 mb-6 opacity-40 mt-2">
          <FiIcons.FiStar size={12} className="text-cyan-400" />
          <FiIcons.FiStar size={12} className="text-cyan-400" />
          <FiIcons.FiStar size={12} className="text-cyan-400" />
          <FiIcons.FiStar size={12} className="text-cyan-400" />
          <FiIcons.FiStar size={12} className="text-cyan-400" />
        </div>
        
        <div className="w-24 h-24 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-6 overflow-hidden shadow-xl shadow-cyan-400/10 p-1">
           {logo ? (
              <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full" />
           ) : (
              <FiIcons.FiHome size={32} className="text-cyan-400" />
           )}
        </div>

        <h1 className="text-2xl font-black text-white tracking-tight uppercase text-center mb-1 leading-none">{displayName || 'Luxe Hotel'}</h1>
        <p className="text-[9px] text-cyan-400 font-bold uppercase tracking-[0.3em] mb-8 text-center">Premium Hospitality</p>

        <div className="w-full space-y-3 relative z-10">
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
            <div className="flex flex-col gap-3 mt-8 w-full">
              <a href={website} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all active:scale-95">
                Book Reservation
              </a>
            </div>
        )}

        {address && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>)}

        <div className="w-full mt-6">
            <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>
        </div>

        <footer className="mt-12 text-center opacity-20 hover:opacity-100 transition-opacity">
          <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-[0.5em] text-gray-300 hover:text-white uppercase">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default LuxeHotel;
