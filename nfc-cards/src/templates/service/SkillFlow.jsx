import React from 'react';
import { FiWind, FiPhone, FiMail, FiMapPin, FiGlobe, FiLinkedin, FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const SkillFlow = ({ userData }) => {
  const { displayName, email, phone, website, address, linkedin, instagram, facebook, twitter, youtube, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-[#fafafc] flex items-start justify-center py-8 px-6 font-['Mulish',sans-serif] text-slate-800">
      <div className="w-full max-w-sm bg-white border border-[#f1f1f5] rounded-[2.5rem] p-10 shadow-[0_40px_80px_-20px_rgba(200,200,230,0.3)] flex flex-col items-center group overflow-hidden">
        
        <div className="w-24 h-24 rounded-[2rem] bg-indigo-50 text-indigo-400 flex items-center justify-center mb-8 transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-105 shadow-sm overflow-hidden p-1">
           {logo ? (
             <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-[28px] bg-white" />
           ) : (
             <FiWind size={36} />
           )}
        </div>
        
        <h1 className="text-2xl font-black text-slate-800 tracking-tight text-center italic leading-none truncate w-full mb-2">{displayName || 'Skill Flow'}</h1>
        <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.3em] mb-8 text-center">Service Architect</p>
        
        <div className="w-full space-y-3 relative z-10 text-left mb-8">
           <StandardContactLink icon={FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiMapPin} value={address} />

           {/* Dynamic Social Uplinks */}
           <StandardContactLink icon={FiInstagram} value={instagram} href={instagram} />
           <StandardContactLink icon={FiLinkedin} value={linkedin} href={linkedin} />
           <StandardContactLink icon={FiTwitter} value={twitter} href={twitter} />
           <StandardContactLink icon={FiFacebook} value={facebook} href={facebook} />
           <StandardContactLink icon={FiYoutube} value={youtube} href={youtube} />
        </div>
        
        {website && (
            <div className="w-full flex flex-col gap-3 mb-8 relative z-10">
               <a href={website} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-5 rounded-[1.5rem] bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:brightness-125 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                  Flow Registry Access
               </a>
            </div>
        )}

        <div className="mt-4 relative z-10 w-full">
            <StandardMapPreview address={address} />
        </div>

        <div className="mt-6 relative z-10 w-full">
            <StandardSaveContactButton userData={userData} />
        </div>
        
        <footer className="mt-12 opacity-30 flex items-center gap-3 hover:opacity-100 transition-opacity">
           <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[7px] font-black tracking-[0.8em] text-slate-500 uppercase">Powered by Cardyn</a>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        </footer>
      </div>
    </div>
  );
};
export default SkillFlow;
