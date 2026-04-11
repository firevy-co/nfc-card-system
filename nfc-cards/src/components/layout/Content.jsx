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
  FiBox
} from "react-icons/fi";
import { TEMPLATES } from "../../templates/templateRegistry";

export default function Content({ userData }) {
  const isAdmin = userData?.role === "Admin";
  const [localTemplates, setLocalTemplates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // FETCH: Sync with Cloud Orchestrator (with Local Persistence Deduplication)
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/templates');
      const localCache = JSON.parse(localStorage.getItem('identity_nodes') || '[]');

      if (response.ok) {
        const data = await response.json();
        // Harmonize: Prioritize Cloud > Local > Registry
        const combined = [
          ...data,
          ...localCache.filter(ln => !data.find(d => d.id === ln.id)),
          ...TEMPLATES.filter(tn => !data.find(d => d.id === tn.id) && !localCache.find(l => l.id === tn.id))
        ];
        setLocalTemplates(combined);
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

  const filteredTemplates = localTemplates.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 min-w-0">
      <div className="p-3 sm:p-10 max-w-[1600px] mx-auto">
        {/* DASHBOARD TOOLBAR: Fluid Search & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="relative flex-1 max-w-full lg:max-w-[450px] group">
            <FiSearch size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors sm:w-[18px] sm:h-[18px]" />
            <input
              type="text"
              placeholder="Search Nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 rounded-xl bg-card/40 backdrop-blur-md border border-border focus:border-primary/50 outline-none transition-all font-bold text-xs sm:text-sm shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center bg-secondary/30 p-1 rounded-lg sm:rounded-xl border border-border shadow-inner">
               <button className="p-2 sm:p-3 rounded-md sm:rounded-lg bg-foreground text-background shadow-lg transition-all"><FiGrid size={14} className="sm:w-[16px] sm:h-[16px]" /></button>
               <button className="p-2 sm:p-3 rounded-md sm:rounded-lg text-muted-foreground hover:text-foreground transition-all"><FiList size={14} className="sm:w-[16px] sm:h-[16px]" /></button>
            </div>
            
            {isAdmin && (
              <button
                onClick={() => { setEditingTemplate(null); setIsModalOpen(true); }}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 sm:gap-3 bg-foreground text-background px-4 sm:px-10 py-3 sm:py-4 rounded-xl font-black text-[8px] sm:text-[10px] capitalize tracking-[0.1em] sm:tracking-[0.2em] hover:brightness-125 transition-all shadow-2xl active:scale-95 group"
              >
                <FiPlus className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="hidden xs:block">Add node</span>
                <span className="xs:hidden">Add</span>
              </button>
            )}
          </div>
        </div>

        {/* IDENTITY GRID: High-Density 3-Column Mobile Setup */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-10">
          
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card/50 border-[2px] sm:border-[3px] border-border/20 rounded-xl sm:rounded-[2rem] p-3 sm:p-5 min-h-[220px] sm:min-h-[540px] flex flex-col justify-between animate-pulse shadow-sm">
                <div className="space-y-3 sm:space-y-6">
                  {/* Image Placeholder */}
                  <div className="w-full h-24 sm:h-64 bg-muted/50 rounded-lg sm:rounded-[1.5rem]"></div>
                  
                  {/* Title & Tag Placeholder */}
                  <div className="space-y-2 sm:space-y-4 px-1 sm:px-2">
                    <div className="w-3/4 h-3 sm:h-6 bg-muted/50 rounded-full"></div>
                    <div className="w-1/2 h-2 sm:h-4 bg-muted/50 rounded-full"></div>
                  </div>
                </div>

                {/* Actions Placeholder */}
                <div className="flex items-center gap-2 mt-auto pt-4 sm:pt-6 px-1 sm:px-2 border-t border-border/10">
                  <div className="flex-1 h-6 sm:h-12 bg-muted/50 rounded-md sm:rounded-xl"></div>
                  <div className="w-6 h-6 sm:w-12 sm:h-12 bg-muted/50 rounded-md sm:rounded-xl shrink-0"></div>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Functional Add Content Placeholder (Optimized for High Density) */}
              {isAdmin && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => { setEditingTemplate(null); setIsModalOpen(true); }}
                  className="border-[2px] sm:border-[3px] border-dashed border-border/40 rounded-xl sm:rounded-2xl min-h-[160px] sm:min-h-[540px] bg-card/10 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-all group relative overflow-hidden active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-8 h-8 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-foreground text-background flex items-center justify-center mb-2 sm:mb-8 shadow-2xl group-hover:scale-110 transition-all duration-500">
                    <FiPlus size={16} className="sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="font-black text-foreground text-[8px] sm:text-xl mb-1 capitalize tracking-tighter hidden xs:block">New</h3>
                  <p className="text-[7px] text-center px-2 leading-relaxed opacity-40 font-bold capitalize tracking-widest hidden sm:block">
                    Initialize node
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
                      isAdmin={isAdmin}
                      onDelete={() => handleDeleteNode(template.id)}
                      onEdit={() => handleEditNode(template)}
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
