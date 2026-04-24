import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import AdminNav from './AdminNav';
import UserNav from './UserNav';
import MobileFooter from './MobileFooter';

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
  const isAdmin = userData?.role === "Admin";

  const actualHideSidebar = true; // Floating Nav replaces sidebar
  const actualHideTopNav = true; // Floating Nav replaces TopNav

  return (
    <div className={`flex bg-background text-foreground min-h-screen overflow-hidden transition-colors duration-500 ${isAdmin ? 'light' : ''}`}>

      {!hideTopNav && (
        isAdmin ? (
          <AdminNav userData={userData} />
        ) : (
          <UserNav userData={userData} />
        )
      )}

      {!actualHideSidebar && (
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
        {!actualHideTopNav && (
          <TopNav
            title={title || "Identity Node"}
            showActions={showTopNavActions}
            onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            isMenuOpen={isSidebarOpen}
          />
        )}

        <main className={`flex-1 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-700 bg-muted/10 ${hideTopNav ? 'p-0' : (actualHideTopNav ? 'p-0 pt-10 lg:pt-28 pb-32 lg:pb-0' : 'p-4 sm:p-6 lg:p-10')}`}>
          <div className="max-w-[1600px] mt-10 mx-auto">
            {children}
          </div>
        </main>
        
        {!hideTopNav && <MobileFooter userData={userData} />}
      </div>
    </div>
  );
};

export default Layout;
