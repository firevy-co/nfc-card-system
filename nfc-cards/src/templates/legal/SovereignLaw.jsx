import React, { useState } from "react";
import * as FiIcons from "react-icons/fi";
import { FaWhatsapp, FaFacebook, FaTwitter, FaYoutube, FaTelegram, FaGithub, FaTiktok, FaDiscord, FaSkype } from "react-icons/fa";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const SovereignLaw = ({ userData }) => {
  const [darkMode, setDarkMode] = useState(true);

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
    bio,
    whatsapp,
    facebook,
    twitter,
    youtube,
    telegram,
    github,
    tiktok,
    discord,
    skype,
    companyName,
    businessName
  } = userData || {};

  const heroImage =
    "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1400&q=80";

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    address || "New York"
  )}&z=15&output=embed`;

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900"
        } font-['Mulish']`}
    >
      <div className="w-full max-w-sm mx-auto min-h-screen overflow-hidden">

        {/* HERO */}
        <div className="relative h-[390px] rounded-b-[3rem] overflow-hidden">
          <img
            src={heroImage}
            alt="Law Office"
            className="w-full h-full object-cover scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

          {/* Floating Effects */}
          <div className="absolute top-12 left-6 w-24 h-24 bg-cyan-400/20 blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-16 right-6 w-28 h-28 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />

          {/* Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-5 right-5 w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:scale-105 transition-all"
          >
            {darkMode ? <FiIcons.FiSun /> : <FiIcons.FiMoon />}
          </button>

          {/* Title */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-3xl bg-white shadow-xl flex items-center justify-center overflow-hidden shrink-0">
                {logo ? (
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <FiIcons.FiShield className="text-slate-900" size={26} />
                )}
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl font-black text-white truncate">
                  {displayName || "Sovereign Law"}
                </h1>
                <p className="text-xs text-cyan-300 font-bold uppercase tracking-widest truncate">
                  {role || "Trusted Legal Advisors"}
                </p>
                {(companyName || businessName) && (
                  <p className="text-[10px] text-white/50 font-medium uppercase tracking-wider truncate mt-0.5">
                    {companyName || businessName}
                  </p>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {bio ||
                "Elite legal counsel for business, property, civil, family and confidential legal matters."}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div
          className={`p-5 -mt-8 relative z-10 rounded-t-[2.5rem] ${darkMode ? "bg-slate-950" : "bg-white"
            }`}
        >

          {/* Services */}
          <div className="mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest opacity-60 mb-3">
              Legal Services
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["Corporate", FiIcons.FiBriefcase],
                ["Property", FiIcons.FiHome],
                ["Civil", FiIcons.FiCheckCircle],
                ["Family", FiIcons.FiUsers],
              ].map((item, i) => {
                const Icon = item[1];
                return (
                  <div
                    key={i}
                    className={`rounded-3xl p-4 text-center transition-all hover:scale-105 ${darkMode ? "bg-white/5" : "bg-slate-100"
                      }`}
                  >
                    <Icon className="mx-auto mb-2 text-cyan-400" size={18} />
                    <p className="text-[10px] font-bold uppercase">
                      {item[0]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3 mb-6">

            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-between bg-cyan-500 text-black rounded-3xl px-4 py-4 font-bold"
              >
                <div className="flex items-center gap-3">
                  <FiIcons.FiPhone />
                  <span>{phone}</span>
                </div>
                <FiIcons.FiArrowUpRight />
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className={`flex items-center gap-3 rounded-3xl px-4 py-4 ${darkMode ? "bg-white/5" : "bg-slate-100"
                  }`}
              >
                <FiIcons.FiMail />
                <span className="truncate">{email}</span>
              </a>
            )}

            {website && (
              <a
                href={website.startsWith("http") ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 rounded-3xl px-4 py-4 ${darkMode ? "bg-white/5" : "bg-slate-100"
                  }`}
              >
                <FiIcons.FiGlobe />
                <span className="truncate">{website}</span>
              </a>
            )}

            {whatsapp && (
              <a
                href={whatsapp.startsWith("http") ? whatsapp : `https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between border border-emerald-500/20 text-emerald-400 rounded-3xl px-4 py-4 font-bold ${darkMode ? "bg-white/5" : "bg-slate-100"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FaWhatsapp size={18} />
                  <span className="truncate">WhatsApp Chat</span>
                </div>
                <FiIcons.FiArrowUpRight />
              </a>
            )}
          </div>

          {/* Real Map Section */}
          {address && (
            <div className="mb-6">
              <h3 className="text-xs font-black uppercase tracking-widest opacity-60 mb-3">
                Office Location
              </h3>

              <div className="rounded-[2rem] overflow-hidden shadow-xl h-48 border border-slate-200/20">
                <iframe
                  title="Google Map"
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

              <div
                className={`mt-3 rounded-2xl px-4 py-3 text-sm ${
                  darkMode ? "bg-white/5" : "bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FiIcons.FiMapPin className="text-cyan-400" />
                  <span className="text-xs font-bold truncate">{address}</span>
                </div>
              </div>
            </div>
          )}

          {/* Social */}
          <div className="flex justify-center gap-3 mb-6">
            {[
              { val: linkedin, icon: FiIcons.FiLinkedin, color: "text-blue-500", url: linkedin },
              { val: instagram, icon: FiIcons.FiInstagram, color: "text-pink-500", url: instagram?.startsWith("http") ? instagram : `https://instagram.com/${instagram}` },
              { val: whatsapp, icon: FaWhatsapp, color: "text-emerald-400", url: whatsapp?.startsWith("http") ? whatsapp : `https://wa.me/${whatsapp?.replace(/\D/g, '')}` },
              { val: facebook, icon: FaFacebook, color: "text-blue-600", url: facebook?.startsWith("http") ? facebook : `https://facebook.com/${facebook}` },
              { val: twitter, icon: FaTwitter, color: "text-sky-400", url: twitter?.startsWith("http") ? twitter : `https://twitter.com/${twitter}` },
              { val: youtube, icon: FaYoutube, color: "text-red-500", url: youtube?.startsWith("http") ? youtube : `https://youtube.com/${youtube}` },
              { val: telegram, icon: FaTelegram, color: "text-cyan-400", url: telegram?.startsWith("http") ? telegram : `https://t.me/${telegram}` },
              { val: github, icon: FaGithub, color: "text-white", url: github?.startsWith("http") ? github : `https://github.com/${github}` },
              { val: tiktok, icon: FaTiktok, color: "text-pink-400", url: tiktok?.startsWith("http") ? tiktok : `https://tiktok.com/@${tiktok}` },
              { val: discord, icon: FaDiscord, color: "text-indigo-400", url: discord?.startsWith("http") ? discord : `https://discord.gg/${discord}` },
              { val: skype, icon: FaSkype, color: "text-sky-500", url: skype?.startsWith("http") ? skype : `skype:${skype}?chat` }
            ].map((social, i) => social.val && (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 ${social.color} ${darkMode ? "bg-white/5" : "bg-slate-100"}`}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button className="w-full py-4 rounded-3xl bg-white text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all">
              Book Consultation
            </button>

            <button
              onClick={() => downloadVCard(userData)}
              className={`w-full py-4 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 ${darkMode
                ? "bg-white/5 hover:bg-white/10"
                : "bg-slate-100 hover:bg-slate-200"
                }`}
            >
              <FiIcons.FiDownload size={16} />
              Save Contact
            </button>
          </div>

          <div className="mt-6">
            <PoweredBy />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SovereignLaw;