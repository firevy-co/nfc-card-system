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