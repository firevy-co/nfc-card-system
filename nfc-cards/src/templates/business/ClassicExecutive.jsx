import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ClassicExecutive = ({ userData }) => {
  const { 
    displayName, 
    email, 
    role, 
    phone, 
    website,
    address,
    linkedin,
    instagram,
    facebook,
    twitter,
    github
  } = userData || {};

  return (
    <div className="min-h-screen bg-[#020617] text-white flex justify-center items-start py-16 px-4 font-['Mulish']">
      <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full translate-x-12 -translate-y-12 blur-3xl group-hover:bg-cyan-400/20 transition-all duration-700"></div>

        {/* Header: Photo & Identity */}
        <header className="flex flex-col items-center mb-10 relative z-10">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-cyan-400 to-indigo-600 mb-6 flex items-center justify-center p-1 shadow-xl">
             <div className="w-full h-full bg-[#020617] border border-white/10 rounded-[1.8rem] flex items-center justify-center text-3xl font-black capitalize overflow-hidden">
                {userData?.logo ? (
                  <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                ) : (
                  displayName?.charAt(0) || "U"
                )}
             </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2 text-white capitalize leading-none text-center">
            {displayName || "No Name Set"}
          </h1>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400 text-black text-[9px] font-black capitalize tracking-[0.2em] shadow-lg shadow-cyan-400/20 mt-2">
             {role || "No Role Set"}
          </div>
        </header>

        {/* Contact Matrix */}
        <div className="space-y-3 relative z-10">
           <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

           {/* Dynamic Social Uplinks */}
           <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
           <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />
           <StandardContactLink icon={FiIcons.FiFacebook} value={facebook} href={facebook} />
           <StandardContactLink icon={FiIcons.FiTwitter} value={twitter} href={twitter} />
           <StandardContactLink icon={FiIcons.FiGithub} value={github} href={github} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-10">
            <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all">
                Our Portfolio
            </button>
            <button className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                View Network
            </button>
        </div>

        {/* Map Preview */}
        <StandardMapPreview address={address} />

        {/* Save Contact */}
        <StandardSaveContactButton />

        <footer className="mt-12 text-center opacity-20">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black capitalize tracking-[0.5em] hover:opacity-100 transition-opacity">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};

export default ClassicExecutive;
