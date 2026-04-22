import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const VividStudio = ({ userData }) => {
  const { displayName, email, role, phone, website, address, instagram, linkedin } = userData || {};
  return (
    <div className="min-h-screen bg-[#ff3366] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-white rounded-[3rem] p-10 shadow-[0_50px_100px_-20px_rgba(255,51,102,0.3)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff3366]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div className="w-16 h-16 bg-[#ff3366]/10 rounded-2xl flex items-center justify-center overflow-hidden">
               {userData?.logo ? (
                 <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
               ) : (
                 <h1 className="text-3xl font-black text-[#ff3366] tracking-tighter leading-none italic">{displayName?.charAt(0) || 'V'}</h1>
               )}
            </div>
            <div className="px-4 py-1.5 rounded-full bg-[#ff3366]/10 text-[#ff3366] text-[10px] font-black uppercase tracking-widest">In Motion</div>
          </div>
          <div className="mb-10">
            <h2 className="text-3xl font-black text-black tracking-tighter leading-tight">{displayName || 'Vivid Artist'}</h2>
            <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mt-2 italic">{role || 'Creative Director'}</p>
          </div>
          
          <div className="space-y-3">
             <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
             <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
             <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
             <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

             {/* Agency Socials */}
             <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />
             <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
          </div>

          <div className="mt-8">
             <a href={website} target="_blank" rel="noopener noreferrer" className="block text-center bg-black text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#ff3366] transition-all overflow-hidden group relative">
                <span className="relative z-10 transition-transform group-hover:scale-110 inline-block">View Portfolio</span>
             </a>
          </div>

          <StandardMapPreview address={address} />

          <StandardSaveContactButton userData={userData} />

          <footer className="mt-10 text-center opacity-10">
             <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[7px] text-gray-800 font-black tracking-[0.6em] uppercase hover:opacity-100 transition-opacity">Powered by Cardyn</a>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default VividStudio;
