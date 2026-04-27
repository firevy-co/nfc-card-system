import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const VelocityElite = ({ userData }) => {
  const { displayName, email, role, phone, website, address, linkedin, instagram, facebook, twitter } = userData || {};
  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-start justify-center py-16 px-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden group">

        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-cyan-400 text-black mb-8 flex items-center justify-center p-2 shadow-xl shadow-cyan-400/20 transform group-hover:scale-110 transition-transform">
            <FiIcons.FiTriangle className="rotate-90" size={32} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight leading-none uppercase">{displayName || 'Vehicle Node'}</h1>
          
        </div>

        <div className="space-y-3 relative z-10">
          <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
          <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
          <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
          <StandardContactLink icon={FiIcons.FiMapPin} value={address} />
          <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
          <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />
          <StandardContactLink icon={FiIcons.FiFacebook} value={facebook} href={facebook} />
          <StandardContactLink icon={FiIcons.FiTwitter} value={twitter} href={twitter} />
        </div>

        <div className="flex flex-col gap-3 mt-10">
          <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all">
            Access Showroom
          </button>
        </div>

        {/* Map Preview */}
        <StandardMapPreview address={address} />

        <StandardSaveContactButton userData={userData} />

        <footer className="mt-12 text-center opacity-20">
          <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-[0.5em] text-gray-300 hover:text-white transition-colors uppercase">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default VelocityElite;
