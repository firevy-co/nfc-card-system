import React from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const Layout = ({ children, userData, title, hideSidebar = false, hideTopNav = false }) => {
  return (
    <div className="flex h-screen bg-[#f5f6f8] text-black overflow-hidden font-['Inter']">
      {!hideSidebar && <Sidebar userData={userData} />}


      <main className={`flex-1 overflow-y-auto p-4 lg:p-6 opacity-in animate-in slide-in-from-bottom-2 duration-500`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;