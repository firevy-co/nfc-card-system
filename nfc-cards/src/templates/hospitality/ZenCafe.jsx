import React from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const ZenCafe = ({ userData }) => {
  const { displayName, email, phone, website, address } = userData || {};

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
    "ICU",
    "Ambulance",
    "Pharmacy",
    "Lab Testing",
    "Insurance Support",
  ];

  const doctors = [
    "Dr. Raj Mehta",
    "Dr. Neha Shah",
    "Dr. Amit Patel",
  ];

  const gallery = [
    "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg",
    "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg",
    "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg",
    "https://images.pexels.com/photos/6129683/pexels-photo-6129683.jpeg",
  ];

  return (
    <div className="w-full min-h-screen bg-white font-['Mulish']">
      <div className="w-full bg-white overflow-hidden">

        {/* HEADER */}
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg"
            alt="hospital"
            className="h-56 w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <div className="absolute bottom-5 left-5 text-white">
            <h1 className="text-2xl font-black">
              {displayName || "CityCare Hospital"}
            </h1>
            <p className="text-xs tracking-[3px] uppercase text-blue-200">
              Premium Healthcare
            </p>
          </div>
        </div>

        {/* ABOUT */}
        <div className="p-5 border-b">
          <h3 className="text-sm font-bold text-sky-600 mb-2">
            About Hospital
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Delivering world-class healthcare with expert doctors, modern
            facilities, advanced diagnostics, and compassionate patient care.
          </p>
        </div>

        {/* CONTACT */}
        <div className="p-5 border-b space-y-3">
          {phone && (
            <div className="flex items-center gap-3 text-sm">
              <FiIcons.FiPhone className="text-sky-600" />
              {phone}
            </div>
          )}

          {email && (
            <div className="flex items-center gap-3 text-sm">
              <FiIcons.FiMail className="text-sky-600" />
              {email}
            </div>
          )}

          {website && (
            <div className="flex items-center gap-3 text-sm">
              <FiIcons.FiGlobe className="text-sky-600" />
              {website}
            </div>
          )}

          {address && (
            <div className="flex items-center gap-3 text-sm">
              <FiIcons.FiMapPin className="text-sky-600" />
              {address}
            </div>
          )}
        </div>

        {/* DEPARTMENTS */}
        <div className="p-5 border-b">
          <h3 className="text-sm font-bold text-sky-600 mb-3">
            Departments
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {services.map((item, i) => (
              <div
                key={i}
                className="bg-sky-50 text-sky-700 text-xs font-semibold text-center py-2 rounded-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* FACILITIES */}
        <div className="p-5 border-b">
          <h3 className="text-sm font-bold text-sky-600 mb-3">
            Facilities
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {facilities.map((item, i) => (
              <div
                key={i}
                className="bg-gray-100 text-gray-700 text-xs text-center py-2 rounded-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* DOCTORS */}
        <div className="p-5 border-b">
          <h3 className="text-sm font-bold text-sky-600 mb-3">
            Specialists
          </h3>

          <div className="space-y-2">
            {doctors.map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2"
              >
                <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center">
                  <FiIcons.FiUser className="text-sky-600" />
                </div>

                <span className="text-sm font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TIMING */}
        <div className="p-5 border-b">
          <h3 className="text-sm font-bold text-sky-600 mb-2">
            OPD Timing
          </h3>
          <p className="text-sm font-medium">
            Mon - Sat : 9:00 AM - 8:00 PM
          </p>
          <p className="text-xs text-gray-500">Sunday Closed</p>
        </div>

        {/* GALLERY */}
        <div className="p-5 border-b">
          <h3 className="text-sm font-bold text-sky-600 mb-3">
            Gallery
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="hospital"
                className="rounded-2xl h-24 w-full object-cover"
              />
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="p-5 space-y-3">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="block w-full bg-sky-600 text-white text-center py-3 rounded-2xl font-bold text-sm"
            >
              Call Hospital
            </a>
          )}

          {address && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border border-sky-600 text-sky-600 text-center py-3 rounded-2xl font-bold text-sm"
            >
              View Location
            </a>
          )}

          <button
            onClick={() => downloadVCard(userData)}
            className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold text-sm"
          >
            Save Contact
          </button>
        </div>

        <div className="px-5 pb-5">
          <PoweredBy />
        </div>
      </div>
    </div>
  );
};

export default ZenCafe;