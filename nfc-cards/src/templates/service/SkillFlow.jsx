import React from "react";
import {
  FiWind,
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiCheckCircle,
  FiClock,
  FiShield,
  FiDownload,
  FiArrowRight,
  FiStar,
  FiZap,
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const SkillFlow = ({ userData }) => {
  const {
    displayName = "Skill Flow",
    email = "hello@skillflow.com",
    phone = "+91 99999 99999",
    website = "https://www.skillflow.com",
    address = "Ahmedabad, Gujarat",
    linkedin,
    instagram,
    facebook,
    twitter,
    youtube,
    logo,
    role = "Service Architect",
    experience = "10+ Years Experience",
    timing = "Open • 9 AM to 9 PM",
  } = userData || {};

  const services = [
    "Premium Consulting",
    "Digital Services",
    "Technical Setup",
    "Support System",
  ];

  const features = [
    {
      icon: <FiShield />,
      title: "Trusted Service",
      text: "Reliable solutions with expert handling.",
    },
    {
      icon: <FiZap />,
      title: "Fast Response",
      text: "Quick communication & instant support.",
    },
    {
      icon: <FiCheckCircle />,
      title: "Quality Work",
      text: "Professional standards in every project.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafc] md:bg-neutral-950 flex justify-center font-['Mulish',sans-serif]">
      <div className="w-full max-w-sm min-h-screen bg-white shadow-[0_40px_80px_-20px_rgba(200,200,230,0.3)] overflow-hidden">

        {/* TOP HERO */}
        <div className="relative h-48 bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
          <img
            src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80"
            alt="Service Department"
            className="w-full h-full object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-white/30"></div>

          <div className="absolute -bottom-10 left-0 right-0 flex justify-center">
            <div className="w-24 h-24 rounded-[2rem] bg-indigo-50 text-indigo-500 flex items-center justify-center shadow-xl overflow-hidden p-1 hover:scale-105 duration-500">
              {logo ? (
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-cover rounded-[1.7rem]"
                />
              ) : (
                <FiWind size={34} />
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-14 pb-8 px-4">

          <div className="text-center">
            <h1 className="text-2xl font-black text-slate-800 italic tracking-tight">
              {displayName}
            </h1>

            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.35em] mt-2">
              {role}
            </p>
          </div>

          {/* QUICK INFO */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-indigo-50 rounded-2xl p-4 text-center">
              <FiClock className="mx-auto text-indigo-500 mb-2" />
              <p className="text-[11px] font-bold text-slate-700">{timing}</p>
            </div>

            <div className="bg-indigo-50 rounded-2xl p-4 text-center">
              <FiShield className="mx-auto text-indigo-500 mb-2" />
              <p className="text-[11px] font-bold text-slate-700">{experience}</p>
            </div>
          </div>

          {/* CONTACT SECTION */}
          <div className="space-y-2 mt-6">

            <a href={`tel:${phone}`} className="flex items-center gap-3 bg-[#fafafc] rounded-2xl px-4 py-4 hover:bg-indigo-50 transition-all">
              <FiPhone className="text-indigo-500" />
              <span className="text-sm text-slate-700">{phone}</span>
            </a>

            <a href={`mailto:${email}`} className="flex items-center gap-3 bg-[#fafafc] rounded-2xl px-4 py-4 hover:bg-indigo-50 transition-all">
              <FiMail className="text-indigo-500" />
              <span className="text-sm text-slate-700 truncate">{email}</span>
            </a>

            <a href={website} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#fafafc] rounded-2xl px-4 py-4 hover:bg-indigo-50 transition-all">
              <FiGlobe className="text-indigo-500" />
              <span className="text-sm text-slate-700 truncate">{website}</span>
            </a>

            <div className="flex items-center gap-3 bg-[#fafafc] rounded-2xl px-4 py-4">
              <FiMapPin className="text-indigo-500" />
              <span className="text-sm text-slate-700">{address}</span>
            </div>

          </div>

          {/* SERVICES */}
          <div className="mt-7">
            <h3 className="text-slate-800 font-black text-sm uppercase tracking-widest mb-3">
              Services
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {services.map((item, index) => (
                <div key={index} className="bg-indigo-50 rounded-2xl p-4 text-center hover:-translate-y-1 transition-all">
                  <FiCheckCircle className="mx-auto mb-2 text-indigo-500" />
                  <p className="text-[11px] font-bold text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* INFORMATION */}
          <div className="mt-7">
            <h3 className="text-slate-800 font-black text-sm uppercase tracking-widest mb-3">
              Why Choose Us
            </h3>

            <div className="space-y-3">
              {features.map((item, index) => (
                <div key={index} className="bg-[#fafafc] rounded-3xl p-4 flex gap-4 items-start hover:bg-indigo-50 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-500 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-800">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-5">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="space-y-3 mt-8">

            <a href={website} target="_blank" rel="noreferrer" className="w-full bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-[11px] uppercase tracking-[0.25em]">
              Visit Website
              <FiArrowRight />
            </a>

            <button
              onClick={() => downloadVCard(userData)}
              className="w-full bg-indigo-50 text-slate-800 py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-[11px] uppercase tracking-[0.25em]"
            >
              <FiDownload />
              Save Contact
            </button>

          </div>

          <div className="mt-8">
            <PoweredBy />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SkillFlow;