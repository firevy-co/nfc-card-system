import React, { useState } from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const LuxeHotel = ({ userData }) => {
  const {
    displayName,
    email,
    phone,
    website,
    address,
    logo,
    linkedin,
    instagram,
    facebook,
    twitter,
    coverImage,
    gallery,
    bio,
  } = userData || {};

  const [copied, setCopied] = useState(false);

  const primary = "#0f172a";
  const accent = "#0ea5e9";

  const heroImage =
    coverImage ||
    "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg";

  const profileLogo =
    logo ||
    "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg";

  const images = gallery || [
    "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg",
    "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg",
    "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg",
    "https://images.pexels.com/photos/6129683/pexels-photo-6129683.jpeg",
  ];

  const services = [
    "Cardiology",
    "Orthopedic",
    "Pediatrics",
    "Emergency Care",
    "Radiology",
    "General Surgery",
  ];

  const facilities = [
    "24/7 Ambulance",
    "ICU Available",
    "Pharmacy",
    "Modern Labs",
    "Cashless Insurance",
    "Advanced Equipment",
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(website || "https://yourhospital.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-['Mulish',sans-serif] flex justify-center">
      <div className="w-full max-w-sm bg-slate-900 text-white shadow-2xl overflow-hidden">

        {/* HERO */}
        <div className="relative h-72">
          <img src={heroImage} alt="Hospital" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-0 left-0 w-full px-6 pb-5">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-full bg-white p-1 shadow-xl">
                <img src={profileLogo} alt="Logo" className="w-full h-full rounded-full object-cover" />
              </div>

              <div>
                <h1 className="text-2xl font-black uppercase leading-none">
                  {displayName || "CityCare Hospital"}
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] mt-2" style={{ color: accent }}>
                  Advanced Healthcare
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* EMERGENCY */}
        {phone && (
          <div className="bg-red-600 text-center py-3 text-sm font-bold animate-pulse">
            🚨 Emergency Call: {phone}
          </div>
        )}

        {/* ABOUT */}
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-sm text-slate-300 text-center">
            {bio || "Providing advanced medical care with expert doctors and modern facilities."}
          </p>
        </div>

        {/* SERVICES */}
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-center text-xs font-bold mb-4 uppercase tracking-widest" style={{ color: accent }}>
            Services
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {services.map((item, i) => (
              <div key={i} className="border border-white/10 py-2 text-center rounded-xl text-xs hover:bg-white/10 transition">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* FACILITIES */}
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-center text-xs font-bold mb-4 uppercase tracking-widest" style={{ color: accent }}>
            Facilities
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {facilities.map((item, i) => (
              <div key={i} className="border border-white/10 py-2 text-center rounded-xl text-xs hover:bg-white/10 transition">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* OPD TIMING */}
        <div className="px-6 py-5 border-b border-white/10 text-center text-sm">
          <p className="font-bold mb-1" style={{ color: accent }}>OPD Timings</p>
          <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
          <p>Sunday: Emergency Only</p>
        </div>

        {/* CONTACT */}
        <div className="px-6 py-4 space-y-1">
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" className="flex gap-3 py-3 border-b border-white/10">
              <FiIcons.FiGlobe size={18} />
              <span className="text-sm">{website}</span>
            </a>
          )}

          {email && (
            <a href={`mailto:${email}`} className="flex gap-3 py-3 border-b border-white/10">
              <FiIcons.FiMail size={18} />
              <span className="text-sm">{email}</span>
            </a>
          )}

          {phone && (
            <a href={`tel:${phone}`} className="flex gap-3 py-3 border-b border-white/10">
              <FiIcons.FiPhone size={18} />
              <span className="text-sm">{phone}</span>
            </a>
          )}

          {address && (
            <div className="flex gap-3 py-3 border-b border-white/10">
              <FiIcons.FiMapPin size={18} />
              <span className="text-sm">{address}</span>
            </div>
          )}
        </div>

        {/* GALLERY */}
        <div className="px-6 py-5">
          <h2 className="text-center text-xs font-bold mb-4 uppercase tracking-widest" style={{ color: accent }}>
            Hospital Gallery
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {images.map((img, i) => (
              <div key={i} className="h-28 rounded-xl overflow-hidden">
                <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-110 duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* SOCIAL */}
        <div className="flex justify-center gap-5 py-4 border-t border-b border-white/10">
          {linkedin && <a href={linkedin}><FiIcons.FiLinkedin /></a>}
          {instagram && <a href={instagram}><FiIcons.FiInstagram /></a>}
          {facebook && <a href={facebook}><FiIcons.FiFacebook /></a>}
          {twitter && <a href={twitter}><FiIcons.FiTwitter /></a>}
        </div>

        {/* ACTION BUTTONS */}
        <div className="p-6 space-y-3">

          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition"
              style={{ backgroundColor: accent, color: primary }}
            >
              Book Appointment
            </a>
          )}

          {address && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center py-4 border border-white/15 rounded-2xl text-xs uppercase hover:bg-white/10 transition"
            >
              View On Map
            </a>
          )}

          <button
            onClick={copyLink}
            className="w-full flex justify-center items-center gap-2 py-4 border border-white/15 rounded-2xl text-xs uppercase hover:bg-white/10 transition"
          >
            {copied ? <FiIcons.FiCheck /> : <FiIcons.FiCopy />}
            Copy Website
          </button>

          <button
            onClick={() => downloadVCard(userData)}
            className="w-full flex justify-center items-center gap-2 py-4 border border-white/15 rounded-2xl text-xs uppercase hover:bg-white/10 transition"
          >
            <FiIcons.FiDownload />
            Save Contact
          </button>
        </div>

        <div className="pb-6 px-6">
          <PoweredBy />
        </div>

      </div>
    </div>
  );
};

export default LuxeHotel;