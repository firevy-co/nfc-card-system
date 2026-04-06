import React from "react";
import TemplateCard from "../admin/TemplateCard";
import { FiFilter, FiPlus } from "react-icons/fi";

export default function Content() {

  const cards = [
    {
      title: "Professional Card #1",
      path: "/haydnprice",
      type: "share"
    },
    {
      title: "Leads Form #1",
      path: "/haydnprice/number01"
    },
    {
      title: "Link-In-Bio #1",
      path: "/haydnprice/number02"
    },
    {
      title: "Professional Card #2",
      path: "/haydnprice/number03"
    },
    {
      title: "Link-In-Bio #2",
      path: "/haydnprice/number04"
    },
    {
      title: "Link-In-Bio #3",
      path: "/haydnprice/number05"
    },
    {
      title: "Professional Card #3",
      path: "/haydnprice/number06"
    }
  ];

  return (
    <div className="p-6">

      {/* Top Toolbar */}

      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <button className="hover:text-black">Select all</button>
          <button className="flex items-center gap-1 hover:text-black">
            <FiFilter size={14} />
            Filter
          </button>
          <button className="hover:text-black">Sort</button>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm">
          <FiPlus />
          Add content
        </button>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-4 gap-6">

        {/* Add Card */}

        <div className="border-2 border-dashed rounded-xl h-[330px] bg-white flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 cursor-pointer">

          <div className="text-3xl mb-3">+</div>

          <p className="font-medium">
            Add New Content
          </p>

          <span className="text-sm text-center px-8">
            Create a Digital card, Link-in-bio, or Lead form here.
          </span>

        </div>

        {/* Cards */}

        {cards.map((card, index) => (
          <TemplateCard
            key={index}
            title={card.title}
            path={card.path}
            type={card.type}
          />
        ))}

      </div>

    </div>
  );
}