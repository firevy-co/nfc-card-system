import React from "react";
import * as FiIcons from "react-icons/fi";
import PoweredBy from "../PoweredBy";

/* =========================================================
   PREMIUM JEWELLERY CONTACT COMPONENTS
   Added Location Position Inside Contact Section
========================================================= */

/* =========================================================
   CONTACT LINK CARD
========================================================= */
export const StandardContactLink = ({
  icon: Icon,
  value,
  href,
  label,
}) => {
  if (
    !value ||
    value === "" ||
    value.includes("resolving") ||
    value.includes("Undefined") ||
    value === "No Name Set"
  )
    return null;

  const Comp = href ? "a" : "div";
  let finalHref = href;

  let displayLabel = label;

  if (!label) {
    if (finalHref?.startsWith("tel:")) displayLabel = "Call Now";
    else if (finalHref?.startsWith("mailto:")) displayLabel = "Email Me";
    else if (
      finalHref?.startsWith("http") ||
      Icon === FiIcons.FiGlobe
    )
      displayLabel = "Visit Website";
    else if (Icon === FiIcons.FiLinkedin)
      displayLabel = "LinkedIn Profile";
    else if (Icon === FiIcons.FiInstagram)
      displayLabel = "Instagram Profile";
    else if (Icon === FiIcons.FiFacebook)
      displayLabel = "Facebook Page";
    else if (Icon === FiIcons.FiTwitter)
      displayLabel = "X / Twitter";
    else if (Icon === FiIcons.FiMapPin)
      displayLabel = "Visit Showroom";
    else if (finalHref?.includes("wa.me"))
      displayLabel = "WhatsApp Chat";
    else displayLabel = value;
  }

  return (
    <Comp
      href={finalHref}
      target={Comp === "a" ? "_blank" : undefined}
      rel={Comp === "a" ? "noopener noreferrer" : undefined}
      className="w-full rounded-[26px] border border-[#d4af37]/20 bg-[#17120f] hover:bg-[#211913] transition-all duration-300 p-4 shadow-xl group"
    >
      <div className="flex items-center gap-4">

        {/* ICON */}
        <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
          <Icon size={22} />
        </div>

        {/* TEXT */}
        <div className="flex-1 min-w-0">
          <p className="text-[#d4af37] text-[10px] uppercase tracking-[0.35em] font-bold mb-1">
            Jewellery Connect
          </p>

          <p className="text-white text-lg font-semibold truncate">
            {displayLabel}
          </p>

          {/* Location Address Show */}
          {Icon === FiIcons.FiMapPin && (
            <p className="text-white/55 text-sm truncate mt-1">
              {value}
            </p>
          )}
        </div>

        {/* Arrow */}
        <FiIcons.FiArrowUpRight
          size={20}
          className="text-white/40 group-hover:text-[#d4af37]"
        />
      </div>
    </Comp>
  );
};

