import React from 'react';
import { FiPhone, FiMail, FiGlobe, FiMapPin, FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ExecutiveMinimal = ({ userData }) => {
  const { displayName, email, role, phone, website, companyName, address } = userData || {};
  return (
    <div className="min-h-screen bg-[#020617] text-white flex justify-center items-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm">
        <div className="bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
          <div className="mb-10 text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 text-3xl font-black mb-6 overflow-hidden">
              {userData?.logo ? (
                <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
              ) : (
                displayName?.charAt(0) || 'E'
              )}
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight capitalize leading-none">{displayName || 'Anonymous Identity'}</h1>
            <p className="text-[10px] font-black text-cyan-400 mt-3 uppercase tracking-[0.3em] opacity-80">{role || 'Consultant'}</p>
            <p className="text-[8px] font-black text-gray-500 mt-1 uppercase tracking-[0.2em]">{companyName}</p>
          </div>

          <div className="space-y-3">
            <StandardContactLink icon={FiGlobe} value={website} href={website} />
            <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />
            <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
            <StandardContactLink icon={FiMapPin} value={address} />

            {/* Dynamic Social Uplinks */}
            <StandardContactLink icon={FiLinkedin} value={userData?.linkedin} href={userData?.linkedin} />
            <StandardContactLink icon={FiTwitter} value={userData?.twitter} href={userData?.twitter} />
            <StandardContactLink icon={FiGithub} value={userData?.github} href={userData?.github} />
          </div>

          <div className="flex flex-col gap-3 mt-10">
            <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all">
              Our Portfolio
            </button>
          </div>

          <StandardMapPreview address={address} />

          <StandardSaveContactButton userData={userData} />

          <footer className="mt-12 text-center opacity-20">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-widest uppercase hover:opacity-100 transition-opacity tracking-[0.5em]">Powered by Cardyn</a>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default ExecutiveMinimal;
