import React from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from '../common/StandardComponents';

const GoldenGrace = ({ userData }) => {
  const {
    displayName,
    email,
    // role,
    phone,
    website,
    address,
    logo,
    avatar,
    coverPhoto,
  } = userData || {};

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Mulish'] flex justify-center">
      <div className="w-full max-w-sm min-h-screen bg-[#050505] overflow-hidden">

        {/* Top Navbar */}
        {/* <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
          <FiIcons.FiMenu className="text-[#d4af37] text-2xl" />

          <h1 className="text-[#d4af37] text-[18px] tracking-[0.35em] uppercase font-semibold">
            Jewellery
          </h1>

          <div className="w-11 h-11 rounded-full border border-[#d4af37] p-1 overflow-hidden">
            {logo ? (
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center text-[#d4af37] text-sm font-bold">
                G
              </div>
            )}
          </div>
        </div> */}

        {/* Hero Section */}
        <div className="relative h-72 flex items-center justify-center bg-[#050505] overflow-hidden">
          {/* Background Image */}
          <img 
             src={coverPhoto || "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80"}
             alt="Cover"
             className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />

          {/* Radial Effect Overlay */}
          <div className="absolute w-[420px] h-[420px] rounded-full border border-white/5 bg-[radial-gradient(circle,rgba(34,34,34,0.4)_0%,rgba(11,11,11,0.8)_60%,#050505_100%)] pointer-events-none" />

          {/* Center Profile/Jewelry Image */}
          <div className="absolute w-36 h-36 rounded-full bg-[#0a0a0a] border border-[#d4af37]/40 shadow-[0_0_35px_rgba(212,175,55,0.2)] overflow-hidden flex items-center justify-center p-1.5 z-10">
             {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
             ) : logo ? (
                <img src={logo} alt="Logo" className="w-full h-full object-contain rounded-full" />
             ) : (
                <img 
                   src="https://images.unsplash.com/photo-1599643478514-4a734800e238?auto=format&fit=crop&w=800&q=80" 
                   alt="Jewelry" 
                   className="w-full h-full object-cover rounded-full" 
                />
             )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-10">

          {/* Role */}
          <p className="text-[#d4af37] text-[11px] uppercase tracking-[0.35em] font-bold">
            Premium Jeweller
          </p>

          {/* Name */}
          <h2 className="text-[42px] leading-none mt-2 font-serif text-white">
            {displayName || "Golden Grace"}
          </h2>

          {/* Subtitle */}
          {/* <p className="text-white/75 text-lg leading-relaxed mt-3">
            {role ||
              "Curating timeless jewellery stories through precision craftsmanship and luxury elegance."}
          </p> */}

          {/* Contact Cards */}
          <div className="mt-10 space-y-0">

            {email && (
              <div className="py-5 border-b border-[#3a2e13] flex items-center justify-between">
                <div>
                  <p className="text-white/50 uppercase tracking-[0.25em] text-xs">
                    Electronic Mail
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="text-[22px] font-serif mt-2 block"
                  >
                    {email}
                  </a>
                </div>
                <FiIcons.FiMail className="text-[#d4af37] text-xl" />
              </div>
            )}

            {phone && (
              <div className="py-5 border-b border-[#3a2e13] flex items-center justify-between">
                <div>
                  <p className="text-white/50 uppercase tracking-[0.25em] text-xs">
                    Direct Connection
                  </p>
                  <a
                    href={`tel:${phone}`}
                    className="text-[22px] font-serif mt-2 block"
                  >
                    {phone}
                  </a>
                </div>
                <FiIcons.FiPhone className="text-[#d4af37] text-xl" />
              </div>
            )}

            {address && (
              <div className="py-5 border-b border-[#3a2e13] flex items-center justify-between">
                <div>
                  <p className="text-white/50 uppercase tracking-[0.25em] text-xs">
                    Studio Location
                  </p>
                  <p className="text-[22px] font-serif mt-2">
                    {address}
                  </p>
                </div>
                <FiIcons.FiMapPin className="text-[#d4af37] text-xl" />
              </div>
            )}

          </div>

          {/* CTA Buttons */}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 h-16 bg-[#d4af37] text-black uppercase tracking-[0.3em] text-sm font-semibold flex items-center justify-center gap-3"
            >
              View Collection
              <FiIcons.FiArrowRight />
            </a>
          )}

          <div className="mt-4">
            <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>
          </div>

          {/* Social Actions */}
          <div className="flex justify-center gap-10 mt-10 text-2xl text-[#d6ccb8]">
            <FiIcons.FiVolume2 />
            <FiIcons.FiShare2 />
            <FiIcons.FiGlobe />
          </div>

          {/* Map */}
          {address && (
            <div className="mt-10">
              {address && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>)}
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-white/5 text-center">
            <p className="text-[#d4af37] text-[10px] tracking-[0.35em] uppercase">
              Crafted With Trust
            </p>

            <a
              href="https://cardyn.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-white/40 text-xs"
            >
              Powered by Cardyn
            </a>
          </div>

        </div>

        {/* Bottom Navigation */}
        {/* <div className="sticky bottom-0 bg-[#050505] border-t border-white/5 h-20 flex items-center justify-around px-4">
          <div className="flex flex-col items-center text-[#d4af37] text-xs gap-1">
            <FiIcons.FiUser className="text-xl" />
            Identity
          </div>

          <div className="flex flex-col items-center text-white/50 text-xs gap-1">
            <FiIcons.FiGrid className="text-xl" />
            Portfolio
          </div>

          <div className="flex flex-col items-center text-white/50 text-xs gap-1">
            <FiIcons.FiBookOpen className="text-xl" />
            Connect
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default GoldenGrace;