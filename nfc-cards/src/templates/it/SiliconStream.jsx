import React, { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiGlobe,
  FiUser,
  FiDownload,
  FiChevronDown,
  FiCheckCircle,
  FiArrowUpRight,
  FiLayers,
  FiStar,
  FiShield,
  FiZap,
  FiMapPin
} from "react-icons/fi";

import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const SiliconStream = ({ userData = {} }) => {
  const [openInfo, setOpenInfo] = useState(false);

  const {
    displayName = "Silicon Architect",
    role = "Technology Consultant",
    email = "build@silicon.io",
    mobileNumber = "+91 99999 99999",
    website = "https://example.com",
    address = "Ahmedabad, Gujarat, India",
    bio = "Helping startups and modern businesses build premium websites, apps and scalable digital systems.",
    logo,
    banner,
    profileImage
  } = userData;

  /* NEW DIFFERENT IMAGES */
  const heroImage =
    banner ||
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop";

  const showcaseImage =
    userData.showcase ||
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1400&auto=format&fit=crop";

  const locationImage =
    userData.locationImage ||
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop";

  const services = [
    { icon: FiLayers, title: "Web Solutions" },
    { icon: FiShield, title: "Cyber Security" },
    { icon: FiZap, title: "Automation" },
    { icon: FiStar, title: "Brand Growth" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 px-4 py-10 flex justify-center font-['Inter'] relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400/20 blur-[140px] rounded-full"></div>

      <div className="w-full max-w-sm rounded-[34px] overflow-hidden bg-white border border-slate-200 shadow-[0_30px_80px_rgba(0,0,0,0.08)] relative z-10">

        {/* HERO */}
        <div className="relative h-56">
          <img src={heroImage} className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>

          <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/90 text-[10px] uppercase tracking-[0.35em] font-bold text-blue-700 shadow-md">
            Silicon Stream
          </div>

          {/* PROFILE */}
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-[28px] bg-white p-2 shadow-xl border border-slate-200">
            <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-100 flex items-center justify-center">
              {logo || profileImage ? (
                <img
                  src={logo || profileImage}
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <FiUser size={34} className="text-blue-600" />
              )}
            </div>
          </div>
        </div>

        {/* PROFILE INFO */}
        <div className="pt-16 px-5 text-center">
          <h1 className="text-3xl font-black text-slate-900">
            {displayName}
          </h1>

          <p className="text-blue-600 text-xs uppercase tracking-[0.35em] mt-2 font-bold">
            {role}
          </p>

          <p className="text-slate-500 text-sm leading-6 mt-4">
            {bio}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-700 font-bold">
              Available Now
            </span>
          </div>
        </div>

        {/* STATS */}
        <div className="px-5 mt-6 grid grid-cols-3 gap-3">
          {[
            ["220+", "Projects"],
            ["24/7", "Support"],
            ["8Y", "Experience"]
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 bg-slate-50 border border-slate-200 text-center"
            >
              <div className="text-blue-600 text-xl font-black">
                {item[0]}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">
                {item[1]}
              </div>
            </div>
          ))}
        </div>

        {/* CONTACT */}
        <div className="px-5 mt-6 space-y-3">

          <a href={`tel:${mobileNumber}`} className="cardItem">
            <FiPhone className="text-blue-600" />
            <span>{mobileNumber}</span>
            <FiArrowUpRight className="ml-auto text-slate-400" />
          </a>

          <a href={`mailto:${email}`} className="cardItem">
            <FiMail className="text-blue-600" />
            <span className="truncate">{email}</span>
            <FiArrowUpRight className="ml-auto text-slate-400" />
          </a>

          <a href={website} target="_blank" rel="noreferrer" className="cardItem">
            <FiGlobe className="text-blue-600" />
            <span>Visit Website</span>
            <FiArrowUpRight className="ml-auto text-slate-400" />
          </a>
        </div>

        {/* SERVICES */}
        <div className="px-5 mt-6">
          <h3 className="sectionTitle">Capabilities</h3>

          <div className="grid grid-cols-2 gap-3">
            {services.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="featureBox">
                  <Icon className="text-blue-600 mb-2 mx-auto" />
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>

        {/* NEW SHOWCASE IMAGE */}
        <div className="px-5 mt-6">
          <div className="rounded-3xl overflow-hidden h-40 border border-slate-200 relative">
            <img src={showcaseImage} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

            <div className="absolute bottom-4 left-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-blue-200 font-bold">
                Workspace
              </div>
              <div className="text-white font-semibold mt-1">
                Smart Development Studio
              </div>
            </div>
          </div>
        </div>

        {/* NEW LOCATION IMAGE */}
        <div className="px-5 mt-6">
          <div className="rounded-3xl overflow-hidden h-40 border border-slate-200 relative">
            <img src={locationImage} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-2 text-blue-200 text-[10px] uppercase tracking-[0.3em] font-bold">
                <FiMapPin />
                Location
              </div>
              <div className="text-white font-semibold mt-1">
                {address}
              </div>
            </div>
          </div>
        </div>

        {/* TOGGLE */}
        <div className="px-5 mt-6">
          <div className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden">
            <button
              onClick={() => setOpenInfo(!openInfo)}
              className="w-full px-5 py-4 flex items-center justify-between"
            >
              <span className="font-bold text-slate-900">
                Why Choose Us
              </span>

              <FiChevronDown
                className={`transition-all ${openInfo
                    ? "rotate-180 text-blue-600"
                    : "text-slate-400"
                  }`}
              />
            </button>

            {openInfo && (
              <div className="px-5 pb-5 text-sm text-slate-500 leading-6">
                We deliver websites, apps, cybersecurity systems,
                automation tools and scalable business solutions
                with premium quality design.
              </div>
            )}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="px-5 mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => downloadVCard(userData)}
            className="h-12 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <FiDownload />
            Save
          </button>

          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="h-12 rounded-2xl border border-blue-600 text-blue-600 font-bold flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
          >
            Launch
          </a>
        </div>

        {/* TRUST */}
        <div className="px-5 mt-6">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 text-center">
            <FiCheckCircle className="mx-auto mb-2" size={20} />
            <div className="font-bold">Trusted by 200+ Clients</div>
            <div className="text-xs text-white/80 mt-1">
              Scalable solutions with creative excellence.
            </div>
          </div>
        </div>

        <div className="px-5 py-6">
          <PoweredBy />
        </div>
      </div>

      <style>{`
        .cardItem {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: 18px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #0f172a;
          font-size: 14px;
          transition: 0.3s ease;
        }

        .cardItem:hover {
          background: #eff6ff;
          transform: translateY(-2px);
        }

        .sectionTitle {
          text-align: center;
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #2563eb;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .featureBox {
          padding: 14px;
          border-radius: 18px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          text-align: center;
          color: #0f172a;
          font-weight: 700;
          font-size: 13px;
        }

        .featureBox:hover {
          background: #eff6ff;
        }
      `}</style>
    </div>
  );
};

export default SiliconStream;