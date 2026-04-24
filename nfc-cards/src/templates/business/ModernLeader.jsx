import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

/**
 * MODERN LEADER IDENTITY ARCHITECTURE
 * A high-fidelity executive layout with deep slate tones and artisanal award accents.
 * Optimized for leadership and corporate directors.
 */
const ModernLeader = ({ userData }) => {
  const { displayName, email, role, phone, website, address, bio } = userData || {};

  // Social Matrix Helper (Excludes Website as it is manifested as a Primary Action Button)
  const socialNodes = [
    { id: 'linkedin', icon: FiIcons.FiLinkedin, label: 'LinkedIn' },
    { id: 'instagram', icon: FiIcons.FiInstagram, label: 'Instagram' },
    { id: 'facebook', icon: FiIcons.FiFacebook, label: 'Facebook' },
    { id: 'twitter', icon: FiIcons.FiTwitter, label: 'Twitter' },
    { id: 'youtube', icon: FiIcons.FiYoutube, label: 'YouTube' },
    { id: 'github', icon: FiIcons.FiGithub, label: 'GitHub' },
  ].filter(node => userData?.[node.id]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center py-16 px-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-[3rem] p-1 shadow-2xl overflow-hidden group">

        {/* EXECUTIVE HEADER BLOCK */}
        <div className="bg-slate-900 p-8 rounded-[2.8rem] text-center text-white relative">
          <div className="absolute top-4 right-8">
            <FiIcons.FiAward size={20} className="text-slate-700 animate-pulse" />
          </div>

          {/* BRAND IDENTITY NODE */}
          <div className="w-24 h-24 rounded-2xl border-2 border-slate-700 mx-auto mb-6 flex items-center justify-center text-4xl font-black bg-slate-800 overflow-hidden shadow-inner">
            {userData?.logo ? (
              <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
            ) : (
              displayName?.charAt(0) || 'I'
            )}
          </div>

          <h1 className="text-2xl font-black tracking-tight leading-none uppercase">
            {displayName || 'Director Identity'}
          </h1>
        </div>

        {/* INTERACTION SUITE */}
        <div className="p-8 space-y-6">

          {/* BIO / VISION BLOCK */}
          {bio && (
            <div className="text-center px-4">
              <p className="text-[11px] text-slate-400 font-bold leading-relaxed italic">
                "{bio}"
              </p>
            </div>
          )}

          {/* SOCIAL MEDIA MATRIX (ICON ROW) */}
          {socialNodes.length > 0 && (
            <div className="flex items-center justify-center gap-4 py-2 border-y border-slate-50">
              {socialNodes.map(node => (
                <a
                  key={node.id}
                  href={userData[node.id].startsWith('http') ? userData[node.id] : `https://${node.id}.com/${userData[node.id]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white hover:scale-110 transition-all shadow-sm"
                  title={node.label}
                >
                  <node.icon size={20} />
                </a>
              ))}
            </div>
          )}

          {/* CONTACT INFRASTRUCTURE (LIST) */}
          <div className="space-y-3">
            {email && <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />}
            {phone && <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />}
            {address && <StandardContactLink icon={FiIcons.FiMapPin} value={address} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} />}
          </div>

          {/* MAP PROTOCOL */}
          {address && <StandardMapPreview address={address} />}

          {/* PRIMARY COMMAND: WEBSITE BUTTON (Ghost Pill Style) */}
          {website && (
            <div className="pt-2 px-2">
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-transparent border border-slate-200 text-slate-900 py-4 rounded-full font-black text-xs tracking-tight hover:bg-slate-900 hover:text-white transition-all active:scale-95 shadow-sm"
              >
                Visit Website
              </a>
            </div>
          )}

          {/* SAVE CONTACT PROTOCOL */}
          <div className="pt-2">
            <StandardSaveContactButton userData={userData} />
          </div>

          {/* BRANDING FOOTER */}
          <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] text-center text-slate-300 font-black tracking-[0.5em] pt-8 hover:opacity-70 transition-opacity uppercase">
            Powered by Cardyn Identity Network
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModernLeader;
