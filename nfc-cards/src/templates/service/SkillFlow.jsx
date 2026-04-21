import React from 'react';
import { FiWind, FiPhone, FiMail, FiMapPin, FiGlobe, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const SkillFlow = ({ userData }) => {
  const { displayName, email, role, phone, website, address } = userData || {};
  return (
    <div className="min-h-screen bg-[#fafafc] flex items-start justify-center py-8 px-6 font-['Mulish'] text-slate-800">
      <div className="w-full max-w-sm bg-white border border-[#f1f1f5] rounded-[2.5rem] p-10 shadow-[0_40px_80px_-20px_rgba(200,200,230,0.3)] flex flex-col items-center group overflow-hidden">
        
        <div className="w-20 h-20 rounded-[2rem] bg-indigo-50 text-indigo-400 flex items-center justify-center mb-10 transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-12">
           {userData?.logo ? (
             <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
           ) : (
             <FiWind size={32} />
           )}
        </div>
        
        <h1 className="text-2xl font-black text-slate-800 tracking-tight text-center italic leading-none truncate w-full">{displayName || 'Skill Flow'}</h1>
        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3 mb-12">{role || 'Creative Solutionist'}</p>
        
        <div className="w-full space-y-3 relative z-10 text-left mb-10">
           <StandardContactLink icon={FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiMapPin} value={address} />

           {/* Dynamic Social Uplinks */}
           <StandardContactLink icon={FiLinkedin} value={userData?.linkedin} href={userData?.linkedin} />
           <StandardContactLink icon={FiInstagram} value={userData?.instagram} href={userData?.instagram} />
        </div>
        
        <div className="w-full flex flex-col gap-3 mb-10">
           <button className="w-full flex items-center justify-center py-5 rounded-[1.5rem] bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.4em] hover:brightness-125 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
              Flow Registry Access
           </button>
        </div>

        <StandardMapPreview address={address} />

        <StandardSaveContactButton />
        
        <footer className="mt-12 opacity-30 flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[7px] font-black tracking-[0.8em] text-slate-400 uppercase hover:text-slate-900 transition-colors">Powered by Cardyn</a>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        </footer>
      </div>
    </div>
  );
};
export default SkillFlow;
