import React, { useState } from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const TrustMedical = ({ userData }) => {
  const {
    displayName,
    email,
    phone,
    website,
    address,
    linkedin,
    instagram,
    facebook,
    twitter,
    logo,
  } = userData || {};

  const [reviewIndex, setReviewIndex] = useState(0);

  const services = [
    "Cardiology",
    "Neurology",
    "Orthopedic",
    "Pediatrics",
    "Radiology",
    "General Surgery",
  ];

  const facilities = [
    "24/7 Emergency",
    "ICU Support",
    "Digital Reports",
    "Pharmacy",
    "Modern Lab",
    "Ambulance",
  ];

  const doctors = [
    "Dr. Raj Mehta",
    "Dr. Neha Shah",
    "Dr. Amit Patel",
  ];

  const reviews = [
    {
      name: "Rakesh",
      text: "Excellent doctors and very clean hospital.",
      rating: 5,
    },
    {
      name: "Priya",
      text: "Quick appointment and professional staff.",
      rating: 5,
    },
    {
      name: "Amit",
      text: "Best healthcare service in the city.",
      rating: 4,
    },
  ];

  const gallery = [
    "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg",
    "https://images.pexels.com/photos/6129683/pexels-photo-6129683.jpeg",
    "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg",
    "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg",
  ];

  const nextReview = () =>
    setReviewIndex((reviewIndex + 1) % reviews.length);

  const prevReview = () =>
    setReviewIndex((reviewIndex - 1 + reviews.length) % reviews.length);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center font-['Mulish']">

      <div className="w-full max-w-sm bg-slate-900 overflow-hidden">

        {/* HEADER IMAGE */}
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg"
            alt="hospital"
            className="w-full h-52 object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* WAVE */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg viewBox="0 0 1440 320" className="w-full">
              <path
                fill="#0f172a"
                d="M0,192L60,176C120,160,240,128,360,138.7C480,149,600,203,720,224C840,245,960,235,1080,213.3C1200,192,1320,160,1380,144L1440,128L1440,320L0,320Z"
              />
            </svg>
          </div>

          {/* TITLE */}
          <div className="absolute top-5 left-4 right-4 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-black">
                {displayName || "Trust Medical"}
              </h1>
              <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300 mt-1">
                Advanced Healthcare
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-xl overflow-hidden">
              {logo ? (
                <img
                  src={logo}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <FiIcons.FiHeart
                  size={26}
                  className="text-cyan-500 m-auto mt-3"
                />
              )}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="px-4 pb-5 -mt-2">

          {/* ABOUT */}
          <div className="bg-slate-800 rounded-2xl p-4 border border-white/5">
            <h3 className="text-sm font-black text-cyan-400 mb-2">
              About Hospital
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Trusted healthcare center with experienced doctors,
              emergency support, modern equipment, and patient-first care.
            </p>
          </div>

          {/* CONTACT */}
          <div className="mt-4 bg-slate-800 rounded-2xl p-4 border border-white/5 space-y-3">

            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex gap-3 items-center text-sm"
              >
                <FiIcons.FiPhone className="text-cyan-400" />
                {phone}
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="flex gap-3 items-center text-sm"
              >
                <FiIcons.FiMail className="text-cyan-400" />
                {email}
              </a>
            )}

            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-center text-sm"
              >
                <FiIcons.FiGlobe className="text-cyan-400" />
                {website}
              </a>
            )}

            {address && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-center text-sm"
              >
                <FiIcons.FiMapPin className="text-cyan-400" />
                {address}
              </a>
            )}
          </div>

          {/* SERVICES */}
          <div className="mt-4 bg-slate-800 rounded-2xl p-4 border border-white/5">
            <h3 className="text-sm font-black text-cyan-400 mb-3">
              Departments
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {services.map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-700 text-center py-2 rounded-xl text-xs"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* FACILITIES */}
          <div className="mt-4 bg-slate-800 rounded-2xl p-4 border border-white/5">
            <h3 className="text-sm font-black text-cyan-400 mb-3">
              Facilities
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {facilities.map((item, i) => (
                <div
                  key={i}
                  className="bg-cyan-500/10 border border-cyan-400/10 text-center py-2 rounded-xl text-xs"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* DOCTORS */}
          <div className="mt-4 bg-slate-800 rounded-2xl p-4 border border-white/5">
            <h3 className="text-sm font-black text-cyan-400 mb-3">
              Specialists
            </h3>

            <div className="space-y-2">
              {doctors.map((doc, i) => (
                <div
                  key={i}
                  className="bg-slate-700 rounded-xl p-3 text-sm flex gap-3 items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                    <FiIcons.FiUser className="text-white" size={14} />
                  </div>

                  {doc}
                </div>
              ))}
            </div>
          </div>

          {/* REVIEWS */}
          <div className="mt-4 bg-slate-800 rounded-2xl p-4 border border-white/5">
            <h3 className="text-sm font-black text-cyan-400 mb-3">
              Patient Review
            </h3>

            <div className="flex gap-1 text-yellow-400 mb-2">
              {[...Array(reviews[reviewIndex].rating)].map((_, i) => (
                <FiIcons.FiStar key={i} size={14} />
              ))}
            </div>

            <p className="text-sm text-slate-300">
              "{reviews[reviewIndex].text}"
            </p>

            <p className="text-xs mt-2 text-slate-500 font-bold">
              - {reviews[reviewIndex].name}
            </p>

            <div className="flex justify-between mt-3">
              <button onClick={prevReview}>
                <FiIcons.FiChevronLeft />
              </button>

              <button onClick={nextReview}>
                <FiIcons.FiChevronRight />
              </button>
            </div>
          </div>

          {/* GALLERY */}
          <div className="mt-4 bg-slate-800 rounded-2xl p-4 border border-white/5">
            <h3 className="text-sm font-black text-cyan-400 mb-3">
              Gallery
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="hospital"
                  className="h-24 w-full object-cover rounded-xl"
                />
              ))}
            </div>
          </div>

          {/* SOCIAL */}
          <div className="flex justify-center gap-3 mt-5">
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer">
                <FiIcons.FiLinkedin />
              </a>
            )}

            {instagram && (
              <a href={instagram} target="_blank" rel="noreferrer">
                <FiIcons.FiInstagram />
              </a>
            )}

            {facebook && (
              <a href={facebook} target="_blank" rel="noreferrer">
                <FiIcons.FiFacebook />
              </a>
            )}

            {twitter && (
              <a href={twitter} target="_blank" rel="noreferrer">
                <FiIcons.FiTwitter />
              </a>
            )}
          </div>

          {/* ACTIONS */}
          <div className="space-y-3 mt-5">

            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-cyan-500 text-black text-center py-3 rounded-2xl font-black text-sm"
              >
                Book Appointment
              </a>
            )}

            <button
              onClick={() => downloadVCard(userData)}
              className="w-full border border-white/10 py-3 rounded-2xl font-black text-sm"
            >
              Save Contact
            </button>
          </div>

          <div className="mt-5">
            <PoweredBy />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrustMedical;