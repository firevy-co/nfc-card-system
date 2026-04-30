import React from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const DiamondElite = ({ userData }) => {
  const {
    displayName = "DIAMOND ELITE",
    email = "hello@diamondelite.com",
    role = "Premium Jewellery Studio",
    phone = "+91 98765 43210",
    website = "diamondelite.com",
    address = "Ahmedabad, Gujarat, India",
    city,
    instagram = "diamondelite.jewels",
    facebook = "diamondelitejewels",
    linkedin = "diamondelite",
    twitter = "diamondelite",
    logo,
    avatar,
    designation,
  } = userData || {};

  const displayRole = designation || role;
  const finalAddress = address || city;

  const getSocialUrl = (platform, value) => {
    if (!value) return "#";
    if (value.startsWith("http")) return value;

    switch (platform) {
      case "instagram":
        return `https://instagram.com/${value.replace("@", "")}`;
      case "facebook":
        return `https://facebook.com/${value}`;
      case "linkedin":
        return `https://linkedin.com/in/${value}`;
      case "twitter":
        return `https://twitter.com/${value}`;
      case "website":
        return `https://${value}`;
      default:
        return value;
    }
  };

  const ActionCard = ({ icon: Icon, title, subtitle, url }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-white/80 backdrop-blur-xl border border-[#eadfca] rounded-2xl p-4 flex items-center gap-4 hover:shadow-xl transition-all"
    >
      <div className="w-11 h-11 rounded-full bg-[#f8f3eb] flex items-center justify-center">
        <Icon size={18} className="text-[#b68d40]" />
      </div>

      <div className="flex-1">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#2c2418] font-semibold">
          {title}
        </p>
        {subtitle && (
          <p className="text-[10px] text-[#7a6b57] mt-1 truncate">
            {subtitle}
          </p>
        )}
      </div>

      <FiIcons.FiArrowUpRight
        size={16}
        className="text-[#b68d40]"
      />
    </a>
  );

  const gallery = [
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f6f1] via-[#f7f1e8] to-[#efe5d6] font-sans pb-12 flex justify-center">
      <div className="w-full max-w-[380px] px-5 pt-8">

        {/* Hero Card */}
        <div className="rounded-[30px] overflow-hidden shadow-2xl bg-white border border-[#eadfca]">

          {/* Banner */}
          <div className="relative h-56 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            <div className="absolute bottom-5 left-5">
              <p className="text-[#f8d99d] text-[10px] tracking-[0.3em] uppercase">
                Exclusive Collection
              </p>
              <h2 className="text-white text-2xl font-serif mt-1">
                Elegant Jewellery
              </h2>
            </div>
          </div>

          {/* Profile */}
          <div className="px-5 pb-6 text-center relative">
            <div className="-mt-14 mx-auto w-28 h-28 rounded-full border-[4px] border-white shadow-xl overflow-hidden bg-[#f4ede2]">
              {avatar ? (
                <img
                  src={avatar}
                  className="w-full h-full object-cover"
                />
              ) : logo ? (
                <img
                  src={logo}
                  className="w-full h-full object-contain p-3"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#b68d40]">
                  {displayName[0]}
                </div>
              )}
            </div>

            <h1 className="mt-4 text-[24px] font-serif tracking-[0.12em] text-[#2c2418] uppercase">
              {displayName}
            </h1>

            <p className="text-[10px] tracking-[0.28em] text-[#8c7a61] uppercase mt-1">
              {displayRole}
            </p>

            <p className="text-[12px] text-[#6b5a45] leading-6 mt-4 px-2">
              Fine diamond jewellery, handcrafted gold pieces, bridal elegance
              and bespoke luxury designs for every occasion.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-[#faf6ef] rounded-2xl py-3">
                <p className="text-[#b68d40] text-lg font-semibold">800+</p>
                <p className="text-[10px] text-[#7a6b57] uppercase">
                  Designs
                </p>
              </div>

              <div className="bg-[#faf6ef] rounded-2xl py-3">
                <p className="text-[#b68d40] text-lg font-semibold">20+</p>
                <p className="text-[10px] text-[#7a6b57] uppercase">
                  Years
                </p>
              </div>

              <div className="bg-[#faf6ef] rounded-2xl py-3">
                <p className="text-[#b68d40] text-lg font-semibold">100%</p>
                <p className="text-[10px] text-[#7a6b57] uppercase">
                  Trusted
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="px-4 pb-2 space-y-3">
            <ActionCard
              icon={FiIcons.FiGlobe}
              title="Visit Website"
              subtitle={website}
              url={getSocialUrl("website", website)}
            />

            <ActionCard
              icon={FiIcons.FiPhone}
              title="Call Showroom"
              subtitle={phone}
              url={`tel:${phone}`}
            />

            <ActionCard
              icon={FiIcons.FiMail}
              title="Email Us"
              subtitle={email}
              url={`mailto:${email}`}
            />
          </div>

          {/* Collections */}
          <div className="px-5 pt-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#b68d40] mb-4">
              Signature Collection
            </p>

            <div className="grid grid-cols-2 gap-3">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className="h-32 rounded-2xl overflow-hidden"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover hover:scale-110 transition duration-700"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="px-5 pt-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#b68d40] mb-4">
              Connect With Us
            </p>

            <div className="flex justify-center gap-5">
              {[
                {
                  icon: FiIcons.FiInstagram,
                  link: getSocialUrl("instagram", instagram),
                },
                {
                  icon: FiIcons.FiFacebook,
                  link: getSocialUrl("facebook", facebook),
                },
                {
                  icon: FiIcons.FiLinkedin,
                  link: getSocialUrl("linkedin", linkedin),
                },
                {
                  icon: FiIcons.FiTwitter,
                  link: getSocialUrl("twitter", twitter),
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#faf6ef] flex items-center justify-center text-[#b68d40] hover:bg-[#b68d40] hover:text-white transition"
                >
                  <item.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Map */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              finalAddress
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-5 mt-7 h-36 rounded-2xl overflow-hidden relative block"
          >
            <img
              src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/35"></div>

            <div className="absolute bottom-4 left-4">
              <p className="text-white text-sm font-medium">
                {finalAddress}
              </p>
              <p className="text-white/80 text-[10px] uppercase tracking-[0.2em]">
                Visit Showroom
              </p>
            </div>
          </a>

          {/* Save */}
          <div className="px-5 py-6">
            <button
              onClick={() => downloadVCard(userData)}
              className="w-full py-4 rounded-2xl bg-[#b68d40] hover:bg-[#9f7833] text-white uppercase tracking-[0.22em] text-[11px] font-semibold transition"
            >
              Save Contact
            </button>
          </div>
        </div>

        <PoweredBy />
      </div>
    </div>
  );
};

export default DiamondElite;