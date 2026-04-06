import React from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

/**
 * GLOBAL ORCHESTRATION LAYOUT
 * Orchestrates the Sidebar, TopNav, and Content area.
 */
const Layout = ({ 
  children, 
  userData, 
  title, 
  hideSidebar = false, 
  hideTopNav = false 
}) => {
  return (
    <div className="flex bg-background text-foreground min-h-screen overflow-hidden transition-colors duration-500 font-['Plus_Jakarta_Sans']">
      {!hideSidebar && <Sidebar userData={userData} />}

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {!hideTopNav && <TopNav title={title || "Identity Node"} />}

        <main className={`flex-1 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-700 bg-muted/10 ${hideTopNav ? 'p-0' : 'p-6 lg:p-10'}`}>
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;