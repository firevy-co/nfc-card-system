import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TemplateCard from "../admin/TemplateCard";
import CreateTemplateModal from "../admin/CreateTemplateModal";
import {
  FiPlus,
  FiSearch,
  FiLink,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { TEMPLATES } from "../../templates/templateRegistry";
import toast from 'react-hot-toast';
import { API_BASE_URL } from "../../config/api";
import ConfirmationModal from "./ConfirmationModal";


export default function Content({ userData }) {
  const isAdmin = userData?.role === "Admin";
  const [localTemplates, setLocalTemplates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Custom categories state
  const [customCategories, setCustomCategories] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`);
      if (response.ok) {
        const data = await response.json();
        setCustomCategories(data);
      }
    } catch (error) {
      console.warn("Failed to fetch custom categories");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim() })
      });
      if (response.ok) {
        toast.success("Category deployed.");
        setNewCategoryName("");
        setIsAddingCategory(false);
        fetchCategories();
      } else {
        toast.error("Failed to deploy category.");
      }
    } catch {
      toast.error("Handshake failed.");
    }
  };

  const handleDeleteCategory = async (catId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories/${catId}`, {
        method: "DELETE"
      });
      if (response.ok) {
        toast.success("Category purged.");
        fetchCategories();
      } else {
        toast.error("Failed to purge category.");
      }
    } catch {
      toast.error("Handshake failed.");
    }
  };

  const allCategories = [
    "All",
    ...new Set([
      ...TEMPLATES.map((t) => t.category),
      ...localTemplates.map((t) => t.category).filter(Boolean),
      ...customCategories.map((c) => c.name)
    ])
  ].sort((a, b) => a === "All" ? -1 : a.localeCompare(b));

  // Determine if we should show restricted categories based on user's business role

  const matchedCategory = (userData?.businessRole || userData?.businessName || userData?.companyName)
    ? (TEMPLATES.find(t => t.category.toLowerCase() === (userData.businessRole || "").toLowerCase())?.category ||
      TEMPLATES.find(t => {
        const userQuery = (userData.businessName || userData.companyName || "").toLowerCase();
        return userQuery && (t.category.toLowerCase().includes(userQuery) ||
          userQuery.includes(t.category.toLowerCase()) ||
          t.tags?.some(tag => userQuery.includes(tag.toLowerCase())));
      })?.category)
    : null;
  // Logic to determine categories: Admins see all, Users see matched + Discovery All
  const categories = isAdmin
    ? allCategories
    : ["All", matchedCategory].filter(Boolean);

  // Default selection for Admins should be 'All' to see everything properly
  useEffect(() => {
    if (isAdmin) {
      setSelectedCategory("All");
    }
  }, [isAdmin]);

  // FETCH: Sync with Cloud Orchestrator (with Local Persistence Deduplication)
  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/templates`);
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
          const userRole = (userData.businessRole || "").toLowerCase();
          const userQuery = (userData.businessName || userData.companyName || "").toLowerCase();

          const match = combined.find(t =>
            t.category.toLowerCase() === userRole ||
            (userQuery && (t.category.toLowerCase().includes(userQuery) ||
              userQuery.includes(t.category.toLowerCase()) ||
              t.tags?.some(tag => userQuery.includes(tag.toLowerCase()))))
          );
          if (match) setSelectedCategory(match.category);
        }
      } else {
        throw new Error("Sync Handshake Failed.");
      }
    } catch {
      console.warn("[SYNC]: Cloud offline. Activating Identity Deduplication Firewall.");
      const localCache = JSON.parse(localStorage.getItem('identity_nodes') || '[]');
      const combined = [
        ...localCache,
        ...TEMPLATES.filter(tn => !localCache.find(l => l.id === tn.id))
      ];
      setLocalTemplates(combined);

      // Fallback RECOMMEND logic
      if (!isAdmin && userData) {
        const userRole = (userData.businessRole || "").toLowerCase();
        const userQuery = (userData.businessName || userData.companyName || "").toLowerCase();

        const match = combined.find(t =>
          t.category.toLowerCase() === userRole ||
          (userQuery && (t.category.toLowerCase().includes(userQuery) ||
            userQuery.includes(t.category.toLowerCase()) ||
            t.tags?.some(tag => userQuery.includes(tag.toLowerCase()))))
        );
        if (match) setSelectedCategory(match.category);
      }
    } finally {
      setLoading(false);
    }
  }, [isAdmin, userData]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleSaveTemplate = async (templateData) => {
    try {
      const isEditing = !!editingTemplate;
      const finalTemplateData = isEditing
        ? { ...templateData, id: editingTemplate.id }
        : templateData;

      const url = isEditing
        ? `${API_BASE_URL}/api/templates/${editingTemplate.id}`
        : `${API_BASE_URL}/api/templates`;

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalTemplateData)
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingTemplate(null);
        fetchTemplates();
        toast.success(isEditing ? "Node re-architected." : "Node deployed.");
      } else {
        throw new Error("Cloud Sync Failed.");
      }
    } catch {
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
      toast.success("Identity stored in local cache.");
    }
  };

  const handleEditNode = (template) => {
    setEditingTemplate(template);
    setIsModalOpen(true);
  };

  const confirmDeleteNode = (id) => {
    setNodeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteNode = async () => {
    if (!nodeToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/templates/${nodeToDelete}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        toast.success("Identity node purged.");
        // OPTIMISTIC UI: Remove from local state immediately
        setLocalTemplates(prev => prev.filter(n => n.id !== nodeToDelete));

        setIsDeleteModalOpen(false);
        setNodeToDelete(null);
      } else {
        throw new Error("Purge Failed.");
      }
    } catch {
      const localCache = JSON.parse(localStorage.getItem('identity_nodes') || '[]');
      localStorage.setItem('identity_nodes', JSON.stringify(localCache.filter(n => n.id !== nodeToDelete)));
      fetchTemplates();
      setIsDeleteModalOpen(false);
      setNodeToDelete(null);
      toast.success("Identity node purged from local cache.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSelectTemplate = async (templateId) => {
    if (!userData?.uid) return;
    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('@/firebase.config');
      const userRef = doc(db, "users", userData.uid);

      await updateDoc(userRef, {
        templateId: templateId,
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
    const matchesSearch = t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category?.toLowerCase().includes(searchQuery.toLowerCase());

    // EXCLUSIVE BYPASS: Restricted templates bypass category filters for authorized users
    const matchesCategory = selectedCategory === "All" || t.category === selectedCategory || t.restrictedAccess;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => (b.restrictedAccess ? 1 : 0) - (a.restrictedAccess ? 1 : 0));

  const globalLink = userData?.templateId
    ? `${window.location.origin}/url/${userData.templateId}?u=${userData?.uid}`
    : null;


  return (
    <div className="flex-1 min-w-0 font-['Mulish']">
      <div className="p-4 sm:p-6 lg:p-10 max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

          {/* LEFT SIDEBAR: CATEGORY FILTERS — horizontal scroll on mobile, vertical on desktop */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-10">
              <div className="mb-4 lg:mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2">
                    Industry Nodes
                  </h2>
                  <div className="h-1 w-12 bg-accent rounded-full"></div>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => setIsAddingCategory(!isAddingCategory)}
                    className="p-2 bg-accent/5 hover:bg-accent/20 text-accent rounded-full transition-colors cursor-pointer"
                    title="Toggle Add Category Form"
                  >
                    <FiPlus size={16} />
                  </button>
                )}
              </div>

              {/* Inline Add Category form (Admin only) */}
              {isAdmin && isAddingCategory && (
                <form onSubmit={handleAddCategory} className="mb-6 bg-white p-4 border border-accent/20 rounded-lg shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                  <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-2">New Category Name</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Finance"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="flex-1 bg-white border border-border px-3 py-2 rounded text-xs font-bold focus:border-accent outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-gray-200 border border-gray-300 text-gray-700 px-4 py-2 rounded text-xs font-bold hover:bg-accent/90 cursor-pointer transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </form>
              )}

              {/* Mobile: horizontal scrollable chips */}
              <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
                {categories.map((category) => {
                  const customCat = customCategories.find(c => c.name === category);
                  return (
                    <div key={category} className="flex-shrink-0 flex items-center gap-1">
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full font-bold text-xs tracking-wider transition-all border cursor-pointer flex-shrink-0 ${selectedCategory === category
                          ? "bg-primary text-primary-foreground border-primary shadow-lg"
                          : "bg-white text-muted-foreground border-border hover:border-accent/40 hover:text-foreground"
                          }`}
                      >
                        {category === "All" ? "All" : category}
                      </button>
                      {isAdmin && customCat && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory(customCat.id);
                          }}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-all cursor-pointer flex-shrink-0"
                          title="Purge Category"
                        >
                          <FiX size={14} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Desktop: vertical list */}
              <div className="hidden lg:flex flex-col gap-2 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar pr-2 pb-4">
                {categories.map((category) => {
                  const customCat = customCategories.find(c => c.name === category);
                  return (
                    <div key={category} className="group relative flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`group flex items-center justify-between px-6 py-4 rounded-lg font-bold text-xs tracking-wider transition-all border cursor-pointer flex-1 ${selectedCategory === category
                          ? "bg-primary text-primary-foreground border-primary shadow-lg"
                          : "bg-white text-muted-foreground border-border hover:border-accent/40 hover:text-foreground"
                          }`}
                      >
                        <span>{category === "All" ? "Discovery All" : category}</span>
                        {selectedCategory === category && (
                          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                        )}
                      </button>
                      {isAdmin && customCat && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory(customCat.id);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-all cursor-pointer z-20"
                          title="Purge Category"
                        >
                          <FiX size={14} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* STATS OR INFO PANEL */}
              {!isAdmin && selectedCategory !== "All" && (
                <div className="hidden lg:block mt-8 p-6 bg-accent/5 border border-accent/20 rounded-lg animate-in fade-in slide-in-from-left-4 duration-500">
                  <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-2">
                    Industry Optimization
                  </p>
                  <p className="text-[11px] text-foreground/70 leading-relaxed font-bold">
                    Currently filtering nodes optimized for the <span className="text-accent">{selectedCategory}</span> sector.
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT CONTENT AREA */}
          <main className="flex-1 min-w-0">
            {/* DASHBOARD TOOLBAR */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-6 mb-10">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
                  <FiSearch size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search architecture nodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-lg bg-white border border-border focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all font-bold text-sm shadow-sm text-foreground"
                />
              </div>

              <div className="flex items-center gap-3">
                {isAdmin && (
                  <button
                    onClick={() => { setEditingTemplate(null); setIsModalOpen(true); }}
                    className="flex items-center justify-center gap-3 bg-primary text-primary-foreground cursor-pointer px-8 py-4 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-lg active:scale-95 group"
                  >
                    <FiPlus className="group-hover:rotate-90 transition-transform duration-300" />
                    Add Node
                  </button>
                )}

                {!isAdmin && globalLink && (
                  <>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(globalLink);
                        toast.success("Broadcast identity copied.");
                      }}
                      className="flex items-center justify-center gap-3 bg-white border border-border text-foreground cursor-pointer px-8 py-4 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-50 transition-all shadow-sm active:scale-95 group"
                    >
                      <FiLink size={16} className="text-accent" />
                      Live Link
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* IDENTITY GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {loading ? (
                <div className="col-span-full py-48 flex flex-col items-center justify-center gap-6">
                  <div className="w-12 h-12 border-4 border-accent/10 border-t-accent rounded-full animate-spin"></div>
                  <p className="font-black uppercase tracking-[0.3em] text-[10px] text-muted-foreground">Accessing Registry</p>
                </div>
              ) : (
                <>
                  {isAdmin && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => { setEditingTemplate(null); setIsModalOpen(true); }}
                      className="border-2 border-dashed border-border rounded-lg min-h-[400px] bg-white/40 flex flex-col items-center justify-center text-muted-foreground hover:border-accent/40 hover:bg-white cursor-pointer transition-all group active:scale-[0.98]"
                    >
                      <div className="w-14 h-14 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                        <FiPlus size={24} />
                      </div>
                      <h3 className="font-bold text-foreground text-lg mb-1">New Node</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Initialize Deployment</p>
                    </motion.div>
                  )}

                  <AnimatePresence mode="popLayout">
                    {filteredTemplates.map((template, idx) => (
                      <motion.div
                        key={template.id || idx}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
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
                          onDelete={() => confirmDeleteNode(template.id)}
                          onEdit={() => handleEditNode(template)}
                          onSelect={() => handleSelectTemplate(template.templateId || template.id)}
                          isSelected={userData?.templateId === (template.templateId || template.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      <CreateTemplateModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTemplate(null); }}
        onSave={handleSaveTemplate}
        initialData={editingTemplate}
        categories={allCategories.filter(cat => cat !== "All")}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setNodeToDelete(null); }}
        onConfirm={handleDeleteNode}
        title="Retire Identity Node"
        message="Are you sure you want to permanently abort this identity deployment? This node will be purged from the central registry and all connected participants."
        confirmText="Retire Node"
        isLoading={isDeleting}
      />
    </div>
  );
}
