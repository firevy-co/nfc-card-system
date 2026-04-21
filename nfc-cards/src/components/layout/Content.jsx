import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TemplateCard from "../admin/TemplateCard";
import CreateTemplateModal from "../admin/CreateTemplateModal";
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
  FiBell,
  FiShare2,
  FiTag,
  FiBox,
  FiLink,
  FiCopy
} from "react-icons/fi";
import { TEMPLATES } from "../../templates/templateRegistry";
import toast from 'react-hot-toast';

export default function Content({ userData }) {
  const isAdmin = userData?.role === "Admin";
  const [localTemplates, setLocalTemplates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allCategories = [
    "All",
    ...new Set(TEMPLATES.map((t) => t.category))
  ].sort((a, b) => a === "All" ? -1 : a.localeCompare(b));

  // Determine if we should show restricted categories based on user's business role
  const matchedCategory = (!isAdmin && userData && (userData.businessName || userData.companyName))
    ? TEMPLATES.find(t => {
        const userQuery = (userData.businessName || userData.companyName).toLowerCase();
        return t.category.toLowerCase().includes(userQuery) ||
               userQuery.includes(t.category.toLowerCase()) ||
               t.tags?.some(tag => userQuery.includes(tag.toLowerCase()));
      })?.category
    : null;

  const categories = allCategories.filter(c => {
    if (isAdmin || !matchedCategory) return true;
    return c === "All" || c === matchedCategory;
  });

  // FETCH: Sync with Cloud Orchestrator (with Local Persistence Deduplication)
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/templates');
      const localCache = JSON.parse(localStorage.getItem('identity_nodes') || '[]');

      if (response.ok) {
        const data = await response.json();
        const combined = [
          ...data,
          ...localCache.filter(ln => !data.find(d => d.id === ln.id)),
          ...TEMPLATES.filter(tn => !data.find(d => d.id === tn.id) && !localCache.find(l => l.id === tn.id))
        ];
        setLocalTemplates(combined);

        // AUTO-RECOMMEND: Multi-layer matching logic
        if (!isAdmin && userData) {
          const userQuery = (userData.businessName || userData.companyName || "").toLowerCase();
          if (userQuery) {
            const match = combined.find(t =>
              t.category.toLowerCase().includes(userQuery) ||
              userQuery.includes(t.category.toLowerCase()) ||
              t.tags?.some(tag => userQuery.includes(tag.toLowerCase()))
            );
            if (match) setSelectedCategory(match.category);
          }
        }
      } else {
        throw new Error("Sync Handshake Failed.");
      }
    } catch (error) {
      console.warn("[SYNC]: Cloud offline. Activating Identity Deduplication Firewall.");
      const localCache = JSON.parse(localStorage.getItem('identity_nodes') || '[]');
      const combined = [
        ...localCache,
        ...TEMPLATES.filter(tn => !localCache.find(l => l.id === tn.id))
      ];
      setLocalTemplates(combined);

      // Fallback RECOMMEND logic
      if (!isAdmin && userData) {
        const userQuery = (userData.businessName || userData.companyName || "").toLowerCase();
        if (userQuery) {
          const match = combined.find(t =>
            t.category.toLowerCase().includes(userQuery) ||
            userQuery.includes(t.category.toLowerCase()) ||
            t.tags?.some(tag => userQuery.includes(tag.toLowerCase()))
          );
          if (match) setSelectedCategory(match.category);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleSaveTemplate = async (templateData) => {
    try {
      const isEditing = !!editingTemplate;
      const finalTemplateData = isEditing
        ? { ...templateData, id: editingTemplate.id }
        : templateData;

      const url = isEditing
        ? `http://localhost:4000/api/templates/${editingTemplate.id}`
        : 'http://localhost:4000/api/templates';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalTemplateData)
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingTemplate(null);
        fetchTemplates();
      } else {
        throw new Error("Cloud Sync Failed.");
      }
    } catch (error) {
      const localCache = JSON.parse(localStorage.getItem('identity_nodes') || '[]');
      const updatedNode = {
        ...templateData,
        id: editingTemplate ? editingTemplate.id : `local_${Date.now()}`,
        status: 'Local Only'
      };

      let newCache;
      if (editingTemplate) {
        const exists = localCache.find(n => n.id === editingTemplate.id);
        newCache = exists
          ? localCache.map(n => n.id === editingTemplate.id ? updatedNode : n)
          : [updatedNode, ...localCache];
      } else {
        newCache = [updatedNode, ...localCache];
      }

      localStorage.setItem('identity_nodes', JSON.stringify(newCache));
      setIsModalOpen(false);
      setEditingTemplate(null);
      fetchTemplates();
    }
  };

  const handleEditNode = (template) => {
    setEditingTemplate(template);
    setIsModalOpen(true);
  };

  const handleDeleteNode = async (id) => {
    if (!window.confirm("Abort Identity Deployment? This action is IRREVERSIBLE.")) return;
    try {
      const response = await fetch(`http://localhost:4000/api/templates/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) fetchTemplates();
      else throw new Error("Purge Failed.");
    } catch (error) {
      const localCache = JSON.parse(localStorage.getItem('identity_nodes') || '[]');
      localStorage.setItem('identity_nodes', JSON.stringify(localCache.filter(n => n.id !== id)));
      fetchTemplates();
    }
  };

  const handleSelectTemplate = async (templateId) => {
    if (!userData?.uid) return;
    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('../../firebase.config');
      const userRef = doc(db, "users", userData.uid);

      await updateDoc(userRef, {
        selectedTemplateId: templateId,
        lastTemplateUpdate: new Date().toISOString()
      });

      // Local success feedback is handled by Firestore real-time listener in App.jsx
      // which will update the global userData state and thus the header.
      toast.success("Identity node selected successfully!");
    } catch (error) {
      console.error("Select Template Failed:", error);
      toast.error("Failed to select node. Please try again.");
    }
  };

  const filteredTemplates = localTemplates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const globalLink = userData?.selectedTemplateId
    ? `${window.location.origin}/url/${userData.selectedTemplateId}?u=${userData?.uid}`
    : null;


  return (
    <div className="flex-1 min-w-0">
      <div className="p-3 sm:p-10 max-w-[1600px] mx-auto">
        {/* DASHBOARD TOOLBAR: Fluid Search & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="relative flex-1 max-w-full lg:max-w-[450px] group">
            <input
              type="text"
              placeholder="Search Nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-5 sm:pl-6 pr-4 sm:pr-6 py-3 sm:py-4 rounded-2xl bg-white/50 dark:bg-white border border-black/5 dark:border-white/10 focus:border-primary/50 outline-none transition-all font-bold text-xs sm:text-sm shadow-sm text-foreground"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {isAdmin && (
              <button
                onClick={() => { setEditingTemplate(null); setIsModalOpen(true); }}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 sm:gap-3 bg-white text-black cursor-pointer px-4 sm:px-10 py-3 sm:py-4 rounded-xl font-black text-[8px] sm:text-[10px] capitalize tracking-[0.1em] sm:tracking-[0.2em] hover:brightness-125 transition-all shadow-xl active:scale-95 group"
              >
                <FiPlus className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="hidden xs:block">Add node</span>
              </button>
            )}

            {!isAdmin && globalLink && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(globalLink);
                  toast.success("Identity link ready!");
                }}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 sm:gap-3 bg-black text-white cursor-pointer px-4 sm:px-10 py-3 sm:py-4 rounded-xl font-black text-[8px] sm:text-[10px] capitalize tracking-[0.1em] sm:tracking-[0.2em] hover:brightness-125 transition-all shadow-xl active:scale-95 group"
              >
                <FiLink size={16} />
                <span className="hidden xs:block text-primary font-black uppercase tracking-widest text-[9px]">Live Link</span>
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide no-scrollbar -mx-2 px-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-2xl font-black text-[11px] tracking-[0.15em] transition-all whitespace-nowrap border cursor-pointer ${selectedCategory === category
                ? "bg-black text-white border-foreground shadow-lg"
                : "bg-white/50 dark:bg-white/5 text-muted-foreground border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:text-foreground"
                }`}
            >
              {category === "All" ? "Discover All" : category}
            </button>
          ))}
        </div>

        {/* INDUSTRY RECOMMENDATION BADGE */}
        {!isAdmin && selectedCategory !== "All" && (
          <div className="flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="w-1 h-4 bg-primary rounded-full"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">
              Filtered by your industry: <span className="text-primary">{selectedCategory}</span>
            </p>
          </div>
        )}

        {/* --- GLOBAL LINK (MIDDLE SECTION) --- */}
        {!isAdmin && globalLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14 p-8 border border-black/5 dark:border-white/10 rounded-[2.5rem] bg-white/50 dark:bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.06)] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform">
              <FiLink size={120} className="text-foreground" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <p className="text-[10px] text-primary mb-2 font-black uppercase tracking-[0.4em]">
                  Active Global Identity Link
                </p>
                <div className="bg-black/5 dark:bg-white/5 px-8 py-5 rounded-[1.5rem] border border-black/5 dark:border-white/10 flex-1 w-full text-center lg:text-left overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.code
                      key={globalLink}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-[11px] text-foreground font-black break-all opacity-60 inline-block"
                    >
                      {globalLink}
                    </motion.code>
                  </AnimatePresence>
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(globalLink);
                  toast.success("Identity link ready!");
                }}
                className="w-full md:w-auto text-[10px] font-black uppercase tracking-[0.2em] px-10 py-4 bg-black text-white rounded-xl hover:brightness-125 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
              >
                <FiCopy />
                Broadcast Identity
              </button>
            </div>
          </motion.div>
        )}


        {/* IDENTITY GRID: Responsive layout for maximum legibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-10">

          {loading ? (
            <div className="col-span-full py-64 flex flex-col items-center justify-center gap-8 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
              <div className="relative">
                <div className="w-16 h-16 border-[3px] border-black/5 border-t-black rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-center space-y-2 relative z-10">
                <p className="font-black uppercase tracking-[0.5em] text-[10px] text-black/80">Retrieving Identity Nodes</p>
                <p className="font-bold uppercase tracking-[0.3em] text-[8px] text-black/20">Accessing Global Encrypted Buffer</p>
              </div>
            </div>
          ) : (
            <>
              {/* Functional Add Content Placeholder (Optimized for High Density) */}
              {isAdmin && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => { setEditingTemplate(null); setIsModalOpen(true); }}
                  className="border-[2px] sm:border-[3px] border-dashed border-black/10 dark:border-gray-300 rounded-[2.5rem] min-h-[300px] sm:min-h-[500px] bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center text-muted-foreground hover:border-foreground/20 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer transition-all group relative overflow-hidden active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-foreground text-background flex items-center justify-center mb-6 sm:mb-8 shadow-2xl group-hover:scale-110 transition-all duration-500">
                    <FiPlus size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="font-black text-foreground text-xs sm:text-xl mb-1 capitalize tracking-tighter">New Node</h3>
                  <p className="text-[9px] sm:text-[11px] text-center px-6 leading-relaxed opacity-40 font-bold capitalize tracking-widest">
                    Initialize Deployment
                  </p>
                </motion.div>
              )}

              <AnimatePresence mode="popLayout">
                {filteredTemplates.map((template, idx) => (
                  <motion.div
                    key={template.id || idx}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <TemplateCard
                      templateId={template.templateId || template.id}
                      title={template.name}
                      path={`/${template.id}`}
                      category={template.category}
                      tags={template.tags}
                      description={template.description}
                      userData={userData}
                      isAdmin={isAdmin}
                      onDelete={() => handleDeleteNode(template.id)}
                      onEdit={() => handleEditNode(template)}
                      onSelect={() => handleSelectTemplate(template.templateId || template.id)}
                      isSelected={userData?.selectedTemplateId === (template.templateId || template.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </>
          )}
        </div>


      </div>


      <CreateTemplateModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTemplate(null); }}
        onSave={handleSaveTemplate}
        initialData={editingTemplate}
      />
    </div>
  );
}
