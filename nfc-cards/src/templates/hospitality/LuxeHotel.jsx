import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const LuxeHotel = ({ userData }) => {
  const { displayName, email, role, phone, website, address } = userData || {};
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col items-center group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-indigo-600 to-cyan-400 opacity-50" />
        
        <div className="flex gap-1 mb-8 opacity-30 mt-4">
           <FiIcons.FiStar size={12} className="text-cyan-400" />
           <FiIcons.FiStar size={12} className="text-cyan-400" />
           <FiIcons.FiStar size={12} className="text-cyan-400" />
           <FiIcons.FiStar size={12} className="text-cyan-400" />
           <FiIcons.FiStar size={12} className="text-cyan-400" />
        </div>
        
        <h1 className="text-2xl font-black text-white tracking-tight uppercase text-center mb-2 leading-none">{displayName || 'Hospitality Node'}</h1>
        <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12 opacity-80">{role || 'Concierge Services'}</p>
        
        <div className="w-full space-y-3 relative z-10">
           <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiIcons.FiMapPin} value={address} />
           <StandardContactLink icon={FiIcons.FiLinkedin} value={userData?.linkedin} href={userData?.linkedin} />
           <StandardContactLink icon={FiIcons.FiInstagram} value={userData?.instagram} href={userData?.instagram} />
        </div>

        <div className="flex flex-col gap-3 mt-10 w-full">
            <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all">
                Book Reservation
            </button>
        </div>

        <StandardMapPreview address={address} />

        <StandardSaveContactButton />

        <footer className="mt-12 text-center opacity-20">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-[0.5em] text-gray-300 hover:text-white transition-colors uppercase">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default LuxeHotel;
