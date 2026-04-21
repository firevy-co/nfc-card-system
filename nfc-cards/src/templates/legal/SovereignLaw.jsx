import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const SovereignLaw = ({ userData }) => {
  const { displayName, email, role, phone, website, address } = userData || {};
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-all duration-1000 opacity-20" />
        
        <div className="mb-10 text-center flex flex-col items-center">
           <div className="w-16 h-1 bg-cyan-400 mb-8 opacity-50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
           <h1 className="text-2xl font-black text-white tracking-tight uppercase leading-none">{displayName || 'Sovereign Law'}</h1>
           <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3 opacity-80">{role || 'Legal Counsel'}</p>
        </div>
        
        <div className="space-y-3 relative z-10">
           <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiIcons.FiMapPin} value={address} />
           <StandardContactLink icon={FiIcons.FiLinkedin} value={userData?.linkedin} href={userData?.linkedin} />
           <StandardContactLink icon={FiIcons.FiInstagram} value={userData?.instagram} href={userData?.instagram} />
        </div>

        <div className="flex flex-col gap-3 mt-10 w-full">
            <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all">
                Request Consultation
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
export default SovereignLaw;
