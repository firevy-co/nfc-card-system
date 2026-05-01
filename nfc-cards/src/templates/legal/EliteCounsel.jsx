import React from 'react';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiLinkedin,
  FiInstagram,
  FiDownload,
  FiArrowUpRight,
  FiShield,
  FiBookOpen,
  FiUsers,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const EliteCounsel = ({ userData }) => {
  const {
    displayName,
    email,
    role,
    phone,
    website,
    address,
    linkedin,
    instagram,
    logo,
    bio
  } = userData || {};

  const coverImage =
    "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="min-h-screen bg-slate-950 font-['Mulish']">
      <div className="w-full bg-white rounded-none overflow-hidden shadow-none">

        {/* Header */}
        <div className="relative h-56">
          <img
            src={coverImage}
            alt="Law Office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-md p-2 rounded-xl">
            <FiShield className="text-amber-400" size={22} />
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center overflow-hidden shrink-0">
              {logo ? (
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <span className="text-2xl font-black text-slate-900">
                  {displayName?.charAt(0) || "L"}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-black text-white truncate">
                {displayName || "Elite Counsel"}
              </h1>
              <p className="text-xs text-amber-300 font-bold uppercase tracking-widest truncate">
                {role || "Legal Consultant"}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">

          {bio && (
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                {bio}
              </p>
            </div>
          )}

          {/* Services */}
          <div className="pt-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
              Practice Areas
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-100 rounded-2xl p-4 text-center">
                <FiBookOpen className="mx-auto mb-2 text-slate-800" size={18} />
                <p className="text-[10px] font-bold uppercase">Corporate Law</p>
              </div>

              <div className="bg-slate-100 rounded-2xl p-4 text-center">
                <FiUsers className="mx-auto mb-2 text-slate-800" size={18} />
                <p className="text-[10px] font-bold uppercase">Family Law</p>
              </div>

              <div className="bg-slate-100 rounded-2xl p-4 text-center">
                <FiShield className="mx-auto mb-2 text-slate-800" size={18} />
                <p className="text-[10px] font-bold uppercase">Criminal Law</p>
              </div>

              <div className="bg-slate-100 rounded-2xl p-4 text-center">
                <FiCheckCircle className="mx-auto mb-2 text-slate-800" size={18} />
                <p className="text-[10px] font-bold uppercase">Civil Cases</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="pt-6 space-y-3">

            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-between bg-slate-900 text-white rounded-2xl px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <FiPhone size={18} />
                  <span className="text-sm font-semibold">{phone}</span>
                </div>
                <FiArrowUpRight />
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 bg-slate-100 rounded-2xl px-4 py-4"
              >
                <FiMail size={18} className="text-slate-700" />
                <span className="text-sm font-semibold truncate">{email}</span>
              </a>
            )}

            {website && (
              <a
                href={website.startsWith("http") ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-100 rounded-2xl px-4 py-4"
              >
                <FiGlobe size={18} className="text-slate-700" />
                <span className="text-sm font-semibold truncate">{website}</span>
              </a>
            )}

            {address && (
              <div className="flex items-center gap-3 bg-slate-100 rounded-2xl px-4 py-4">
                <FiMapPin size={18} className="text-slate-700" />
                <span className="text-sm font-semibold truncate">{address}</span>
              </div>
            )}
          </div>

          {/* Hours */}
          <div className="pt-6">
            <div className="bg-amber-50 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiClock className="text-amber-600" />
                <p className="text-sm font-bold text-amber-700">Office Hours</p>
              </div>
              <p className="text-xs text-slate-600">
                Monday - Saturday : 10:00 AM to 7:00 PM
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="pt-6 flex justify-center gap-3">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <FiLinkedin />
              </a>
            )}

            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <FiInstagram />
              </a>
            )}
          </div>

          {/* Buttons */}
          <div className="pt-6 space-y-3">
            <button className="w-full py-4 rounded-2xl bg-amber-500 text-slate-900 font-black uppercase tracking-widest text-xs">
              Schedule Consultation
            </button>

            <button
              onClick={() => downloadVCard(userData)}
              className="w-full py-4 rounded-2xl bg-slate-100 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2"
            >
              <FiDownload size={16} />
              Save Contact
            </button>
          </div>

          <div className="pt-6">
            <PoweredBy />
          </div>

        </div>
      </div>
    </div>
  );
};

export default EliteCounsel;