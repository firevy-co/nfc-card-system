import * as FiIcons from 'react-icons/fi';

export const StandardContactLink = ({ icon: Icon, value, href, label }) => {
  if (!value || value === "" || value.includes('resolving') || value.includes('Undefined') || value === 'No Name Set') return null;
  if (Icon === FiIcons.FiMapPin) return null;

  const Comp = href ? 'a' : 'div';
  let finalHref = href;

  // Logic to determine action label and transform links
  let displayLabel = label;
  if (!label) {
    if (finalHref?.startsWith('tel:')) displayLabel = "Call Now";
    else if (finalHref?.startsWith('mailto:')) displayLabel = "Email Me";
    else if (finalHref?.startsWith('http') || Icon === FiIcons.FiGlobe) displayLabel = "Visit Website";
    else if (Icon === FiIcons.FiLinkedin) displayLabel = "LinkedIn Profile";
    else if (Icon === FiIcons.FiInstagram) displayLabel = "Instagram Profile";
    else if (Icon === FiIcons.FiFacebook) displayLabel = "Facebook Page";
    else if (Icon === FiIcons.FiTwitter) displayLabel = "X / Twitter";
    else if (finalHref?.includes('wa.me')) displayLabel = "WhatsApp Chat";
    else displayLabel = value; // Fallback
  }

  return (
    <Comp
      href={finalHref}
      target={Comp === 'a' ? "_blank" : undefined}
      rel={Comp === 'a' ? "noopener noreferrer" : undefined}
      className="w-full flex items-center gap-5 bg-white/10 border border-white/5 backdrop-blur-md p-4 rounded-[1.8rem] transition-all hover:bg-white/15"
    >
      <div className="text-cyan-400">
        <Icon size={20} />
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] font-black text-white/90 uppercase tracking-widest truncate max-w-[180px]">{displayLabel}</span>
      </div>
    </Comp>
  );
};

export const StandardMapPreview = ({ address }) => {
  if (!address || address === "" || address.includes('resolving')) return null;

  const encodedAddress = encodeURIComponent(address);

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full mt-6 block rounded-[1.8rem] overflow-hidden border border-white/5 shadow-2xl relative h-40 bg-[#0f172a] group"
    >
      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
        {/* Mock Map Texture or Styled Background */}
        <div className="w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-cyan-400/20 flex items-center justify-center outline outline-4 outline-cyan-400/10">
            <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div>
          <p className="text-[8px] font-black text-cyan-400 uppercase tracking-widest mb-1">Satellite View</p>
          <p className="text-[10px] font-bold text-white truncate max-w-[200px]">{address}</p>
        </div>
        <div className="bg-white text-black px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest group-hover:scale-105 transition-transform">
          Open Map
        </div>
      </div>
    </a>
  );
};

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
  link.setAttribute("download", `${userData.displayName || "contact"}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const StandardSaveContactButton = ({ userData }) => (
  <button
    onClick={() => downloadVCard(userData)}
    className="w-full mt-6 bg-[#456c86] text-white py-5 rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
  >
    <FiIcons.FiUserPlus size={18} />
    Save Contact
  </button>
);
