import React from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const OpalMinimal = ({ userData }) => {
  const {
    displayName = "AURELIUS JEWELS",
    email = "hello@aureliusjewels.com",
    role = "Luxury Jewellery House",
    phone = "+91 98765 43210",
    website = "aureliusjewels.com",
    address = "CG Road, Ahmedabad, Gujarat, India",
    instagram = "aurelius.jewels",
    linkedin = "https://linkedin.com/company/aureliusjewels",
    logo,
  } = userData || {};

  const getUrl = (type, value) => {
    if (!value) return "#";
    if (value.startsWith("http")) return value;

    switch (type) {
      case "instagram":
        return `https://instagram.com/${value.replace("@", "")}`;
      case "linkedin":
        return `https://linkedin.com/company/${value.replace("@", "")}`;
      case "website":
        return `https://${value}`;
      default:
        return value;
    }
  };

  const SectionTitle = ({ title }) => (
    <div className="px-5 pt-7 pb-3">
      <p className="text-[#d6ad4a] text-[10px] tracking-[0.38em] uppercase font-semibold">
        {title}
      </p>
    </div>
  );

  const CardLink = ({ icon: Icon, title, subtitle, url }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-4 mb-3 bg-[#111111] border border-[#252525] rounded-sm p-4 flex items-center justify-between hover:border-[#d6ad4a] transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 border border-[#2c2c2c] bg-black flex items-center justify-center">
          <Icon size={16} className="text-[#d6ad4a]" />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white">
            {title}
          </p>
          {subtitle && (
            <p className="text-[10px] text-zinc-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>

      <FiIcons.FiArrowUpRight size={14} className="text-[#d6ad4a]" />
    </a>
  );

  const jewelleryImages = [
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=900&q=80",
  ];

  return (
    <div className="min-h-screen bg-black flex justify-center px-3 py-6 font-serif">
      <div className="w-full max-w-sm bg-[#080808] border border-[#1a1a1a] shadow-2xl">

        {/* Header */}
        <div className="px-4 py-4 border-b border-[#1a1a1a] flex items-center justify-between">
          <h1 className="text-[#d6ad4a] text-xs tracking-[0.45em] uppercase">
            {displayName}
          </h1>
          <FiIcons.FiStar className="text-[#d6ad4a]" size={14} />
        </div>

        {/* Hero Jewellery Banner */}
        <div className="h-52 overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-5 left-5">
            <p className="text-[#d6ad4a] text-[10px] tracking-[0.3em] uppercase">
              Timeless Luxury
            </p>
            <h2 className="text-white text-xl mt-2">
              Crafted Brilliance
            </h2>
          </div>
        </div>

        {/* Profile */}
        <div className="px-5 py-6 text-center">
          <div className="w-28 h-28 mx-auto border border-[#7d6430] p-1 bg-[#111] -mt-16 relative z-10 shadow-xl">
            {logo ? (
              <img src={logo} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#2b2b2b] to-[#111] flex items-center justify-center text-[#d6ad4a] text-3xl font-bold">
                A
              </div>
            )}
          </div>

          <h2 className="mt-5 text-[#d6ad4a] text-sm tracking-[0.35em] uppercase">
            {displayName}
          </h2>



          <p className="text-zinc-300 text-[11px] leading-5 mt-5 px-2">
            Discover handcrafted gold, diamond, bridal and bespoke jewellery
            designed to celebrate elegance, prestige and timeless beauty.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div>
              <p className="text-[#d6ad4a] text-lg font-semibold">500+</p>
              <p className="text-zinc-500 text-[10px] uppercase">Designs</p>
            </div>
            <div>
              <p className="text-[#d6ad4a] text-lg font-semibold">15+</p>
              <p className="text-zinc-500 text-[10px] uppercase">Years</p>
            </div>
            <div>
              <p className="text-[#d6ad4a] text-lg font-semibold">100%</p>
              <p className="text-zinc-500 text-[10px] uppercase">Certified</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <SectionTitle title="Quick Access" />

        <CardLink
          icon={FiIcons.FiGlobe}
          title="Visit Website"
          subtitle={website}
          url={getUrl("website", website)}
        />

        <CardLink
          icon={FiIcons.FiPhone}
          title="Call Showroom"
          subtitle={phone}
          url={`tel:${phone}`}
        />

        <CardLink
          icon={FiIcons.FiMail}
          title="Email Us"
          subtitle={email}
          url={`mailto:${email}`}
        />

        <CardLink
          icon={FiIcons.FiMapPin}
          title="Visit Store"
          subtitle={address}
          url={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
        />

        {/* Collections */}
        <SectionTitle title="Our Collection" />

        <div className="px-5 pb-3 space-y-4 text-[11px] text-zinc-300">
          <div className="border-l-2 border-[#d6ad4a] pl-3">Diamond Rings</div>
          <div className="border-l-2 border-[#d6ad4a] pl-3">Wedding Jewellery</div>
          <div className="border-l-2 border-[#d6ad4a] pl-3">Gold Necklaces</div>
          <div className="border-l-2 border-[#d6ad4a] pl-3">Custom Luxury Pieces</div>
        </div>

        {/* Featured Gallery */}
        <SectionTitle title="Featured Pieces" />

        <div className="grid grid-cols-2 gap-3 px-4 pb-5">
          {jewelleryImages.map((img, i) => (
            <div key={i} className="h-28 overflow-hidden bg-[#111]">
              <img
                src={img}
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />
            </div>
          ))}
        </div>

        {/* Promise */}
        <SectionTitle title="Why Choose Us" />

        <div className="mx-4 mb-5 border border-[#252525] bg-[#111] p-4 space-y-3 text-[11px] text-zinc-300">
          <p>✔ Hallmarked Gold & Certified Diamonds</p>
          <p>✔ Bespoke Custom Jewellery Design</p>
          <p>✔ Lifetime Service & Cleaning</p>
          <p>✔ Trusted Luxury Experience</p>
        </div>

        {/* Social */}
        <SectionTitle title="Connect With Us" />

        <CardLink
          icon={FiIcons.FiInstagram}
          title="Instagram"
          subtitle="@aurelius.jewels"
          url={getUrl("instagram", instagram)}
        />

        <CardLink
          icon={FiIcons.FiLinkedin}
          title="LinkedIn"
          subtitle="Business Profile"
          url={linkedin}
        />

        {/* Save Contact */}
        <div className="px-4 py-5">
          <button
            onClick={() => downloadVCard(userData)}
            className="w-full bg-[#d6ad4a] text-black py-3 text-[10px] uppercase tracking-[0.35em] font-semibold hover:opacity-90 transition"
          >
            Save Contact
          </button>
        </div>

        {/* Footer */}
        <PoweredBy />
      </div>
    </div>
  );
};

export default OpalMinimal;