/* =========================================================
   HEADER SECTION
========================================================= */
export const JewelleryHeader = ({
  name,
  subtitle,
}) => {
  return (
    <div className="w-full rounded-[30px] overflow-hidden border border-[#d4af37]/20 bg-[#17120f] shadow-2xl mb-6">

      <div className="relative h-56">
        <img
          src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80"
          alt="Jewellery"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-[#d4af37] text-[10px] uppercase tracking-[0.35em] font-bold mb-2">
            Luxury Collection
          </p>

          <h2 className="text-white text-2xl font-bold">
            {name}
          </h2>

          <p className="text-white/70 text-sm mt-1">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   LOCATION MAP SECTION
========================================================= */
export const StandardMapPreview = ({ address }) => {
  if (!address || address === "" || address.includes("resolving"))
    return null;

  const encodedAddress = encodeURIComponent(address);

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full mt-6 rounded-[28px] overflow-hidden border border-[#d4af37]/20 bg-[#17120f] block"
    >
      <div className="relative h-44">
        <img
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80"
          alt="Location"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[#d4af37] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
            Showroom Location
          </p>

          <p className="text-white text-sm truncate mb-3">
            {address}
          </p>

          <span className="inline-block px-4 py-2 rounded-full bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-[0.2em]">
            Open Map
          </span>
        </div>
      </div>
    </a>
  );
};

/* =========================================================
   VCARD DOWNLOAD (UNCHANGED)
========================================================= */
export const downloadVCard = (userData) => {
  if (!userData) return;

  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${userData.displayName || "NFC Contact"}`,
    `N:;${userData.displayName || "NFC Contact"};;;`,
    `ORG:${userData.company || userData.businessName || ""}`,
    `TITLE:${userData.role || ""}`,
    `EMAIL;TYPE=INTERNET:${userData.email || ""}`,
    `TEL;TYPE=CELL:${userData.phone || ""}`,
    `ADR;TYPE=WORK:;;${userData.address || ""};;;;`,
    `URL:${userData.website || ""}`,
    "END:VCARD",
  ].join("\n");

  const blob = new Blob([vCard], { type: "text/vcard" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `${userData.displayName || "contact"}.vcf`
  );

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/* =========================================================
   SAVE CONTACT BUTTON
========================================================= */
export const StandardSaveContactButton = ({ userData }) => (
  <button
    onClick={() => downloadVCard(userData)}
    className="w-full mt-6 rounded-[28px] bg-[#d4af37] text-black py-5 font-bold text-[11px] uppercase tracking-[0.25em] shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
  >
    <FiIcons.FiUserPlus size={18} />
    Save Contact
  </button>
);

/* =========================================================
   VELVET BOUTIQUE MAIN TEMPLATE
========================================================= */
const VelvetBoutique = ({ userData }) => {
  const { displayName, email, role, phone, website, address, city, instagram, facebook, linkedin, twitter, logo, avatar, designation, companyName } = userData || {};

  const getSocialUrl = (platform, value) => {
    if (!value) return null;
    if (value.startsWith('http')) return value;
    switch (platform) {
      case 'linkedin': return `https://linkedin.com/in/${value.replace('@', '')}`;
      case 'instagram': return `https://instagram.com/${value.replace('@', '')}`;
      case 'twitter': return `https://twitter.com/${value.replace('@', '')}`;
      case 'facebook': return `https://facebook.com/${value}`;
      case 'website': return `https://${value}`;
      default: return `https://${value}`;
    }
  };

  const finalAddress = address || city;
  const displayRole = designation || role;

  return (
    <div className="min-h-screen bg-[#0f0b09] font-sans pb-12 text-[#d4af37] flex flex-col items-center">
      <div className="w-full max-w-[380px] px-5 pt-8 flex flex-col items-center">

        <JewelleryHeader name={displayName} subtitle={displayRole} />

        {logo && (
          <div className="flex justify-center -mt-16 relative z-10 mb-8">
            <div className="w-24 h-24 rounded-full bg-[#17120f] border border-[#d4af37]/30 p-2 shadow-2xl">
              <img src={logo} alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
          </div>
        )}

        {!logo && avatar && (
          <div className="flex justify-center -mt-16 relative z-10 mb-8">
            <div className="w-24 h-24 rounded-full bg-[#17120f] border border-[#d4af37]/30 p-1 shadow-2xl">
              <img src={avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
        )}

        <div className="w-full flex flex-col gap-4 mt-2">
          <StandardContactLink icon={FiIcons.FiGlobe} label="Visit Website" value={website} href={website ? getSocialUrl('website', website) : null} />
          <StandardContactLink icon={FiIcons.FiMail} label="Email Me" value={email} href={email ? `mailto:${email}` : null} />
          <StandardContactLink icon={FiIcons.FiPhone} label="Call Now" value={phone} href={phone ? `tel:${phone}` : null} />

          <StandardContactLink icon={FiIcons.FiInstagram} label="Instagram Profile" value={instagram} href={getSocialUrl('instagram', instagram)} />
          <StandardContactLink icon={FiIcons.FiFacebook} label="Facebook Page" value={facebook} href={getSocialUrl('facebook', facebook)} />
        </div>

        {finalAddress && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(finalAddress)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>)}

        <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>

        <PoweredBy />

      </div>
    </div>
  );
};

export default VelvetBoutique;