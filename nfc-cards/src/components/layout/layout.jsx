import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

/**
 * GLOBAL ORCHESTRATION LAYOUT
 * Orchestrates the Sidebar, TopNav, and Content area with Responsive Support.
 */
const Layout = ({ 
  children, 
  userData, 
  title, 
  hideSidebar = false, 
  hideTopNav = false,
  showTopNavActions = true
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-background text-foreground min-h-screen overflow-hidden transition-colors duration-500 font-['Plus_Jakarta_Sans']">
      {!hideSidebar && userData?.role === "Admin" && (
        <Sidebar 
          userData={userData} 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* MOBILE OVERLAY (Solid Light Tint) */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-white/40 z-[900] lg:hidden animate-in fade-in duration-500"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen relative">
        {!hideTopNav && (
          <TopNav 
            title={title || "Identity Node"} 
            showActions={showTopNavActions} 
            onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            isMenuOpen={isSidebarOpen}
          />
        )}

        <main className={`flex-1 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-700 bg-muted/10 ${hideTopNav || userData?.role !== "Admin" ? 'p-0' : 'p-4 sm:p-6 lg:p-10'}`}>
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;