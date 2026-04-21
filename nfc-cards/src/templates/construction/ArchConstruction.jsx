import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ArchConstruction = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
      linkedin,
      instagram,
      facebook,
      twitter
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#020617] flex justify-center items-start py-8 px-4 text-white font-['Mulish']">
         <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group">

            {/* RAW INDUSTRIAL HEADER */}
            <div className="flex flex-col items-center text-center mb-10 mt-6 relative z-10">
               <div className="w-16 h-16 bg-cyan-400 text-black rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-cyan-400/20 transform group-hover:scale-110 transition-transform overflow-hidden">
                  {userData?.logo ? (
                    <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                    <FiIcons.FiLayers size={32} />
                  )}
               </div>
               <h1 className="text-3xl font-black tracking-tighter leading-none mb-2 uppercase text-center">
                  {displayName || 'Architectural Hub'}
               </h1>
               <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mt-2">
                  Building The Future
               </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-10 w-full">
               <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all">
                  Initiate Consultation
               </button>
            </div>

            {/* CONTACT LINKS */}
            <div className="space-y-3 relative z-10">
               <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
               <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
               <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
               <StandardContactLink icon={FiIcons.FiMapPin} value={address} />
               
               {/* Social Uplinks */}
               <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
               <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />
               <StandardContactLink icon={FiIcons.FiTwitter} value={twitter} href={twitter} />
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

export default ArchConstruction;
