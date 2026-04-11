import React from "react";
import TemplateCard from "../admin/TemplateCard";
import {
  FiFilter,
  FiPlus,
  FiGrid,
  FiList,
  FiChevronRight,
  FiChevronDown,
  FiSearch,
  FiCheckSquare,
  FiSliders,
  FiBarChart2,
  FiSettings,
  FiChevronUp,
  FiBell,
  FiShare2
} from "react-icons/fi";

export default function Content({ userData }) {
  const isAdmin = userData?.role === "Admin";
  const cards = [
    { title: "Professional Card #1", path: "/haydnprice", status: "Active", type: "share" },
    { title: "Leads Form #1", path: "/haydnprice/number01", status: "Synced" },
    { title: "Link-In-Bio #1", path: "/haydnprice/number02", status: "Active" },
    { title: "Professional Card #2", path: "/haydnprice/number01", status: "Active" },
    { title: "Link-In-Bio #2", path: "/haydnprice/number02", status: "Active" },
    { title: "Link-In-Bio #3", path: "/haydnprice/number69", status: "Synced" },
    { title: "Professional Card #3", path: "/haydnprice/number03", status: "Draft" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300">

      {/* Breadcrumb & Top Actions */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="text-muted-foreground font-medium text-lg">My Links</span>
          <FiChevronRight className="text-muted-foreground mt-1" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-foreground text-background transition-all">
            <span className="text-sm font-bold">link.firevy.co/haydnprice</span>
            <FiChevronDown />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-3 rounded-2xl bg-secondary text-foreground border border-border hover:bg-border transition-all shadow-sm">
            <FiBell size={18} />
          </button>
          <button className="flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:brightness-125 transition-all shadow-xl">
            <FiShare2 size={16} />
            Share Your Card
          </button>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="px-8 border-b border-border bg-card/10">
        <div className="flex gap-10">
          {['Content Library', 'Analytics', 'Settings'].map((tab, i) => (
            <button
              key={tab}
              className={`py-6 text-sm font-semibold relative transition-all ${i === 0 ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {tab}
              {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground rounded-t-full"></div>}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 max-w-[1600px] mx-auto">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div className="relative w-full lg:w-[400px] group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search content..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-secondary/50 border border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center bg-secondary/30 p-1.5 rounded-2xl border border-border mr-2">
              <button className="p-2.5 rounded-xl bg-foreground text-background shadow-sm border border-border/50"><FiGrid size={16} /></button>
              <button className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground transition-all"><FiList size={16} /></button>
            </div>

            <div className="h-8 w-[1px] bg-border mx-1"></div>

            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-2.5 rounded-xl hover:bg-secondary transition-all text-xs font-bold uppercase tracking-widest">
              <FiCheckSquare className="text-primary/70" />
              Select all
            </button>

            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-2.5 rounded-xl hover:bg-secondary transition-all text-xs font-bold uppercase tracking-widest">
              <FiFilter />
              Filter
            </button>

            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-2.5 rounded-xl hover:bg-secondary transition-all text-xs font-bold uppercase tracking-widest">
              <FiSliders />
              Sort
            </button>

            {isAdmin && (
              <button className="ml-2 flex items-center gap-3 bg-secondary text-foreground border border-border px-6 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-border transition-all">
                <FiPlus className="text-primary" />
                Add content
              </button>
            )}
          </div>
        </div>

        {/* Improved Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Add Content Placeholder */}
          {isAdmin && (
            <div className="border-[3px] border-dashed border-border/60 rounded-[2.5rem] h-[450px] bg-card/20 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center mb-8 shadow-xl transform transition-transform">
                <FiPlus size={28} />
              </div>

              <h3 className="font-bold text-foreground text-xl mb-3">Add New Content</h3>
              <p className="text-[11px] text-center px-10 leading-relaxed opacity-40 font-medium max-w-[280px]">
                Create a Digital card, Link-in-bio, or Lead form here.
              </p>
            </div>
          )}

          {cards.map((card, index) => (
            <TemplateCard
              key={index}
              title={card.title}
              path={card.path}
              type={card.type}
              status={card.status}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>
    </div>
  );
}