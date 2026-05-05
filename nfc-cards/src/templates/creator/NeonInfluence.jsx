import React from "react";
import {
  FiPhone,
  FiMail,
  FiGlobe,
  FiYoutube,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiMapPin,
  FiUserPlus
} from "react-icons/fi";

import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

/* ===========================
   BANNER IMAGE
=========================== */
const bannerImg =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";

/* ===========================
   ICON CONTACT CARD
=========================== */
const IconLink = ({ icon: Icon, value, href }) => {
  if (!value) return null;
  const Comp = href ? "a" : "div";

  return (
    <Comp
      href={href || undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-4 py-4 mb-3 hover:shadow-md hover:border-blue-400 transition group"
    >
      <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-blue-100 transition">
        <Icon className="text-gray-600 group-hover:text-blue-600" size={18} />
      </div>

      <span className="text-sm font-semibold text-gray-800 truncate max-w-[180px]">
        {value}
      </span>
    </Comp>
  );
};

/* ===========================
   SOCIAL ICON
=========================== */
const SocialIcon = ({ icon: Icon, href, color }) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-gray-400 hover:${color} transition transform hover:scale-125`}
    >
      <Icon size={22} />
    </a>
  );
};

/* ===========================
   SERVICE CARD
=========================== */
const ServiceCard = ({ title, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      <Icon className="text-blue-500 mb-2" size={20} />
      <span className="text-xs font-semibold text-gray-700 text-center">
        {title}
      </span>
    </div>
  );
};

/* ===========================
   GALLERY
=========================== */
const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {images.map((img, i) => (
        <img
          key={i}
          src={`${img}?auto=format&fit=crop&w=400&q=80`}
          className="rounded-xl h-28 w-full object-cover hover:scale-105 transition"
          alt="gallery"
        />
      ))}
    </div>
  );
};

/* ===========================
   MAIN COMPONENT
=========================== */
const NeonInfluence = ({ userData }) => {
  const {
    displayName,
    email,
    phone,
    website,
    address,
    youtube,
    linkedin,
    twitter,
    instagram,
    logo
  } = userData || {};

  return (
    <div className="min-h-screen bg-gray-50 font-['Outfit',sans-serif]">

      {/* ===========================
         CARD
      =========================== */}
      <div className="w-full bg-white shadow-sm">

        {/* ===========================
           BANNER WITH WAVE
        =========================== */}
        <div className="relative w-full h-56 overflow-hidden">
          <img
            src={bannerImg}
            alt="banner"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px]">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block w-full h-[60px]"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.5,192.5,101.4c108.1-31.57,192.5-101.4,192.5-101.4Z"
                fill="#ffffff"
                className="opacity-40"
              />
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
                fill="#ffffff"
                className="opacity-40"
              />
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V120H0Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </div>

        {/* ===========================
           PROFILE
        =========================== */}
        <div className="flex flex-col items-center -mt-16 px-5">

          <div className="w-24 h-24 rounded-2xl relative z-10 overflow-hidden border-4 border-white shadow-lg bg-white">
            {logo ? (
              <img src={logo} alt="logo" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-blue-500 text-white text-xl">
                {displayName?.charAt(0) || "C"}
              </div>
            )}
          </div>

          <h1 className="text-xl font-bold text-gray-800 mt-3 text-center">
            {displayName || "Creator"}
          </h1>

          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Digital Creator
          </p>
        </div>

        {/* ===========================
           CONTACT
        =========================== */}
        <div className="px-5 mt-6">
          <IconLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
          <IconLink icon={FiMail} value={email} href={`mailto:${email}`} />
          <IconLink icon={FiGlobe} value={website} href={website} />
          <IconLink icon={FiMapPin} value={address} />
        </div>

        {/* ===========================
           SERVICES
        =========================== */}
        <div className="px-5 mt-6">
          <h2 className="text-sm font-bold text-gray-700 mb-3">Services</h2>

          <div className="grid grid-cols-3 gap-3">
            <ServiceCard icon={FiGlobe} title="Web Dev" />
            <ServiceCard icon={FiInstagram} title="Marketing" />
            <ServiceCard icon={FiYoutube} title="Content" />
          </div>
        </div>

        {/* ===========================
           GALLERY
        =========================== */}
        <div className="px-5 mt-6">
          <h2 className="text-sm font-bold text-gray-700 mb-3">Gallery</h2>
          <Gallery />
        </div>

        {/* ===========================
           BUTTON
        =========================== */}
        <div className="px-5 mt-6">
          <button
            onClick={() => downloadVCard(userData)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
          >
            <FiUserPlus />
            Save Contact
          </button>
        </div>

        {/* ===========================
           SOCIAL
        =========================== */}
        <div className="flex justify-center gap-6 mt-6 pb-6">
          <SocialIcon icon={FiInstagram} href={instagram} color="text-pink-500" />
          <SocialIcon icon={FiYoutube} href={youtube} color="text-red-500" />
          <SocialIcon icon={FiTwitter} href={twitter} color="text-blue-400" />
          <SocialIcon icon={FiLinkedin} href={linkedin} color="text-blue-600" />
        </div>

        <PoweredBy />
      </div>
    </div>
  );
};

export default NeonInfluence;