import React from 'react';
import { FiPhone, FiMail, FiGlobe, FiMapPin, FiLinkedin, FiTwitter } from 'react-icons/fi';

const ExecutiveMinimal = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, companyName, city, country } = userData || {};
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm">
        <div className="h-2 bg-black rounded-t-3xl" />
        <div className="bg-white border border-gray-100 rounded-b-3xl p-8 shadow-xl">
          <div className="mb-8">
            <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center text-white text-3xl font-black mb-6">
              {displayName?.charAt(0) || 'E'}
            </div>
            <h1 className="text-2xl font-black text-black tracking-tight capitalize">{displayName || 'Executive Name'}</h1>
            <p className="text-sm font-bold text-gray-400 mt-1">{role || 'Business Executive'}</p>
            <p className="text-xs font-bold text-gray-300 mt-0.5">{companyName || 'Company Name'}</p>
          </div>
          <div className="space-y-3">
            {mobileNumber && <a href={`tel:${mobileNumber}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all"><FiPhone size={16} className="text-black" /><span className="text-sm font-bold text-gray-700">{mobileNumber}</span></a>}
            {email && <a href={`mailto:${email}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all"><FiMail size={16} className="text-black" /><span className="text-sm font-bold text-gray-700 truncate">{email}</span></a>}
            {website && <a href={website} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all"><FiGlobe size={16} className="text-black" /><span className="text-sm font-bold text-gray-700">{website}</span></a>}
            {(city || country) && <div className="flex items-center gap-3 p-3 rounded-xl"><FiMapPin size={16} className="text-black" /><span className="text-sm font-bold text-gray-700">{[city, country].filter(Boolean).join(', ')}</span></div>}
          </div>
          <button className="w-full mt-8 py-4 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-gray-900 transition-all">Save Contact</button>
          <p className="text-center text-[8px] text-gray-200 font-black tracking-widest mt-6 uppercase">Powered by Firevy NFC</p>
        </div>
      </div>
    </div>
  );
};
export default ExecutiveMinimal;
