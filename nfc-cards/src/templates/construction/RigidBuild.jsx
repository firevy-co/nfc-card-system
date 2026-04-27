import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const RigidBuild = ({ userData }) => {
  const { displayName, email, role, phone, website, address, linkedin } = userData || {};
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-[#1a1a1a] border-4 border-orange-500 rounded-3xl p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 text-orange-500 opacity-10 group-hover:opacity-20 transition-opacity">
           <FiIcons.FiTool size={120} />
        </div>
        <div className="mb-12 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center text-black mb-8 shadow-xl shadow-orange-500/20 group-hover:rotate-12 transition-transform overflow-hidden">
              {userData?.logo ? (
                <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
              ) : (
                <FiIcons.FiTruck size={32} />
              )}
           </div>
           <h1 className="text-3xl font-black text-white tracking-widest uppercase leading-none">{displayName || 'Rigid Build'}</h1>
           
        </div>
        
        <div className="space-y-3 relative z-10">
           <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

           {/* Professional Socials */}
           <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
        </div>

        <div className="mt-8 relative z-10">
           <button className="w-full py-5 bg-white text-black rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-orange-500 active:scale-95 transition-all shadow-xl">Initiate Work</button>
        </div>

        <StandardMapPreview address={address} />

        <StandardSaveContactButton userData={userData} />

        <div className="mt-16 opacity-30 flex justify-between items-center relative z-10">
           <p className="text-[7px] font-black tracking-[0.8em] text-white uppercase italic">Rigid Protocol v3.0</p>
           <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center"><FiIcons.FiTool size={14} className="text-orange-500" /></div>
        </div>

        <footer className="mt-8 text-center opacity-10">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[8px] font-black tracking-[0.4em] text-gray-400 hover:text-white transition-colors uppercase font-mulish">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default RigidBuild;
